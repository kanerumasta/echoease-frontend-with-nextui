import React from 'react';

import Link from 'next/link';
import { z } from 'zod';
import { BookInSchema } from '@/schemas/booking-schemas';
import CustomImage from '@/components/image';

interface ArtistDetailsProps {
  booking: z.infer<typeof BookInSchema>;
}

const ArtistDetails: React.FC<ArtistDetailsProps> = ({ booking }) => {
  return (
    <div className="p-4 relative bg-white/5 shadow-md w-full rounded-lg">
      <h2 className="text-xl font-bold mb-4">Echoee Details</h2>

      <div className="mb-2">
        <p className="text-gray-700">Echoee Name:</p>
        <p className="font-medium capitalize">{booking.artist.user.fullname}</p>
      </div>

      <div className="mb-2">
        <p className="text-gray-700">Echoee Profile:</p>
        <Link href={`/${booking.artist.slug}`} className="text-blue-500 absolute top-2 right-2 underline">
          <CustomImage width='150px' height='150px' src={`${process.env.NEXT_PUBLIC_HOST}${booking.artist.user.profile?.profile_image}`} />
        </Link>
      </div>

      <div className="mb-2">
        <p className="text-gray-700">Contact Info:</p>
        <p className="font-medium">{booking.artist.user.email}</p>
      </div>
    </div>
  );
};

export default ArtistDetails;
