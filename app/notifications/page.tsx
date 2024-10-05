"use client";

import { title } from "@/components/primitives";
import {
  useFetchNewNotificationsQuery,
  useFetchOldNotificationsQuery,
} from "@/redux/features/notificationApiSlice";
import { NotificationInSchema } from "@/schemas/notification-schemas";
import { Button } from "@nextui-org/button";
import { Spacer } from "@nextui-org/spacer";
import { Spinner } from "@nextui-org/spinner";
import { useEffect, useState } from "react";
import { z } from "zod";
import { NotificationList } from "./components";

export default function NotificationPage() {
  const { data: newNotifications, refetch: refetchNew } =
    useFetchNewNotificationsQuery();

  const [page, setPage] = useState(1);



  const {
    data:oldNotifications,
    isLoading,
    isError,
    isFetching,

  } = useFetchOldNotificationsQuery(page);



  return (
    <div className="w-full md:w-[70%] lg:w-[50%] mx-auto">
      <h1 className={title()}>Notifications</h1>
      <Spacer y={8} />
      <h1 className="capitalize font-semibold text-2xl">Unread</h1>
      {newNotifications && (
        <NotificationList

          isNew
          notifications={newNotifications}
        />
      )}
      <Spacer y={8}/>
    <h1 className="capitalize font-semibold text-2xl">Recent</h1>
{oldNotifications &&
        <NotificationList
          isNew={false}
          notifications={oldNotifications}
        />
}
      {isFetching && <Spinner />}
      {/* sentinel  */}

      {!isFetching && (
        <Button onPress={() => setPage((prev) => prev + 1)}>Load more..</Button>
      )}
    </div>
  );
}
