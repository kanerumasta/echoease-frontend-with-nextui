import React from 'react';
import { z } from 'zod';
import { BookInSchema } from '@/schemas/booking-schemas';
import CustomImage from '@/components/image';

interface ClientDetailsProps {
  booking: z.infer<typeof BookInSchema>;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({ booking }) => {
  return (
    <div className="p-4 bg-white/5 flex gap-3 shadow-md w-full rounded-lg">
        <CustomImage width='200px' height='200px' src={`${process.env.NEXT_PUBLIC_HOST}${booking.client.profile?.profile_image}`}/>
        <div>
      <h2 className="text-xl font-bold mb-4">Client Details</h2>

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
