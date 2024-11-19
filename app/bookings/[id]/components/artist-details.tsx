import React from "react";
import Link from "next/link";
import { z } from "zod";

import { BookInSchema } from "@/schemas/booking-schemas";
import CustomImage from "@/components/image";

interface ArtistDetailsProps {
  booking: z.infer<typeof BookInSchema>;
}

const ArtistDetails: React.FC<ArtistDetailsProps> = ({ booking }) => {
  return (


    <div className="p-4 relative  flex gap-3 border-b-[1px] border-white/10 w-full ">
    <div className="mb-2">
        <p className="text-gray-700">Echoee Profile:</p>
        <Link
          className="text-blue-500 "
          href={`/${booking.artist.slug}`}
        >
          {booking.artist.user.profile && (
            <CustomImage
              height="150px"
              src={booking.artist.user.profile?.profile_image}
              width="150px"
            />
          )}
        </Link>

      </div>
      <div>
        <div>
            <h2 className="text-xl font-bold mb-4">Echoee Details</h2>

            <div className="mb-2">
                <p className="text-gray-700">Echoee Name:</p>
                <p className="font-medium capitalize">{booking.artist.user.fullname}</p>
            </div>
      </div>



{
    booking.artist.user.profile?.phone &&
      <div className="mb-2">
        <p className="text-gray-700">Contact Info:</p>
        <p className="font-medium">{booking.artist.user.profile.phone}</p>
      </div>
}
    </div>
    </div>
  );
};

export default ArtistDetails;
