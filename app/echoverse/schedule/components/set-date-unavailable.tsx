"use client";

import { Button } from "@nextui-org/button";

import { useCreateUnavailableDateMutation } from "@/redux/features/scheduleApiSlice";

type Props = {
  date: Date;
};

export const SetDateUnavailable = ({ date }: Props) => {
  const [createUnavailableDate, { isLoading }] =
    useCreateUnavailableDateMutation();

  const handleCreate = () => {
    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const payload = {
      date: formattedDate,
    };

    createUnavailableDate(payload);
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
