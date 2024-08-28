import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { daysOfWeek } from "../../helpers";
import { Button } from "./Button";

interface Props {
  currentDate: Date;
  setCurrentDate: (currentDate: Date) => void;
}

export const CalendarHeader = ({ currentDate, setCurrentDate }: Props) => {

  const changeMonth = (direction: number) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + direction,
      1
    );
    setCurrentDate(newDate);
    localStorage.setItem('currentDate', JSON.stringify(newDate));
  };

  const goToday = () => {
    const newDate = new Date();
    setCurrentDate(newDate);
    localStorage.setItem('currentDate', JSON.stringify(newDate));
  };

  const resetCalendar = () => {
    localStorage.removeItem('events');
    window.location.reload();
  };

  const year = currentDate.getFullYear();

  return (
    <>
      <div className="flex mb-4 border-b-2 pb-2">
        <Button
          onPress={() => changeMonth(-1)}
        >
          <div className="flex items-center gap-1">
            <IoArrowBack />
            Previous
          </div>
        </Button>
        <div className="flex w-full justify-center items-center gap-2">
          <Button
            onPress={resetCalendar}
            bgColor="bg-red-400"
          >
            Reset local events
          </Button>
          <h2 className="text-lg font-semibold">
            {currentDate.toLocaleString('en-US', { month: 'long' })} {year}
          </h2>
          <Button
            onPress={goToday}
            bgColor="bg-green-400"
          >
            Go to today
          </Button>
        </div>
        <Button
          onPress={() => changeMonth(1)}
        >
          <div className="flex items-center gap-1">
            Next
            <IoArrowForward />
          </div>
        </Button>
      </div>
      <div>
        <div className="grid grid-cols-7 font-bold mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="text-gray-700">
              {day}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
