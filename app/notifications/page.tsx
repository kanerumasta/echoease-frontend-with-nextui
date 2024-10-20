"use client";

import { Badge } from "@nextui-org/badge";
import { Button } from "@nextui-org/button";
import { Spacer } from "@nextui-org/spacer";
import { Spinner } from "@nextui-org/spinner";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

import { DeleteIcon } from "@/components/icons/delete";
import { title } from "@/components/primitives";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import {
    useClearAllMutation,
    useDeleteNotificationMutation,
    useFetchNewNotificationsQuery,
    useFetchOldNotificationsQuery,
    useMarkAllReadMutation,
} from "@/redux/features/notificationApiSlice";
import { NotificationInSchema } from "@/schemas/notification-schemas";

export default function NotificationPage() {
  const [page, setPage] = useState(1);
  const [combinedOldNotifications, setCombinedOldNotifications] = useState<
    z.infer<typeof NotificationInSchema>[]
  >([]);
  const router = useRouter();



  const { data: newNotifications } = useFetchNewNotificationsQuery(undefined, {refetchOnMountOrArgChange:true});
  const { data: oldNotifications, isLoading } = useFetchOldNotificationsQuery(page,{refetchOnMountOrArgChange:true});
  const { data: currentUser } = useFetchCurrentUserQuery();
  const [deleteNotification] = useDeleteNotificationMutation()
  const [markAllRead] = useMarkAllReadMutation()
  const [clearAll] = useClearAllMutation()

  useEffect(() => {
    if(page === 1){
        setCombinedOldNotifications([])
    }
    if (oldNotifications) {
      setCombinedOldNotifications((prev) => [
        ...prev,
        ...oldNotifications.results,
      ]);
    }
  }, [oldNotifications]);

  const handleNotificationClick = (notification: z.infer<typeof NotificationInSchema>) => {
    if (currentUser && notification.booking) {
      const bookingPath = currentUser.role === "artist"
        ? `/echoverse/bookings/${notification.booking.id}`
        : `/bookings/${notification.booking.id}`;
      router.push(bookingPath);
    }
  };

  const handleDelete = async (id: number) => {
      const response = await deleteNotification(id);
      setPage(1)
  };

  const handleMarkAllRead = () => {
    markAllRead()
  }

  const handleClearAll = () => {
    clearAll()
  }

  return (
    <div className="w-full md:w-[70%] lg:w-[50%] mx-auto">
      <h1 className={title()}>Notifications</h1>
      <Spacer y={8} />

      {/* Unread Notifications */}
      {newNotifications && newNotifications?.length > 0 && (
        <div className="flex items-center justify-between">
          <Badge content={newNotifications?.length} color="danger">
            <h1 className="capitalize p-2 font-semibold text-2xl">Unread</h1>
          </Badge>
          <p onClick={handleMarkAllRead} className="text-sm cursor-pointer text-white/50">Mark All as Read</p>
        </div>
      )}
      {newNotifications?.map((notif) => (
        <div
          key={notif.id}
          onClick={() => handleNotificationClick(notif)}
          className="p-3 bg-white/10 cursor-pointer hover:bg-white/15 my-2 rounded-md"
        >
          <p className="text-lg font-bold">{notif.title}</p>
          <p className="text-xs text-white/50">{notif.description}</p>
        </div>
      ))}

      <Spacer y={8} />

      {/* Old Notifications */}
      {oldNotifications && oldNotifications?.results.length > 0 && (
        <div className="flex items-center justify-between">
          <h1 className="capitalize font-semibold text-2xl">Previous</h1>
          <p onClick={handleClearAll} className="text-white/50 cursor-pointer">Clear All</p>
        </div>
      )}
      {combinedOldNotifications.map((notif) => (

        <div key={notif.id} className="flex items-center group gap-2 ">
        <div
            onClick={() => handleNotificationClick(notif)}
            className="p-3 w-full cursor-pointer hover:bg-white/15 bg-white/10 my-2 rounded-md"
          >
            <p className="text-lg font-bold text-white/50">{notif.title}</p>
            <p className="text-xs text-white/50">{notif.description}</p>
          </div>
          <div className="hidden group-hover:block ">

          <Button onPress={()=>handleDelete(notif.id)}  isIconOnly>
            <DeleteIcon />
         </Button>
          </div>

          </div>
      ))}

      {oldNotifications && !oldNotifications.has_next &&
        <p className="text-center mt-3 text-white/50">No more notifications.</p>
      }


      {/* Loading and Load More Button */}
      {isLoading ? (
        <div className="w-full flex justify-center">
          <Spinner label="Loading Notifications..." />
        </div>
      ) : (
        oldNotifications?.has_next && (
          <div className="w-full flex mt-3  justify-center">
            <Button onPress={() => setPage((prev) => prev + 1)}>Load More...</Button>
          </div>
        )
      )}
    </div>
  );
}
