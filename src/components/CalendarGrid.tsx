import { useEffect, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { BlankDay } from "./BlankDay";
import { CalendarEvent } from '../../types/index';
import { calcBlankSpaces, generateRandomId, getCloudEvents, getDaysInMonth, getFirstDayOfMonth, mergeEvents, parseEventDates, today } from "../../helpers";

interface Props {
  currentDate: Date;
}

export const CalendarGrid = ({ currentDate }: Props) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  
  const firstDayMonth = getFirstDayOfMonth(year, month);
  
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const cloudEvents = await getCloudEvents(); 
        const parsedCloudEvents = parseEventDates(JSON.stringify(cloudEvents));

        if (parsedCloudEvents) {
          setEvents(prevEvents => {
            const combinedEvents = mergeEvents(prevEvents, parsedCloudEvents);
            localStorage.setItem('events', JSON.stringify(combinedEvents));
            return combinedEvents;
          });
        }
      } catch (error) {
        console.error("Failed to fetch events:", error);
      }
    };

    const storedEvents = localStorage.getItem('events');
    if (storedEvents) {
      const parsedEvents: CalendarEvent[] = parseEventDates(storedEvents);
      setEvents(parsedEvents);
    }

    fetchEvents();
    setIsInitialLoad(false);
  }, []);

  useEffect(() => {
    if (!isInitialLoad) {
      localStorage.setItem('events', JSON.stringify(events));
    }
  }, [events, isInitialLoad]);

  const handleDateAdd = (day: number) => {
    const userInput = window.prompt(`Enter event for ${day}/${month + 1}/${year}:`);

    if (userInput) {
      const newEvents = [...events, { id: generateRandomId(), name: userInput, time: new Date(year, month, day), isCompleted: false }];
      setEvents(newEvents);
      localStorage.setItem('events', JSON.stringify(newEvents));
    }
  };

  const isToday = (day: number) => {
    return (
      year === today.getFullYear() &&
      month === today.getMonth() &&
      day === today.getDate()
    );
  };

  const toggleCompletion = (id: string) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === id ? { ...event, isCompleted: !event.isCompleted } : event
      )
    );
  };

  return (
    <div className="grid grid-cols-7 gap-1">
      {
        Array(firstDayMonth)
          .fill(null)
          .map((_, index) => (
            <BlankDay
              key={index}
            />
          ))
      }

      {daysInMonth.map((day) => {
        const eventsForDay = events.filter((event) => {
          return (
            event.time.getDate() === day &&
            event.time.getMonth() === month &&
            event.time.getFullYear() === year
          );
        });

        return (
          <button
            key={day}
            className={`${isToday(day) && 'bg-blue-400'} relative h-[15vh] cursor-pointer border p-2
              rounded hover:scale-110 hover:shadow-lg hover:bg-white duration-150 group
              select-none text-[10px] md:text-sm overflow-y-auto overflow-x-hidden`}
            onDoubleClick={() => handleDateAdd(day)}
          >
            <div className={`${isToday(day) ? 'bg-blue-400' : 'bg-white'} absolute flex items-center justify-start`}>
              {day}
            </div>
            <div className="flex flex-col text-justify items-center justify-center">
              <ul className="text-start ml-5">
                {eventsForDay.map((event, index) => (
                  <div key={`${event.name}-${index}`} className="text-xs flex justify-start items-start gap-1 font-bold">
                    {
                      event?.isCompleted === undefined
                        ? <span>-</span>
                        : <input
                          type="checkbox"
                          checked={event.isCompleted}
                          onChange={() => toggleCompletion(event.id ? event.id : generateRandomId())}
                        />
                    }
                    <span>{event.name}</span>
                  </div>
                ))}
              </ul>
            </div>
            <div className="p-1 absolute flex bg-white text-xs font-semibold opacity-0 group-hover:opacity-100">
              <IoAdd size={15} />
              (Double click to add event)
            </div>
          </button>
        );
      }
      )
      }

      {
        Array(calcBlankSpaces(firstDayMonth, daysInMonth.length))
          .fill(null)
          .map((_, index) => (
            <BlankDay
              key={index}
            />
          ))
      }
    </div>
  )
}