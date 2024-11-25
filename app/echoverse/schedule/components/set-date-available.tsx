"use client";

import { Button } from "@nextui-org/button";
import { toast } from "react-toastify";

import { useDeleteUnavailableDateMutation } from "@/redux/features/scheduleApiSlice";

//id here is the id of UNAVAILABLEDATE model
export const SetDateAvailable = ({ id , onChange}: { id: number | null, onChange:()=>void }) => {
  const [deleteUnavailableDate, { isLoading }] =
    useDeleteUnavailableDateMutation();
  const handleSetAvailable = () => {
    if (id) deleteUnavailableDate(id);
    else toast.error("Cant find date ID");
    onChange(); // Call the parent component's onChange function to update the schedule view.
  };

  return (
    <>
      <Button
        color="success"
        isLoading={isLoading}
        radius="full"
        size="lg"
        variant="light"
        onPress={handleSetAvailable}
      >
        Set Available
      </Button>
    </>
  );
};
