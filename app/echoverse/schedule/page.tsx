'use client'
import { useFetchDetailCurrentArtistQuery } from "@/redux/features/artistApiSlice";
import { useCreateAvailabilityMutation, useCreateRecurringPatternMutation, useDeleteAvailabilityMutation, useDeleteRecurringPatternMutation, useEditAvailabilityTimeMutation, useEditRecurringPatternTimeMutation, useFetchArtistScheduleDaysQuery, useFetchCombinedAvailabilityQuery } from "@/redux/features/scheduleApiSlice";
import { useCallback, useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { DatePicker } from "./components/custom-date-picker";
import { SetDateUnavailable } from "./components/set-date-unavailable";
import { Tab, Tabs } from "@nextui-org/tabs";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";
import { Button } from "@nextui-org/button";
import { DeleteIcon } from "@/components/icons/delete";
import { EditIcon } from "@/components/icons/edit";
import { Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@nextui-org/modal";
import { TimeInput, TimeInputValue } from "@nextui-org/date-input";
import { AvailabilitySchema } from "@/schemas/schedule-schemas";
import { skipToken } from "@reduxjs/toolkit/query";
import { toast } from "react-toastify";
import { formatTimeStringTo12Hour } from "@/utils/format-time";
import { IoAdd, IoClose, IoSave } from "react-icons/io5";
import { Spacer } from "@nextui-org/spacer";
import { CustomDatePicker } from "@/app/[slug]/components/custom-datepicker";
import ArtistCalendar from "./sections/calendar";

export default function SchedulePage(){
    const { data: currentArtist, isLoading: isArtistLoading } = useFetchDetailCurrentArtistQuery();

    const {data:scheduledDays} = useFetchArtistScheduleDaysQuery(
        currentArtist?.id ?? skipToken
    )//fetch all days of availability
    const {data:combinedAvailability=[]} = useFetchCombinedAvailabilityQuery(
        currentArtist?.id ?? skipToken
    )//fetch all days of availability


    return <div className="w-full">
        <Tabs size="lg" radius="sm" aria-label="schedule_tabs" classNames={{panel:'w-full border-[1px] border-white/10 mt-3 p-3  rounded-lg bg-white/5'}}>
            <Tab key={"events"} title="Events">

            </Tab>
            <Tab key="Set Schedule" title="Schedule">
                <>
                <Table isStriped classNames={{wrapper:'bg-transparent ',table:'text-2xl',td:'p-4 text-lg',th:'bg-blue-500/10 h-[70px] text-xl'}}>
                    <TableHeader>
                        <TableColumn>Weekdays</TableColumn>
                        <TableColumn>Start Time</TableColumn>
                        <TableColumn>End Time</TableColumn>
                        <TableColumn> </TableColumn>
                    </TableHeader>
                    <TableBody items={combinedAvailability}>
                        {item=>(
                            <TableRow key={item.day_of_week}>
                                <TableCell>{item.day_of_week}</TableCell>
                                <TableCell>{formatTimeStringTo12Hour(item.start_time)}</TableCell>
                                <TableCell>{formatTimeStringTo12Hour(item.end_time)}</TableCell>
                                <TableCell><Actions availability={item}/></TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <Spacer y={3}/>
                {scheduledDays && currentArtist && <AddWeekDayOrRecurringAvailability artistId={currentArtist.id} scheduledDays={scheduledDays}/>}
                </>
            </Tab>
            <Tab key="Calendar" title="Calendar">

                <ArtistCalendar />
            </Tab>
        </Tabs>


    </div>
}

type ActionButtonsProps = {
    availability:z.infer<typeof AvailabilitySchema>,

}
const Actions:React.FC<ActionButtonsProps> = ({availability}) => {
    const { isOpen, onClose ,onOpen, onOpenChange} = useDisclosure();
    const {isOpen:isEditOpen, onClose:editClose, onOpen:editOpen, onOpenChange:onEditOpenChange} = useDisclosure();
    const [startTimeEdit, setStartTimeEdit] = useState<TimeInputValue>()
    const [endTimeEdit, setEndTimeEdit] = useState<TimeInputValue>()
    const [deleteAvailability,{isLoading:deletingAvailability}] = useDeleteAvailabilityMutation()
    const [deleteRecurringPattern,{isLoading:deletingRecurringPattern}] = useDeleteRecurringPatternMutation()
    const [editAvailabilityTime,{isLoading:editingAvailabilityTime}] = useEditAvailabilityTimeMutation()
    const [editRecurringPatternTime,{isLoading:editingRecurringPatternTime}] = useEditRecurringPatternTimeMutation()
    const onDelete = () => {
        if(availability.is_recurring){
            deleteRecurringPattern(availability.id)
        }else{
            deleteAvailability(availability.id)
        }
    }

    const onSaveEdit = async () => {
        if(!startTimeEdit || !endTimeEdit){
            toast.error("Please select start and end time")
            return
        }
        const payload = {
            id: availability.id,
            data:{
            start_time: startTimeEdit?.toString(),
            end_time: endTimeEdit?.toString()
            }
        }
        if(availability.is_recurring){
           await editRecurringPatternTime(payload)
        }else{
            await editAvailabilityTime(payload)
        }
        setStartTimeEdit(undefined)
        setEndTimeEdit(undefined)
        editClose()
    }
    return <><div className="space-x-2">
                        <Tooltip content="Edit Time">
                                <Button onPress={editOpen}  radius="full" isIconOnly>
                                    <EditIcon/>
                                </Button>
                            </Tooltip>
                            <Tooltip   content="Delete">
                                <Button onPress={onOpen} radius="full" isIconOnly>
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
                            <Button radius="sm" onPress={onClose}>No</Button>
                            <Button isLoading={deletingAvailability || deletingRecurringPattern} isDisabled={deletingRecurringPattern || deletingAvailability} radius="sm" color="danger" onPress={onDelete}>Yes</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                <Modal isOpen={isEditOpen} onOpenChange={onEditOpenChange}>
                    <ModalContent>
                        <ModalHeader>Edit Working Hours</ModalHeader>
                        <ModalBody>
                        <div className="flex gap-2 items-center">
                            <TimeInput variant="bordered" onChange={(time)=>setStartTimeEdit(time)} radius="sm" size="lg" label="Start Time" />
                            <TimeInput variant="bordered" onChange={(time)=>setEndTimeEdit(time)} radius="sm" size="lg" label="End Time" />
                        </div>
                        </ModalBody>
                        <ModalFooter>
                            <Button radius="sm" onPress={editClose} startContent={<IoClose />}>Close</Button>
                            <Button isLoading={editingAvailabilityTime || editingRecurringPatternTime} isDisabled={editingAvailabilityTime || editingRecurringPatternTime} radius="sm" color="primary" onPress={onSaveEdit} startContent={<IoSave />}>Save</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
                </>


}



// Enum-like structure for days of the week
const DaysOfWeekEnum = {
    SUNDAY: { label: "Sunday", value: 0 },
    MONDAY: { label: "Monday", value: 1 },
    TUESDAY: { label: "Tuesday", value: 2 },
    WEDNESDAY: { label: "Wednesday", value: 3 },
    THURSDAY: { label: "Thursday", value: 4 },
    FRIDAY: { label: "Friday", value: 5 },
    SATURDAY: { label: "Saturday", value: 6 }
};


// Usage in React component


const AddWeekDayOrRecurringAvailability = ({ scheduledDays, artistId }:{artistId:number,scheduledDays:z.infer<typeof AvailabilitySchema>[]}) => {
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [pickedDays, setPickedDays] = useState<number[]>([]);
    const [startTime, setStartTime] = useState<TimeInputValue>()
    const [endTime, setEndTime] = useState<TimeInputValue>()
    const [createAvailability, {isLoading:creatingAvailability}] = useCreateAvailabilityMutation()
    const [createRecurringPattern,{isLoading:creatingRecurringPattern}] = useCreateRecurringPatternMutation()

    // Check if a day is unavailable
    const isNotAvailableDay = useCallback(
        (dayValue: number): boolean => {
            return scheduledDays.some((day) => day.day_of_week === dayValue) || false;
        },
        [scheduledDays]
    );

    // Memoize days of the week array
    const daysOfWeek = useMemo(() => Object.values(DaysOfWeekEnum), []);

    // Handle toggling day selection
    const handleDayToggle = (dayValue: number) => {
        setPickedDays((prev) =>
            prev.includes(dayValue)
                ? prev.filter((day) => day !== dayValue) // Remove if already selected
                : [...prev, dayValue] // Add if not selected
        );
    };

    const cleanup = () => {
        setStartTime(undefined)
        setEndTime(undefined)
        setPickedDays([])
        onClose()
    }

    const handleOnSave = async() => {
        if(!startTime){
            toast.error("Start time is required")
            return;
        }
        if(!endTime){
            toast.error("End time is required")
            return;
        }
        if(startTime > endTime){
            toast.error("Start time must be earlier than end time")
            return
        }
        if(pickedDays.length > 0){
        if(pickedDays.length === 1){
            const payload = {
                artist:artistId,
                start_time:startTime?.toString(),
                end_time: endTime?.toString(),
                day_of_week: pickedDays[0]
            }
            await createAvailability(payload)
        }else{
            const payload = {
                artist:artistId,
                start_time: startTime?.toString(),
                end_time: endTime?.toString(),
                days_of_week: pickedDays
            }
            await createRecurringPattern(payload)
        }
    }
    cleanup()
    }

    return (
        <>
            <Button radius="sm" size="lg" variant="light" color="secondary"  startContent={<IoAdd />} onPress={onOpen}>New Availability Schedule</Button>
            <Modal classNames={{base:'bg-gradient-to-br from-blue-900/70 to-black/70 pt-4',backdrop:'bg-transparent'}} isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {/* <ModalHeader>New Availability Schedule</ModalHeader> */}
                    <ModalBody>
                        <h1 className="text-white/70">Choose Available Weekdays</h1>
                        <div className="p-4 grid grid-cols-3 gap-3">
                            {daysOfWeek.map((day) => (
                                <Day
                                    key={day.value}
                                    isNotAvailable={isNotAvailableDay(day.value)}
                                    isSelected={pickedDays.includes(day.value)} // Pass if the day is selected
                                    day={day}
                                    onDayPress={() => handleDayToggle(day.value)} // Toggle day selection
                                />
                            ))}
                        </div>
                        <h1 className="mt-4  mb-1 text-white/70">Available Working Hours</h1>
                        <div className="flex gap-2 items-center">
                            <TimeInput variant="bordered" onChange={(time)=>setStartTime(time)} radius="sm" size="lg" label="Start Time" />
                            <TimeInput variant="bordered" onChange={(time)=>setEndTime(time)} radius="sm" size="lg" label="End Time" />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button startContent={<IoClose />} radius="sm" size="lg" onClick={onClose}>Cancel</Button>
                        <Button startContent={<IoSave />} color="primary" radius="sm" size="lg" isLoading={creatingAvailability || creatingRecurringPattern} isDisabled={creatingAvailability || creatingRecurringPattern} onClick={handleOnSave}>Save</Button>
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

const Day: React.FC<DayProps> = ({ isNotAvailable, isSelected, day, onDayPress }) => {
    return (
        <Button
            size="lg"
            radius="sm"
            isDisabled={isNotAvailable}
            color={isSelected ? 'primary' : 'secondary'} // Change color when selected

            onPress={onDayPress}
        >
            {day.label}
        </Button>
    );

}
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
