import { skipToken } from "@reduxjs/toolkit/query";
import { useState } from "react";

import { useFetchDetailCurrentArtistQuery } from "@/redux/features/artistApiSlice";
import { useFetchArtistUnavailableDatesQuery } from "@/redux/features/scheduleApiSlice";

import { DatePicker } from "../components/custom-date-picker";

export default function ArtistCalendar() {
  const { data: artist, isSuccess: artistFulfilled } =
    useFetchDetailCurrentArtistQuery();
  const { data: unavailableDates = [], refetch } = useFetchArtistUnavailableDatesQuery(
    artistFulfilled ? artist.id : skipToken,
  );
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <div>
      <DatePicker
        dateSelected={selectedDate}
        setDateSelected={setSelectedDate}
        unavailableDates={unavailableDates}
        onChange={refetch}
      />
    </div>
  );
}
