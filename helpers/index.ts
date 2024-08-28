import { CalendarEvent } from "../types";

export const getDaysInMonth = (year: number, month: number): number[] => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    return [...Array(daysInMonth).keys()].map(day => day + 1);
};

export const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const today = new Date();

export const generateRandomId = () => {
    return (Math.floor(Math.random() * 1000)).toString();
};

export const calcBlankSpaces = (firstDayMonth: number, daysInMonth: number) => {
    const blankDays = (7 - ((firstDayMonth + daysInMonth) % 7));
    if (blankDays === 7)
      return 0;
    return blankDays;
};

export const getFirstDayOfMonth = (year: number, month: number) => {
  const firstDayOfMonth = new Date(year, month, 1);
  return firstDayOfMonth.getDay();
};

export const parseEventDates = (events: string) => {
    return JSON.parse(events)
      .map((event: CalendarEvent) => ({
        ...event,
        time: new Date(event.time),
      }));
};

export const mergeEvents = (localEvents: CalendarEvent[], cloudEvents: CalendarEvent[]): CalendarEvent[] => {
  const merged = [...localEvents];
  
  cloudEvents.forEach(cloudEvent => {
    const isDuplicate = localEvents.some(
      localEvent => 
        localEvent.id === cloudEvent.id && 
        localEvent.name === cloudEvent.name
    );
    
    if (!isDuplicate) {
      merged.push(cloudEvent);
    }
  });

  return merged;
};

const apiURL = "https://altomobile.blob.core.windows.net/api/test.json";

export const getCloudEvents = async() => {
  const res = await fetch(apiURL)
    .then(resp => resp.json())
    .then(data => data)
    .catch(err => console.log(err));
  
  return res;
};
