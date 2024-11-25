import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

import { BookingSchema } from "@/schemas/booking-schemas";
import { ArtistInSchema } from "@/schemas/artist-schemas";
import { useCreateNewBookingMutation } from "@/redux/features/bookingApiSlice";

export default function useCreateBooking(
  artist: z.infer<typeof ArtistInSchema>,
) {
  const [createNewBooking, bookingState] = useCreateNewBookingMutation();

  const form = useForm<z.infer<typeof BookingSchema>>({
    resolver: zodResolver(BookingSchema),
  });

  const onSubmit = (data: z.infer<typeof BookingSchema>) => {
    const formattedDate = `${data.eventDate.getFullYear()}-${data.eventDate.getMonth() + 1}-${data.eventDate.getDate()}`;
    const payload = {
      artist: artist.id.toString(),
      event_name: data.eventName,
      event_date: formattedDate,
      start_time: data.startTime.toString(),
      end_time: data.endTime.toString(),
      province: "Cebu",
      municipality: data.municipality,
      barangay: data.barangay,
      street: data.street,
      landmark: data.landmark,
      rate: data.rate,
      venue: data.venue,
    };

    createNewBooking(payload).unwrap();
  };

  useEffect(() => {
    if (bookingState.isSuccess) {
      toast.success("Your booking is successfully created");
      console.log(bookingState.data);
      setTimeout(() => {
        if (bookingState.data.id)
          window.location.href = `/bookings/${bookingState.data.id}`;
      }, 2000);
    }
  }, [bookingState.isSuccess, bookingState.isError]);

  return {
    form,
    onSubmit,
    bookingState,
  };
}
