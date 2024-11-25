// "use client";

// import { useFormContext } from "react-hook-form";
// import { z } from "zod";
// import Link from "next/link";
// import { Divider } from "@nextui-org/divider";

// import { ArtistInSchema } from "@/schemas/artist-schemas";
// import { BookingSchema } from "@/schemas/booking-schemas";
// import { UserSchema } from "@/schemas/user-schemas";
// import { formatTimeTo12Hour } from "@/utils/format-time";

// export const FinalBookingStep = ({
//   artist,
//   currentUser,
// }: {
//   artist: z.infer<typeof ArtistInSchema>;
//   currentUser: z.infer<typeof UserSchema>;
// }) => {
//   const form = useFormContext<z.infer<typeof BookingSchema>>();

//   const getLocation = () => {
//     const watch = form.watch;

//     return `${watch("street")}, ${watch("barangay")}, ${watch("municipality")}, Cebu @${watch("landmark")}`;
//   };

//   return (
//     <div className="p-6 rounded-lg shadow-lg bg-gray-800 text-white max-w-2xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6 text-center">Booking Summary</h2>

//       <div className="mb-6 mt-3">
//         <h3 className="text-lg font-semibold mb-2">Event Details</h3>
//         <p className="mb-1">
//           Event Name:{" "}
//           <span className="font-medium">{form.watch("eventName")}</span>
//         </p>
//         <p className="mb-1">
//           Date:{" "}
//           <span className="font-medium">
//             {form.watch("eventDate").toDateString()}
//           </span>
//         </p>
//         <p className="mb-1">
//           Time:{" "}
//           <span className="font-medium">{`${formatTimeTo12Hour(form.watch("startTime"))} - ${formatTimeTo12Hour(form.watch("endTime"))}`}</span>
//         </p>
//         <p className="mb-1">
//           Location: <span className="font-medium">{getLocation()}</span>
//         </p>
//         <p className="mb-1">
//           Venue: <span className="font-medium">{form.watch("venue")}</span>
//         </p>
//       </div>
//       <Divider />

//       <div className="mb-6 mt-3">
//         <h3 className="text-lg font-semibold mb-2">Artist Information</h3>
//         <p className="mb-1">
//           Artist Name:{" "}
//           <span className="font-medium">{artist.user.first_name}</span>
//         </p>
//         <p className="mb-1">
//           Contact:{" "}
//           <span className="font-medium">{artist.user.profile?.phone}</span>
//         </p>
//       </div>
//       <Divider />

//       <div className="mb-6 mt-3">
//         <h3 className="text-lg font-semibold mb-2">Client Information</h3>
//         <p className="mb-1">
//           Client Name:{" "}
//           <span className="font-medium">{currentUser.fullname}</span>
//         </p>
//         <p className="mb-1">
//           Contact:{" "}
//           <span className="font-medium">{currentUser.profile?.phone}</span>
//         </p>
//       </div>
//       <Divider />

//       <div className="mb-6 mt-3">
//         <h3 className="text-lg font-semibold mb-2">Rates & Payment</h3>
//         <p className="mb-1">
//           Rate Description:{" "}
//           <span className="font-medium">{form.watch("rateName")}</span>
//         </p>
//         <p className="mb-1">
//           Rate Amount:{" "}
//           <span className="font-medium">${form.watch("rateAmount")}</span>
//         </p>
//       </div>
//       <Divider />

//       <div>
//         <h3 className="text-lg font-semibold mb-2">Cancellation Policy</h3>
//         <Link
//           className="text-blue-400 hover:underline"
//           href="/policies/booking-policy"
//           rel="noopener noreferrer"
//           target="_blank"
//         >
//           View cancellation policy here
//         </Link>
//       </div>
//     </div>
//   );
// };
"use client";

import { useFormContext } from "react-hook-form";
import { z } from "zod";
import Image from "next/image";
import Link from "next/link";
import { Divider } from "@nextui-org/divider";

import { ArtistInSchema } from "@/schemas/artist-schemas";
import { BookingSchema } from "@/schemas/booking-schemas";
import { UserSchema } from "@/schemas/user-schemas";
import { formatTimeTo12Hour } from "@/utils/format-time";
import { Avatar } from "@nextui-org/avatar";

export const FinalBookingStep = ({
  artist,
  currentUser,
}: {
  artist: z.infer<typeof ArtistInSchema>;
  currentUser: z.infer<typeof UserSchema>;
}) => {
  const form = useFormContext<z.infer<typeof BookingSchema>>();

  const getLocation = () => {
    const watch = form.watch;

    return `${watch("street")}, ${watch("barangay")}, ${watch("municipality")}, Cebu @${watch("landmark")}`;
  };

  return (
    <div className="p-8 rounded-lg shadow-lg bg-gray-900 text-gray-200 max-w-3xl mx-auto border border-gray-700">
      {/* Header Section */}
      <header className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-100">Booking Summary</h2>
        <p className="text-gray-400">
          Review the details of your booking below
        </p>
      </header>

      {/* Artist Details Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gray-100 mb-4">
          Artist Details
        </h3>
        <div className="flex items-center gap-6">
          {/* <Image
            alt={`${artist.user.first_name}'s profile`}
            className="rounded-full object-cover border border-gray-700"
            height={90}
            src={artist.user.profile?.profile_image || "/placeholder.png"}
            width={90}
          /> */}
          <Avatar size="lg"  src={artist.user.profile?.profile_image} alt={artist.user.first_name[0]}/>
          <div>
            <p className="text-lg font-medium text-gray-200">
              {artist.user.fullname}
            </p>
            <p className="text-gray-400 flex items-center gap-2">
              📞 <span>{artist.user.profile?.phone || "N/A"}</span>
            </p>
          </div>
        </div>
      </section>
      <Divider className="my-4 border-gray-700" />

      {/* Event Details Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gray-100 mb-4">
          Event Details
        </h3>
        <div className="space-y-2">
          <p>
            <span className="font-medium text-gray-400">Event Name:</span>{" "}
            <span className="font-bold text-gray-100">
              {form.watch("eventName")}
            </span>
          </p>
          <p>
            <span className="font-medium text-gray-400">Date:</span>{" "}
            <span className="font-bold text-gray-100">
              {form.watch("eventDate").toDateString()}
            </span>
          </p>
          <p>
            <span className="font-medium text-gray-400">Time:</span>{" "}
            <span className="font-bold text-gray-100">{`${formatTimeTo12Hour(form.watch("startTime"))} - ${formatTimeTo12Hour(form.watch("endTime"))}`}</span>
          </p>
          <p>
            <span className="font-medium text-gray-400">Location:</span>{" "}
            <span className="font-bold text-gray-100">{getLocation()}</span>
          </p>
          <p>
            <span className="font-medium text-gray-400">Venue:</span>{" "}
            <span className="font-bold text-gray-100">
              {form.watch("venue")}
            </span>
          </p>
        </div>
      </section>
      <Divider className="my-4 border-gray-700" />

      {/* Client Details Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gray-100 mb-4">
          Your Details
        </h3>
        <div className="space-y-2">
          <p>
            <span className="font-medium text-gray-400">Client Name:</span>{" "}
            <span className="font-bold text-gray-100">
              {currentUser.fullname}
            </span>
          </p>
          <p>
            <span className="font-medium text-gray-400">Contact:</span>{" "}
            <span className="font-bold text-gray-100">
              {currentUser.profile?.phone || "N/A"}
            </span>
          </p>
        </div>
      </section>
      <Divider className="my-4 border-gray-700" />

      {/* Payment Details Section */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold text-gray-100 mb-4">
          Payment Information
        </h3>
        <div className="space-y-2">
          <p>
            <span className="font-medium text-gray-400">Rate Description:</span>{" "}
            <span className="font-bold text-gray-100">
              {form.watch("rateName")}
            </span>
          </p>
          <p>
            <span className="font-medium text-gray-400">Rate Amount:</span>{" "}
            <span className="font-bold text-green-400">
              &#8369;{form.watch("rateAmount")}
            </span>
          </p>
        </div>
      </section>
      <Divider className="my-4 border-gray-700" />

      {/* Cancellation Policy Section */}
      <section>
        <h3 className="text-xl font-semibold text-gray-100 mb-4">
          Cancellation Policy
        </h3>
        <p className="text-gray-400 mb-2">
          Please review our cancellation terms and conditions before proceeding.
        </p>
        <Link
          className="text-blue-400 hover:text-blue-500 hover:underline"
          href="/policies/booking-policy"
          rel="noopener noreferrer"
          target="_blank"
        >
          View Policy
        </Link>
      </section>
    </div>
  );
};
