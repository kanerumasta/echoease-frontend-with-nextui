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

  const form = useForm<z.infer<typeof BookingSchema>>({
    resolver: zodResolver(BookingSchema)
  });

  const onSubmit = (data: z.infer<typeof BookingSchema>) => {
    const validatedData = BookingSchema.safeParse(data)
    if(validatedData.success){
            if (data.artist) {
                const formattedDate  = `${data.eventDate.getFullYear()}-${data.eventDate.getMonth()+1}-${data.eventDate.getDate()}`
            const payload = {
                "artist":data.artist.toString(),
                "event_name":data.eventName,
                "event_date":formattedDate,
                "start_time":data.startTime.toString(),
                "end_time":data.endTime.toString(),
                "province":'Cebu',
                "municipality":data.municipality,
                "barangay":data.barangay,
                "street":data.street,
                "landmark":data.landmark,
                "rate":data.rate,
            }

              createNewBooking(payload)
                .unwrap()

                }
    }else{
        toast.error("Invalid data passed.")
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
