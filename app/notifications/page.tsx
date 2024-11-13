"use client";

import { Badge } from "@nextui-org/badge";
import { Button } from "@nextui-org/button";
import { Spacer } from "@nextui-org/spacer";
import { Spinner } from "@nextui-org/spinner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";
import { MdPayment } from "react-icons/md";
import { FaCalendarPlus } from "react-icons/fa";

import { DeleteIcon } from "@/components/icons/delete";
import { title } from "@/components/primitives";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import {
  useClearAllMutation,
  useDeleteNotificationMutation,
  useFetchNewNotificationsQuery,
  useFetchOldNotificationsQuery,
  useMarkAllReadMutation,
  useReadNotificationMutation,
} from "@/redux/features/notificationApiSlice";
import { NotificationInSchema } from "@/schemas/notification-schemas";

export default function NotificationPage() {
  const [page, setPage] = useState(1);
  const [readNotif] = useReadNotificationMutation()
  const [combinedOldNotifications, setCombinedOldNotifications] = useState<
    z.infer<typeof NotificationInSchema>[]
  >([]);
  const router = useRouter();

  const { data: newNotifications } = useFetchNewNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const { data: oldNotifications, isLoading } = useFetchOldNotificationsQuery(
    page,
    { refetchOnMountOrArgChange: true },
  );
  const { data: currentUser } = useFetchCurrentUserQuery();
  const [deleteNotification] = useDeleteNotificationMutation();
  const [markAllRead] = useMarkAllReadMutation();
  const [clearAll] = useClearAllMutation();

  useEffect(() => {
    if (page === 1) {
      setCombinedOldNotifications([]);
    }
    if (oldNotifications) {
      setCombinedOldNotifications((prev) => [
        ...prev,
        ...oldNotifications.results,
      ]);
    }
  }, [oldNotifications]);

  const handleNotificationClick = async (
    notification: z.infer<typeof NotificationInSchema>,
  ) => {
    if (currentUser && notification.booking) {
      const bookingPath =
        currentUser.role === "artist"
          ? `/echoverse/bookings/${notification.booking.id}`
          : `/bookings/${notification.booking.id}`;

      router.push(bookingPath);
    }
    if(notification.notification_type === 'application_accepted'){
        await readNotif(notification.id.toString());
        router.push('/echoverse')
    }
  };

  const handleDelete = async (id: number) => {
    const response = await deleteNotification(id);

    setPage(1);
  };

  const handleMarkAllRead = () => {
    markAllRead();
  };

  const handleClearAll = () => {
    clearAll();
  };

  return (
    <div className="w-full md:w-[70%]  lg:w-[50%] mx-auto">
      <h1 className={title()}>Notifications</h1>
      <Spacer y={8} />

      {/* Unread Notifications */}
      {newNotifications && newNotifications?.length > 0 && (
        <div className="flex items-center justify-between">
          <Badge color="danger" content={newNotifications?.length}>
            <h1 className="capitalize p-2 font-semibold text-2xl">Unread</h1>
          </Badge>
          <p
            className="text-sm cursor-pointer text-white/50"
            onClick={handleMarkAllRead}
          >
            Mark All as Read
          </p>
        </div>
      )}
      {newNotifications?.map((notif) => (
        <div
          key={notif.id}
          className="p-3 flex items-center gap-3 cursor-pointer hover:bg-white/5 transition-all duration-300 ease-in-out my-2 rounded-md"
          onClick={() => handleNotificationClick(notif)}
        >
             <div>
              {notif.notification_type === "downpayment_paid" ? (
                <MdPayment className="text-green-400" size={30} />
              ) : notif.notification_type.includes("booking") ? (
                <FaCalendarPlus className="text-blue-400" size={30} />
              ) : null}
            </div>
            <div>
          <p className="text-lg font-bold">{notif.title}</p>
          <p className="text-xs text-white/50">{notif.description}</p>
          </div>
        </div>
      ))}

      <Spacer y={8} />

      {/* Old Notifications */}
      {oldNotifications && oldNotifications?.results.length > 0 && (
        <div className="flex items-center justify-between">
          <h1 className="capitalize font-semibold text-2xl">Previous</h1>
          <p
            className="text-white/50 cursor-pointer hover:text-red-400"
            onClick={handleClearAll}
          >
            Clear All
          </p>
        </div>
      )}
      {combinedOldNotifications.map((notif) => (
        <div key={notif.id} className="flex items-center group gap-2 ">
          <div
            className="p-3 flex items-center gap-3 w-full cursor-pointer hover:bg-white/5 transition-all duration-300 ease-in-out my-2 rounded-md"
            onClick={() => handleNotificationClick(notif)}
          >
            <div>
              {notif.notification_type === "downpayment_paid" ? (
                <MdPayment className="text-green-400" size={30} />
              ) : notif.notification_type.includes("booking") ? (
                <FaCalendarPlus className="text-blue-400" size={30} />
              ) : null}
            </div>
            <div>
              <p className="text-lg font-bold text-white/50">{notif.title}</p>
              <p className="text-xs text-white/50">{notif.description}</p>
            </div>
          </div>
          <div className="invisible group-hover:visible ">
            <Button
              isIconOnly
              color="danger"
              variant="light"
              onPress={() => handleDelete(notif.id)}
            >
              <DeleteIcon />
            </Button>
          </div>
        </div>
      ))}

      {oldNotifications && !oldNotifications.has_next && (
        <p className="text-center mt-3 text-white/50">No more notifications.</p>
      )}

      {/* Loading and Load More Button */}
      {isLoading ? (
        <div className="w-full flex justify-center">
          <Spinner label="Loading Notifications..." />
        </div>
      ) : (
        oldNotifications?.has_next && (
          <div className="w-full flex mt-3  justify-center">
            <Button onPress={() => setPage((prev) => prev + 1)}>
              Load More...
            </Button>
          </div>
        )
      )}
    </div>
  );
}
