import { Time, parseTime } from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { TimeInput, TimeInputValue } from "@nextui-org/date-input";
import { Spinner } from "@nextui-org/spinner";
import { Tooltip } from "@nextui-org/tooltip";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

import { useFetchArtistAvailabilitiesQuery } from "@/redux/features/scheduleApiSlice";
import { BookingSchema, TimeSlotSchema } from "@/schemas/booking-schemas";
import { formatTimeStringTo12Hour } from "@/utils/format-time";

type Props = {
  artist: number;
  date: Date;
};

export const TimeSlotPicker: React.FC<Props> = ({ artist, date }) => {
  const { setValue, watch } = useFormContext<z.infer<typeof BookingSchema>>();
  const [allowedStartTime, setAllowedStartTime] = useState<Time | null>(null);
  const [allowedEndTime, setAllowedEndTime] = useState<Time | null>(null);
  const selectedTimeSlot = watch("time_slot");
  const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  const { data: time_slots = [], isLoading } =
    useFetchArtistAvailabilitiesQuery({ artist: artist, date: dateString });

  // Helper function to convert "HH:mm:ss" string to Time object
  const convertToTime = (timeString: string): Time => {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    return new Time(hours, minutes, seconds);
  };

  useEffect(() => {
    if (selectedTimeSlot) {
      const startTime = convertToTime(selectedTimeSlot.start_time);
      const endTime = convertToTime(selectedTimeSlot.end_time);

      setAllowedStartTime(startTime);
      setAllowedEndTime(endTime);
    }
  }, [selectedTimeSlot]);

  const handleStartTimeChange = (timeValue: TimeInputValue) => {
    // const time = convertToTime(timeValue.toString());
    const time = parseTime(timeValue.toString());

    if (time && allowedStartTime && allowedStartTime.compare(time) <= 0) {
      setValue("startTime", time);
    }
  };
  // Get the current time
  const now = new Date();
  const isToday =
    now.getDate() === date.getDate() &&
    now.getMonth() === date.getMonth() &&
    now.getFullYear() === date.getFullYear();

  const handleEndTimeChange = (timeValue: TimeInputValue) => {
    const time = parseTime(timeValue.toString());

    if (time && allowedEndTime && allowedEndTime.compare(time) >= 0) {
      setValue("endTime", time);
    }
  };

  return (
    <>
      <div className="p-4 rounded-lg ">
        <h1 className="mb-4 text-center text-xl">Available Time Slot</h1>
        {isLoading && <Spinner label="Loading..." />}
        <div className="5 flex flex-wrap mb-8 justify-center gap-4">
          {time_slots.map((timeSlot, index) => {
            // Convert times for comparison
            const startTime = convertToTime(timeSlot.start_time);
            const endTime = convertToTime(timeSlot.end_time);

            let adjustedTimeSlot = { ...timeSlot }; // Create a new object to avoid mutation

            // Check conditions
            if (!timeSlot.is_booked && isToday) {
              const currentTime = new Time(now.getHours(), now.getMinutes());

              if (
                startTime.compare(currentTime) < 0 &&
                endTime.compare(currentTime) > 0
              ) {
                // Update the start time to current time in the new object
                adjustedTimeSlot = {
                  ...adjustedTimeSlot,
                  start_time: `${currentTime.hour}:00`,
                };
              }
            }

            return (
              <TimeSlotItem
                key={index}
                selectedDate={date}
                time_slot={adjustedTimeSlot}
              />
            );
          })}
        </div>
        {allowedStartTime && allowedEndTime && (
          <div className="flex gap-4">
            <TimeInput
              label={"Start Time"}
              labelPlacement="outside-left"
              maxValue={allowedEndTime}
              minValue={allowedStartTime}
              radius="sm"
              size="lg"
              value={watch("startTime")}
              variant="bordered"
              onChange={handleStartTimeChange}
            />
            <TimeInput
              label={"End Time"}
              labelPlacement="outside-left"
              maxValue={allowedEndTime}
              minValue={allowedStartTime}
              radius="sm"
              size="lg"
              value={watch("endTime")}
              variant="bordered"
              onChange={handleEndTimeChange}
            />
          </div>
        )}
      </div>
    </>
  );
};

type TimeSlotItemProps = {
  time_slot: z.infer<typeof TimeSlotSchema>;
  selectedDate: Date;
};

const TimeSlotItem: React.FC<TimeSlotItemProps> = ({
  time_slot,
  selectedDate,
}) => {
  const { watch, setValue } = useFormContext<z.infer<typeof BookingSchema>>();
  const selectedTimeSlot = watch("time_slot");

  // Get the current time
  const now = new Date();
  const currentTimeString = now.toTimeString().split(" ")[0]; // "HH:mm:ss"
  const [currentHours, currentMinutes] = currentTimeString
    .split(":")
    .map(Number);
  const currentTime = new Time(currentHours, currentMinutes); // Assuming you have the Time class

  // Convert the end_time string to Time object for comparison
  const [endHours, endMinutes] = time_slot.end_time.split(":").map(Number);
  const endTime = new Time(endHours, endMinutes);

  // Check if the selected date is today
  const isToday =
    selectedDate.getDate() === now.getDate() &&
    selectedDate.getMonth() === now.getMonth() &&
    selectedDate.getFullYear() === now.getFullYear();

  const handleClick = () => {
    setValue("time_slot", time_slot);
  };

  // Determine whether the button should be disabled
  const isPastTimeSlot = isToday && endTime.compare(currentTime) <= 0;

  return (
    <>
      {!time_slot.is_booked && !isPastTimeSlot ? (
        <Button
          className="text-white min-w-[200px]"
          color="primary"
          radius="full"
          size="lg"
          variant={
            selectedTimeSlot?.start_time === time_slot.start_time
              ? "solid"
              : "flat"
          }
          onClick={handleClick}
        >
          {formatTimeStringTo12Hour(time_slot.start_time)} -{" "}
          {formatTimeStringTo12Hour(time_slot.end_time)}
        </Button>
      ) : time_slot.is_booked ? (
        <Tooltip color="danger" content={"Already Booked"}>
          <Button
            className="hover:cursor-default"
            color="danger"
            radius="full"
            size="lg"
          >
            {formatTimeStringTo12Hour(time_slot.start_time)} -{" "}
            {formatTimeStringTo12Hour(time_slot.end_time)}
          </Button>
        </Tooltip>
      ) : (
        <Button
          disabled
          className="min-w-[200px] opacity-50 cursor-not-allowed"
          color="default"
          radius="full"
          size="lg"
        >
          {formatTimeStringTo12Hour(time_slot.start_time)} -{" "}
          {formatTimeStringTo12Hour(time_slot.end_time)}
        </Button>
      )}
    </>
  );
};
