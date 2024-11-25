"use client";

import { Input } from "@nextui-org/input";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { z } from "zod";

import { ArtistApplicationSchema } from "@/schemas/artist-schemas";
import { cn } from "@/lib/utils";

export const Step5 = () => {
  const form = useFormContext<z.infer<typeof ArtistApplicationSchema>>();

  const [channelCode, setChannelCode] = useState("PH_GCASH");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  useEffect(() => {
    form.setValue("channel_code", channelCode);
  }, [channelCode]);

  useEffect(() => {
    if (accountHolderName)
      form.setValue("account_holder_name", accountHolderName);
  }, [accountHolderName]);

  useEffect(() => {
    if (accountNumber) form.setValue("account_number", accountNumber);
  }, [accountNumber]);

  return (
    <div className="space-y-4">
      <PaymentChannelPicker
        channel_code={channelCode}
        setChannelCode={setChannelCode}
      />
      <Input
        errorMessage={form.formState.errors.account_holder_name?.message}
        isInvalid={!!form.formState.errors.account_holder_name}
        label="Account Holder Name"
        placeholder="Type your account holder name here."
        onChange={(e) => setAccountHolderName(e.target.value)}
      />
      <Input
        errorMessage={form.formState.errors.account_number?.message}
        isInvalid={!!form.formState.errors.account_number}
        label="Account Number"
        placeholder="09xxxxxxxxx"
        type="number"
        onChange={(e) => setAccountNumber(e.target.value)}
      />
    </div>
  );
};

type ChannelPickerProps = {
  channel_code: string;

  setChannelCode: Dispatch<SetStateAction<string>>;
};

const PaymentChannelPicker = ({
  channel_code,
  setChannelCode,
}: ChannelPickerProps) => {
  return (
    <div>
      <p className="text-2xl text-white font-bold mb-4">
        Why Set Up Your Payment Account?
      </p>
      <p className="text-lg text-white/50 mb-3">
        Setting up your payment account (Gcash, GrabPay, or PayMaya) ensures a
        seamless and secure transaction experience. This payment method will be
        used to directly transfer your earnings once an event booking is
        successfully completed.
      </p>
      <div className="flex flex-col md:flex-row items-center ">
        <ChannelButton
          imageSrc="/media/GCash-Logo.png"
          isActive={channel_code === "PH_GCASH"}
          label="GCash"
          onClick={() => setChannelCode("PH_GCASH")}
        />
        <ChannelButton
          imageSrc="/media/paymaya.png"
          isActive={channel_code === "PH_PAYMAYA"}
          label="PayMaya"
          onClick={() => setChannelCode("PH_PAYMAYA")}
        />
        <ChannelButton
          imageSrc="/media/grabpay.png"
          isActive={channel_code === "PH_GRABPAY"}
          label="GrabPay"
          onClick={() => setChannelCode("PH_GRABPAY")}
        />
      </div>
    </div>
  );
};

const ChannelButton = ({
  imageSrc,
  isActive,
  label,
  onClick,
}: {
  imageSrc: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <div
      className={cn("p-2 rounded-xl m-3", { "bg-blue-100": isActive })}
      role="button"
      onClick={onClick}
    >
      <Image alt={label} height={200} src={imageSrc} width={200} />
    </div>
  );
};
