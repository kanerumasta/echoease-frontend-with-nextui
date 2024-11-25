import { Button } from "@nextui-org/button";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { z } from "zod";

import { UnavailableDateSchema } from "@/schemas/schedule-schemas";
import { cn } from "@/lib/utils";

import { SetDateAvailable } from "./set-date-available";
import { SetDateUnavailable } from "./set-date-unavailable";

export const DatePicker = ({
  dateSelected,
  setDateSelected,
  unavailableDates,
  onDatePick,
  onChange
}: {
  dateSelected: Date;
  setDateSelected: Dispatch<SetStateAction<Date>>;
  unavailableDates: z.infer<typeof UnavailableDateSchema>[];
  onDatePick?: () => void;
  onChange?:()=>void
}) => {
  const extractedDates: Date[] = useMemo(() => {
    return unavailableDates.map((date) => new Date(date.date));
  }, [unavailableDates]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const currentDate = new Date();

  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  // const [selectedDate, setSelectedDate] = useState(currentDate)

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    if (
      currentMonth === currentDate.getMonth() &&
      currentYear === currentDate.getFullYear()
    ) {
      return; // Prevent going back if currently on the current month
    }
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear,
    );
  };

  const nextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear,
    );
  };

  const handleDayClick = (day: number) => {
    const clickedDate = new Date(currentYear, currentMonth, day);

    setDateSelected(clickedDate);
  };

  const isPastDate = (day: number, currentDate: Date) => {
    const dateToCheck = new Date(currentYear, currentMonth, day);

    const today = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate(),
    );

    return dateToCheck < today;
  };

  const isDateUnavailable = (day: number) => {
    const dateToCheck = new Date(currentYear, currentMonth, day);

    return extractedDates.some(
      (unavailableDate) =>
        dateToCheck.getFullYear() === unavailableDate.getFullYear() &&
        dateToCheck.getMonth() === unavailableDate.getMonth() &&
        dateToCheck.getDate() === unavailableDate.getDate(),
    );
  };

  const findUDid = (dateToCheck: Date) => {
    const unavailableDate = unavailableDates.find(
      (date) =>
        date.date ===
        `${dateToCheck.getFullYear()}-${dateToCheck.getMonth() + 1}-${dateToCheck.getDate()}`,
    );

    return unavailableDate ? unavailableDate.id : null;
  };

  useEffect(() => {
    setDateSelected(dateSelected);
  }, [dateSelected]);

  return (
    <div className="">
      <div className="bg-gradient-to-br  from-blue-500/20 to-purple-500/20  rounded-lg p-4">
        {/* navigate date */}
        <div className="flex justify-between items-center pl-4 mb-6">
          <div className="flex gap-2">
            <h2 className="text-xl">{months[currentMonth]}</h2>
            <h1 className="text-xl">{currentYear}</h1>
          </div>
          <div className="flex gap-2">
            <Button isIconOnly radius="full" onClick={prevMonth}>
              <FaChevronLeft />
            </Button>
            <Button isIconOnly radius="full" onClick={nextMonth}>
              <FaChevronRight />
            </Button>
          </div>
        </div>
        {/* weekdays */}
        <div className="grid grid-cols-7  text-2xl gap-4 justify-end text-white/30">
          {weekDays.map((day) => (
            <span key={day} className="text-center p-4 ">
              {day.substring(0, 3)}
            </span>
          ))}
        </div>
        {/* days */}
        <div className="grid grid-cols-7  justify-end">
          {Array.from(Array(firstDayOfMonth).keys()).map((_, index) => (
            <span key={`empty=${index}`} className="text-3xl p-2" />
          ))}
          {Array.from({ length: daysInMonth }, (_, index) => index).map(
            (day) => {
              const clickedDate = new Date(currentYear, currentMonth, day + 1);

              return (
                <div
                  key={day + 1}
                  className={cn(
                    "text-4xl transition-all duration-100 flex items-center justify-center rounded-full h-[100px] w-[100px] relative cursor-pointer text-center",
                    {
                      "bg-blue-500 shadow-blue-900  shadow-md":
                        day + 1 === dateSelected?.getDate() &&
                        dateSelected?.getMonth() === currentMonth,
                      "text-green-500":
                        currentDate.getMonth() === currentMonth &&
                        day + 1 === currentDate.getDate(),
                      "text-white/10": isPastDate(day + 1, currentDate),
                      "text-red-500": isDateUnavailable(day + 1),
                    },
                  )}
                  onClick={() => {
                    if (!isPastDate(day + 1, currentDate)) {
                      handleDayClick(day + 1);
                      onDatePick &&
                        setTimeout(() => {
                          onDatePick();
                        }, 200);
                    }
                  }}
                >
                  {day + 1}
                </div>
              );
            },
          )}
        </div>
      </div>
      <div className="mt-4 w-full flex justify-end">
        {isDateUnavailable(dateSelected.getDate()) && (
          <SetDateAvailable onChange={onChange ? onChange : ()=>{}} id={findUDid(dateSelected)} />
        )}
        {!isDateUnavailable(dateSelected.getDate()) && (
          <SetDateUnavailable onChange={onChange ? onChange : ()=>{}} date={dateSelected} />
        )}
      </div>
    </div>
  );
};
