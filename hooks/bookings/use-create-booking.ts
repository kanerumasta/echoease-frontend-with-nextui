import {
    useCreateNewBookingMutation,
    useFetchMyBookingsQuery,
} from "@/redux/features/bookingApiSlice";
import { BookingSchema } from "@/schemas/booking-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

export default function useCreateBooking() {
  const [createNewBooking, bookingState] = useCreateNewBookingMutation();
  const { refetch } = useFetchMyBookingsQuery();

  const form = useForm<z.infer<typeof BookingSchema>>({
    resolver: zodResolver(BookingSchema),
    shouldUnregister: false,
  });

  const router = useRouter();
  const onSubmit = (data: z.infer<typeof BookingSchema>) => {
    console.log(data)
    if (data.artist) {
      const formData = new FormData();
      formData.append("artist", data.artist.toString());
      formData.append("event_name", data.eventName);
      formData.append("event_date", data.eventDate);
      formData.append("event_time", data.eventTime);
      formData.append("province", data.province);
      formData.append("municipality", data.municipality);
      formData.append("barangay", data.barangay);
      formData.append("street", data.street);
      formData.append("landmark", data.landmark);
      formData.append("rate", data.rate);



      createNewBooking(formData)
        .unwrap()
        .then(() => {
          refetch();
        })
        .catch(() =>
          toast.error("Error creating your booking. Please try again later.")
        );
    }
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
