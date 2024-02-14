import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { ReactDayPickerProps } from "../../types/types.portal";

const ReactDayPicker: React.FC<ReactDayPickerProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  const [showData, setShowData] = useState<boolean>(false);
  const dateInputRef = useRef<HTMLInputElement | null>(null);
  const [showDate, setShowDate] = useState(false);
  const handleDayClick = (selectedDate: Date) => {
    setSelectedDate(selectedDate);
    setShowData(false);
    setShowDate(true);
  };

  const handleClickOutside = (e: MouseEvent): void => {
    if (!dateInputRef?.current?.contains(e.target as Node | null)) {
      setShowData(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div ref={dateInputRef} className="relative">
      <label
        htmlFor=""
        className="text-sm font-medium pb-1 block text-[#000000e3]"
      >
        DeadLine*
      </label>
      <div className="border flex items-center gap-4 pl-5 rounded-lg form-input relative pr-5">
        <FaRegCalendarAlt className="text-[#38bdf8] text-sm" />
        <input
          type="text"
          placeholder={format(selectedDate, "PP")}
          value={showDate ? format(selectedDate, "PP") : ""}
          className=" text-sm h-10 font-normal text-black relative w-full"
          onClick={() => setShowData(true)}
        />
      </div>
      {showData && (
        <DayPicker
          mode="single"
          selected={selectedDate}
          onSelect={(selectedDate) => handleDayClick(selectedDate as Date)}
        />
      )}
    </div>
  );
};

export default ReactDayPicker;
