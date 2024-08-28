import { useEffect, useState } from "react";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarGrid } from "./CalendarGrid";
import { IoHeart } from "react-icons/io5";

export const Calendar = () => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());

  useEffect(() => {
    const storedDate = localStorage.getItem('currentDate');
    if (storedDate) {
      setCurrentDate(new Date(JSON.parse(storedDate)));
    }
  }, []);

  return (
    <div className="p-4 max-h-full">
      <CalendarHeader
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
      />
      <CalendarGrid
        currentDate={currentDate}
      />
      <span
        className="flex items-center justify-center text-xs bottom-0 gap-1 mt-3">
        made with <IoHeart color="#94d5ff" /> by
        <a style={{ color: "#94d5ff", textDecoration: 'underline' }} href="http://ecruz.dev/">ecruzdev</a>
      </span>
    </div>
  )
}