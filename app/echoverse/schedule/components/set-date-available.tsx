"use client";

import { Button } from "@nextui-org/button";
import { toast } from "react-toastify";

import { useDeleteUnavailableDateMutation } from "@/redux/features/scheduleApiSlice";

//id here is the id of UNAVAILABLEDATE model
export const SetDateAvailable = ({ id }: { id: number | null }) => {
  const [deleteUnavailableDate, { isLoading }] =
    useDeleteUnavailableDateMutation();
  const handleSetAvailable = () => {
    if (id) deleteUnavailableDate(id);
    else toast.error("Cant find date ID");
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
