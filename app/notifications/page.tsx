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

  const [oldNotificationsCache, setOldNotificationsCache] = useState<
    z.infer<typeof NotificationInSchema>[] | []
  >([]);

  const {
    data,
    isLoading,
    isError,
    isFetching,
    refetch: refetchOld,
  } = useFetchOldNotificationsQuery(page);

  useEffect(() => {
    if (data && !isFetching) {
      setOldNotificationsCache((prev) => {
        const existingIds = new Set(prev.map((notif) => notif.id));
        const newNotifications = data.filter(
          (notif) => !existingIds.has(notif.id)
        );
        return [...prev, ...newNotifications];
      });
    }
  }, [data, isFetching, refetchOld]);

  const handleOnDelete = () => {
    refetchNew();
    refetchOld();
  };

  return (
    <div className="w-full md:w-[70%] lg:w-[50%] mx-auto">
      <h1 className={title()}>Notifications</h1>
      <Spacer y={8} />

      {newNotifications && newNotifications?.length > 0 && (
        <NotificationList
          onDelete={handleOnDelete}
          title="unread"
          isNew
          notifications={newNotifications}
        />
      )}

      {oldNotificationsCache && oldNotificationsCache?.length > 0 && (
        <NotificationList
          onDelete={handleOnDelete}
          title="recent"
          isNew={false}
          notifications={oldNotificationsCache}
        />
      )}
      {isFetching && <Spinner />}
      {/* sentinel  */}

      {!isFetching && (
        <Button onPress={() => setPage((prev) => prev + 1)}>Load more..</Button>
      )}
    </div>
  );
}
