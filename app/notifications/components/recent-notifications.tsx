"use client";

import { useState } from "react";

import { useFetchOldNotificationsQuery } from "@/redux/features/notificationApiSlice";

export const RecentNotifications = () => {
  const [page, setPage] = useState(1);
  const { data } = useFetchOldNotificationsQuery(page);

  return (
    <div>
      <h1 />
    </div>
  );
};
