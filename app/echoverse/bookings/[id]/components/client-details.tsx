import React from "react";
import { z } from "zod";

import { BookInSchema } from "@/schemas/booking-schemas";
import CustomImage from "@/components/image";

interface ClientDetailsProps {
  booking: z.infer<typeof BookInSchema>;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({ booking }) => {
  const imageUrl = booking.client.business_image
    ? booking.client.business_image
    : booking.client.profile?.profile_image;

  return (
    <div className="p-4 bg-white/5 flex flex-row-reverse gap-3 shadow-md w-full rounded-lg">
      {imageUrl && (
        <CustomImage
          className="min-w-[200px]"
          height="200px"
          src={imageUrl}
          width="200px"
        />
      )}
      <div className=" w-full">
        <h2 className="text-xl text-white/50 font-bold mb-4">Client Details</h2>
        {booking.client.business_name && (
          <div className="mb-2">
            <p className="text-gray-700">Business Name:</p>
            <p className="font-medium capitalize">
              {booking.client.business_name}
            </p>
          </div>
        )}
        <div className="mb-2">
          <p className="text-gray-700">Client Name:</p>
          <p className="font-medium capitalize">{booking.client.fullname}</p>
        </div>

        <div className="mb-2">
          <p className="text-gray-700">Client Contact:</p>
          <p className="font-medium">{booking.client.email}</p>
        </div>

        <div className="mb-2">
          <p className="text-gray-700">Client Phone No.:</p>
          <p className="font-medium">{booking.client.profile?.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default ClientDetails;
