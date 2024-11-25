"use client";

import { Button } from "@nextui-org/button";

import { useCreateUnavailableDateMutation } from "@/redux/features/scheduleApiSlice";

type Props = {
  date: Date;
  onChange:()=>void
};

export const SetDateUnavailable = ({ date, onChange }: Props) => {
  const [createUnavailableDate, { isLoading }] =
    useCreateUnavailableDateMutation();

  const handleCreate = () => {
    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const payload = {
      date: formattedDate,
    };

    createUnavailableDate(payload);
    onChange(); // Triggering parent component's onChange function to update the schedule view.
  };

  return (
    <>
      <Button
        color="danger"
        isLoading={isLoading}
        radius="full"
        size="lg"
        variant="light"
        onPress={handleCreate}
      >
        Set Unavailable
      </Button>
    </>
  );
};
