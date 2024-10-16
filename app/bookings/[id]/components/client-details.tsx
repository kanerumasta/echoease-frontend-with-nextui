import React from 'react';
import { z } from 'zod';
import { BookInSchema } from '@/schemas/booking-schemas';

interface ClientDetailsProps {
  booking: z.infer<typeof BookInSchema>;
}

const ClientDetails: React.FC<ClientDetailsProps> = ({ booking }) => {
  return (
    <div className="p-4 bg-white/5 shadow-md w-full rounded-lg mt-4">
      <h2 className="text-xl font-bold mb-4">Client Details</h2>

      <div className="mb-2">
        <p className="text-gray-700">Client Name:</p>
        <p className="font-medium">{booking.client.fullname}</p>
      </div>

      <div className="mb-2">
        <p className="text-gray-700">Client Contact:</p>
        <p className="font-medium">{booking.client.email}</p>
      </div>

      <div className="mb-2">
        <p className="text-gray-700">Client Role:</p>
        <p className="font-medium">{booking.client.role || 'Individual'}</p>
      </div>
    </div>
  );
};

export default ClientDetails;
