"use client";
import { useCallback, useMemo, useState } from "react";
import { z } from "zod";
import { Tab, Tabs } from "@nextui-org/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { TimeInput, TimeInputValue } from "@nextui-org/date-input";
import { skipToken } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";
import { IoAdd, IoClose, IoSave } from "react-icons/io5";
import { Spacer } from "@nextui-org/spacer";

import { formatTimeStringTo12Hour } from "@/utils/format-time";
import { AvailabilitySchema } from "@/schemas/schedule-schemas";
import { EditIcon } from "@/components/icons/edit";
import { DeleteIcon } from "@/components/icons/delete";
import {
  useCreateAvailabilityMutation,
  useCreateRecurringPatternMutation,
  useDeleteAvailabilityMutation,
  useDeleteRecurringPatternMutation,
  useEditAvailabilityTimeMutation,
  useEditRecurringPatternTimeMutation,
  useFetchArtistScheduleDaysQuery,
  useFetchCombinedAvailabilityQuery,
} from "@/redux/features/scheduleApiSlice";
import { useFetchDetailCurrentArtistQuery } from "@/redux/features/artistApiSlice";

import ArtistCalendar from "./sections/calendar";

export default function SchedulePage() {
  const { data: currentArtist, isLoading: isArtistLoading } =
    useFetchDetailCurrentArtistQuery();

  const { data: scheduledDays } = useFetchArtistScheduleDaysQuery(
    currentArtist?.id ?? skipToken,
  ); //fetch all days of availability
  const { data: combinedAvailability = [] } = useFetchCombinedAvailabilityQuery(
    currentArtist?.id ?? skipToken,
  ); //fetch all days of availability

  return (
    <div className="w-full">
      <Tabs
        aria-label="schedule_tabs"
        classNames={{
          panel:
            "w-full border-[1px] border-white/10 mt-3 p-3  rounded-lg bg-white/5",
        }}
        radius="sm"
        size="lg"
      >
        <Tab key="Set Schedule" title="Schedule">
          <>
            <Table
              isStriped
              classNames={{
                wrapper: "bg-transparent ",
                table: "text-2xl",
                td: "p-4 text-lg",
                th: "bg-blue-500/10 h-[70px] text-xl",
              }}
            >
              <TableHeader>
                <TableColumn>Weekdays</TableColumn>
                <TableColumn>Start Time</TableColumn>
                <TableColumn>End Time</TableColumn>
                <TableColumn> </TableColumn>
              </TableHeader>
              <TableBody items={combinedAvailability}>
                {(item) => (
                  <TableRow key={item.day_of_week}>
                    <TableCell>{item.day_of_week}</TableCell>
                    <TableCell>
                      {formatTimeStringTo12Hour(item.start_time)}
                    </TableCell>
                    <TableCell>
                      {formatTimeStringTo12Hour(item.end_time)}
                    </TableCell>
                    <TableCell>
                      <Actions availability={item} />
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <Spacer y={3} />
            {scheduledDays && currentArtist && (
              <AddWeekDayOrRecurringAvailability
                artistId={currentArtist.id}
                scheduledDays={scheduledDays}
              />
            )}
          </>
        </Tab>
        <Tab key="Calendar" title="Calendar">
          <ArtistCalendar />
        </Tab>
      </Tabs>
    </div>
  );
}

type ActionButtonsProps = {
  availability: z.infer<typeof AvailabilitySchema>;
};
const Actions: React.FC<ActionButtonsProps> = ({ availability }) => {
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onClose: editClose,
    onOpen: editOpen,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();
  const [startTimeEdit, setStartTimeEdit] = useState<TimeInputValue>();
  const [endTimeEdit, setEndTimeEdit] = useState<TimeInputValue>();
  const [deleteAvailability, { isLoading: deletingAvailability }] =
    useDeleteAvailabilityMutation();
  const [deleteRecurringPattern, { isLoading: deletingRecurringPattern }] =
    useDeleteRecurringPatternMutation();
  const [editAvailabilityTime, { isLoading: editingAvailabilityTime }] =
    useEditAvailabilityTimeMutation();
  const [editRecurringPatternTime, { isLoading: editingRecurringPatternTime }] =
    useEditRecurringPatternTimeMutation();
  const onDelete = () => {
    if (availability.is_recurring) {
      deleteRecurringPattern(availability.id);
    } else {
      deleteAvailability(availability.id);
    }
  };

  const onSaveEdit = async () => {
    if (!startTimeEdit || !endTimeEdit) {
      toast.error("Please select start and end time");

      return;
    }
    const payload = {
      id: availability.id,
      data: {
        start_time: startTimeEdit?.toString(),
        end_time: endTimeEdit?.toString(),
      },
    };

    if (availability.is_recurring) {
      await editRecurringPatternTime(payload);
    } else {
      await editAvailabilityTime(payload);
    }
    setStartTimeEdit(undefined);
    setEndTimeEdit(undefined);
    editClose();
  };

  return (
    <>
      <div className="space-x-2">
        <Tooltip content="Edit Time">
          <Button isIconOnly radius="full" onPress={editOpen}>
            <EditIcon />
          </Button>
        </Tooltip>
        <Tooltip content="Delete">
          <Button isIconOnly radius="full" onPress={onOpen}>
            <DeleteIcon />
          </Button>
        </Tooltip>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalBody>
            <p>Are you sure you want to delete this availability?</p>
          </ModalBody>
          <ModalFooter>
            <Button radius="sm" onPress={onClose}>
              No
            </Button>
            <Button
              color="danger"
              isDisabled={deletingRecurringPattern || deletingAvailability}
              isLoading={deletingAvailability || deletingRecurringPattern}
              radius="sm"
              onPress={onDelete}
            >
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isEditOpen} onOpenChange={onEditOpenChange}>
        <ModalContent>
          <ModalHeader>Edit Working Hours</ModalHeader>
          <ModalBody>
            <div className="flex gap-2 items-center">
              <TimeInput
                label="Start Time"
                radius="sm"
                size="lg"
                variant="bordered"
                onChange={(time) => setStartTimeEdit(time)}
              />
              <TimeInput
                label="End Time"
                radius="sm"
                size="lg"
                variant="bordered"
                onChange={(time) => setEndTimeEdit(time)}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button radius="sm" startContent={<IoClose />} onPress={editClose}>
              Close
            </Button>
            <Button
              color="primary"
              isDisabled={
                editingAvailabilityTime || editingRecurringPatternTime
              }
              isLoading={editingAvailabilityTime || editingRecurringPatternTime}
              radius="sm"
              startContent={<IoSave />}
              onPress={onSaveEdit}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

// Enum-like structure for days of the week
const DaysOfWeekEnum = {
  SUNDAY: { label: "Sunday", value: 0 },
  MONDAY: { label: "Monday", value: 1 },
  TUESDAY: { label: "Tuesday", value: 2 },
  WEDNESDAY: { label: "Wednesday", value: 3 },
  THURSDAY: { label: "Thursday", value: 4 },
  FRIDAY: { label: "Friday", value: 5 },
  SATURDAY: { label: "Saturday", value: 6 },
};

// Usage in React component

const AddWeekDayOrRecurringAvailability = ({
  scheduledDays,
  artistId,
}: {
  artistId: number;
  scheduledDays: z.infer<typeof AvailabilitySchema>[];
}) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [pickedDays, setPickedDays] = useState<number[]>([]);
  const [startTime, setStartTime] = useState<TimeInputValue>();
  const [endTime, setEndTime] = useState<TimeInputValue>();
  const [createAvailability, { isLoading: creatingAvailability }] =
    useCreateAvailabilityMutation();
  const [createRecurringPattern, { isLoading: creatingRecurringPattern }] =
    useCreateRecurringPatternMutation();

  // Check if a day is unavailable
  const isNotAvailableDay = useCallback(
    (dayValue: number): boolean => {
      return scheduledDays.some((day) => day.day_of_week === dayValue) || false;
    },
    [scheduledDays],
  );

  // Memoize days of the week array
  const daysOfWeek = useMemo(() => Object.values(DaysOfWeekEnum), []);

  // Handle toggling day selection
  const handleDayToggle = (dayValue: number) => {
    setPickedDays(
      (prev) =>
        prev.includes(dayValue)
          ? prev.filter((day) => day !== dayValue) // Remove if already selected
          : [...prev, dayValue], // Add if not selected
    );
  };

  const cleanup = () => {
    setStartTime(undefined);
    setEndTime(undefined);
    setPickedDays([]);
    onClose();
  };

  const handleOnSave = async () => {
    if (!startTime) {
      toast.error("Start time is required");

      return;
    }
    if (!endTime) {
      toast.error("End time is required");

      return;
    }
    if (startTime > endTime) {
      toast.error("Start time must be earlier than end time");

      return;
    }
    if (pickedDays.length > 0) {
      if (pickedDays.length === 1) {
        const payload = {
          artist: artistId,
          start_time: startTime?.toString(),
          end_time: endTime?.toString(),
          day_of_week: pickedDays[0],
        };

        await createAvailability(payload);
      } else {
        const payload = {
          artist: artistId,
          start_time: startTime?.toString(),
          end_time: endTime?.toString(),
          days_of_week: pickedDays,
        };

        await createRecurringPattern(payload);
      }
    }
    cleanup();
  };

  return (
    <>
      <Button
        color="secondary"
        radius="sm"
        size="lg"
        startContent={<IoAdd />}
        variant="light"
        onPress={onOpen}
      >
        New Availability Schedule
      </Button>
      <Modal
        classNames={{
          base: "bg-gradient-to-br from-blue-900/70 to-black/70 pt-4",
          backdrop: "bg-transparent",
        }}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {/* <ModalHeader>New Availability Schedule</ModalHeader> */}
          <ModalBody>
            <h1 className="text-white/70">Choose Available Weekdays</h1>
            <div className="p-4 grid grid-cols-3 gap-3">
              {daysOfWeek.map((day) => (
                <Day
                  key={day.value}
                  day={day}
                  isNotAvailable={isNotAvailableDay(day.value)}
                  isSelected={pickedDays.includes(day.value)} // Pass if the day is selected
                  onDayPress={() => handleDayToggle(day.value)} // Toggle day selection
                />
              ))}
            </div>
            <h1 className="mt-4  mb-1 text-white/70">
              Available Working Hours
            </h1>
            <div className="flex gap-2 items-center">
              <TimeInput
                label="Start Time"
                radius="sm"
                size="lg"
                variant="bordered"
                onChange={(time) => setStartTime(time)}
              />
              <TimeInput
                label="End Time"
                radius="sm"
                size="lg"
                variant="bordered"
                onChange={(time) => setEndTime(time)}
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              radius="sm"
              size="lg"
              startContent={<IoClose />}
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button
              color="primary"
              isDisabled={creatingAvailability || creatingRecurringPattern}
              isLoading={creatingAvailability || creatingRecurringPattern}
              radius="sm"
              size="lg"
              startContent={<IoSave />}
              onClick={handleOnSave}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

// Day Component
type DayProps = {
  isNotAvailable: boolean;
  isSelected: boolean;
  day: { label: string; value: number };
  onDayPress: () => void;
};

const Day: React.FC<DayProps> = ({
  isNotAvailable,
  isSelected,
  day,
  onDayPress,
}) => {
  return (
    <Button
      color={isSelected ? "primary" : "secondary"} // Change color when selected
      isDisabled={isNotAvailable}
      radius="sm"
      size="lg"
      onPress={onDayPress}
    >
      {day.label}
    </Button>
  );
};
// const [selectedDate, setSelectedDate] = useState<Date>(new Date())
// const {data:currentArtist} = useFetchDetailCurrentArtistQuery()
// const { data: unavailableDates =[] } = useFetchMyUnavailableDatesQueryQuery()

// const extractedDates:Date[] = useMemo(() => {
//     return unavailableDates.map((date)=>new Date(date.date))
// }, [unavailableDates])

// const isDateUnavailable = (date:Date) => {
//     return extractedDates.some(unavailableDate =>
//         date.getFullYear() === unavailableDate.getFullYear() &&
//         date.getMonth() === unavailableDate.getMonth() &&
//         date.getDate() === unavailableDate.getDate()
//     );
// };

// return <div className="flex">
//         {
//             unavailableDates && currentArtist &&
//     <div>

//             <DatePicker  unavailableDates={unavailableDates} dateSelected={selectedDate} setDateSelected={setSelectedDate} />
//     </div>
//         }
//     <SetDateUnavailable date={selectedDate} />
