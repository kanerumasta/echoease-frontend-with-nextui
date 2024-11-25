import { Button } from "@nextui-org/button";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { z } from "zod";

import { UnavailableDateSchema } from "@/schemas/schedule-schemas";
import { useFetchArtistWeekdaysAvailabilityQuery } from "@/redux/features/scheduleApiSlice";
import { cn } from "@/lib/utils";

type DatePickerProps = {
  dateSelected: Date | null;
  setDateSelected: Dispatch<SetStateAction<Date | null>>;
  unavailableDates: z.infer<typeof UnavailableDateSchema>[];
  onDatePick?: () => void;
  artistId: number;
};

export const DatePicker: React.FC<DatePickerProps> = ({
  dateSelected,
  setDateSelected,
  unavailableDates,
  onDatePick,
  artistId,
}) => {
  const { data: weekdaysAvailability = [] } =
    useFetchArtistWeekdaysAvailabilityQuery(artistId);

  const extractedDates: Date[] = useMemo(() => {
    return unavailableDates.map((date) => new Date(date.date));
  }, [unavailableDates]);

  const isDateUnavailable = (day: number) => {
    const dateToCheck = new Date(currentYear, currentMonth, day);

    return extractedDates.some(
      (unavailableDate) =>
        dateToCheck.getFullYear() === unavailableDate.getFullYear() &&
        dateToCheck.getMonth() === unavailableDate.getMonth() &&
        dateToCheck.getDate() === unavailableDate.getDate(),
    );
  };

  const isWeekdayUnavailable = (date: Date) => {
    const weekdayIndex = date.getDay();
    const isUnavailable = !weekdaysAvailability.includes(weekdayIndex);

    return isUnavailable;
  };

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

    if (isDateUnavailable(day) || isWeekdayUnavailable(clickedDate)) {
      return; // Prevent selecting unavailable dates or unavailable weekdays
    }
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

  useEffect(() => {
    setDateSelected(dateSelected);
  }, [dateSelected]);

  return (
    <div className="">
      <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg p-4">
        {/* navigate date */}
        <div className="flex justify-between items-center pl-4 mb-6">
          <div className="flex gap-2">
            <h2 className="text-xl">{months[currentMonth]}</h2>
            <h1 className="text-xl">{currentYear}</h1>
          </div>
          <div className="flex gap-2">
            <Button
              isIconOnly
              color="primary"
              radius="full"
              onClick={prevMonth}
            >
              <FaChevronLeft />
            </Button>
            <Button
              isIconOnly
              color="primary"
              radius="full"
              onClick={nextMonth}
            >
              <FaChevronRight />
            </Button>
          </div>
        </div>

        {/* weekdays */}
        <div className="flex text-lg justify-between p-2 text-white/40">
          {weekDays.map((day) => (
            <span key={day} className="text-center">
              {day.substring(0, 3)}
            </span>
          ))}
        </div>

        {/* days */}
        <div className="grid grid-cols-7 gap-4 justify-center">
          {Array.from(Array(firstDayOfMonth).keys()).map((_, index) => (
            <span key={`empty=${index}`} className="text-xl p-2" />
          ))}
          {Array.from({ length: daysInMonth }, (_, index) => index).map(
            (day) => {
              const dateToCheck = new Date(currentYear, currentMonth, day + 1);
              const isUnavailable =
                isDateUnavailable(day + 1) || isWeekdayUnavailable(dateToCheck);
              const isToday =
                currentDate.getMonth() === currentMonth &&
                day + 1 === currentDate.getDate();

              return (
                <div
                  key={day + 1}
                  className={cn(
                    "text-2xl rounded-full bg-white/5 flex items-center justify-center w-[50px] h-[50px] cursor-pointer text-center",
                    {
                      "bg-blue-500 shadow-blue-900 shadow-md":
                        day + 1 === dateSelected?.getDate() &&
                        dateSelected?.getMonth() === currentMonth,
                      "text-yellow-500": isToday,
                      "text-[#f31260] cursor-default": isUnavailable,
                      "text-white/10": isPastDate(day + 1, currentDate),
                    },
                  )}
                  onClick={() => {
                    if (!isPastDate(day + 1, currentDate) && !isUnavailable) {
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
    </div>
  );
};
