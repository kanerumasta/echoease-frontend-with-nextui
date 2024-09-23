"use client";

import { title } from "@/components/primitives";
import { cn } from "@/lib/utils";
import {
  useDeleteNotificationMutation,
  useFetchNewNotificationsQuery,
  useFetchOldNotificationsQuery,
  useReadNotificationMutation,
} from "@/redux/features/notificationApiSlice";
import { NotificationInSchema } from "@/schemas/notification-schemas";
import { Button } from "@nextui-org/button";
import { Spacer } from "@nextui-org/spacer";
import { Spinner } from "@nextui-org/spinner";
import { useRouter } from "next/navigation";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { useInView } from "react-intersection-observer";
import { toast } from "react-toastify";
import { z } from "zod";

export default function NotificationPage() {
  const { data: newNotifications, refetch: refetchNew } =
    useFetchNewNotificationsQuery();

  const [page, setPage] = useState(1);

  const [oldNotificationsCache, setOldNotificationsCache] = useState<
    z.infer<typeof NotificationInSchema>[] | []
  >([]);

  const { data, isLoading, isError, isFetching } =
    useFetchOldNotificationsQuery(page);

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
  }, [data, isFetching]);

  return (
    <div className="w-full md:w-[70%] lg:w-[50%] mx-auto">
      <h1 className={title()}>Notifications</h1>
      <Spacer y={8} />

      {newNotifications && newNotifications?.length > 0 && (
        <Notifications title="unread" isNew notifications={newNotifications} />
      )}

      {oldNotificationsCache && oldNotificationsCache?.length > 0 && (
        <Notifications
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

const Notifications = ({
  notifications,
  title,
  isNew,
}: {
  notifications: z.infer<typeof NotificationInSchema>[];
  title: string;
  isNew: boolean;
}) => {
  const router = useRouter();

  const [readNotification] = useReadNotificationMutation();

  const handleClick = (notif: z.infer<typeof NotificationInSchema>) => {
    let url = "/";
    if (notif.booking) {
      url = `/bookings/${notif.booking.id}`;
    }
    readNotification(notif.id.toString());
    //FIX TO ROUTE
    // if(notif.message){
    //     url  = `/messages/${notif.message.}`
    // }

    router.push(url);
  };

  return (
    <div className="">
      <h1 className="capitalize font-semibold text-2xl">{title}</h1>
      {notifications.map((notif) => (
        <NotificationCard notif={notif} isNew={isNew} />
      ))}
    </div>
  );
};
const NotificationCard = ({
  notif,
  isNew,
}: {
  notif: z.infer<typeof NotificationInSchema>;
  isNew: boolean;
}) => {
  const hoverRef = useRef<HTMLDivElement | null>(null);
  const [deleteMutation] = useDeleteNotificationMutation();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (hoverRef.current) {
      const handleMouseOver = () => setIsHovered(true);
      const handleMouseOut = () => setIsHovered(false);

      hoverRef.current.addEventListener("mouseover", handleMouseOver);
      hoverRef.current.addEventListener("mouseout", handleMouseOut);

      return () => {
        if (hoverRef.current) {
          hoverRef.current.removeEventListener("mouseover", handleMouseOver);

          hoverRef.current.removeEventListener("mouseout", handleMouseOut);
        }
      };
    }
  }, [hoverRef]);

  const handleDelete = async (id: number) => {
    const proceed = confirm("Delete this notification?");
    if (proceed) {
      const response = await deleteMutation(id);
      if (response.data) {
        toast.success("Deleted successfully.");
      }
    }
    window.location.reload();
  };

  return (
    <div
      ref={hoverRef}
      key={notif.id}
      className="shadow-md flex items-center justify-between shadow-blue-200/10 my-2 hover:cursor-pointer text-white/75 rounded-md p-4 bg-white/10"
    >
      <div>
        <p className={cn({ "font-bold text-white/45": isNew })}>
          {notif.title}
        </p>
        <small className="text-white/40">{notif.description}.</small>
      </div>
      {isHovered && (
        <MdDelete
          onClick={() => handleDelete(notif.id)}
          size={30}
          color="#e33b3b"
          className="duration-700 rounded-md p-1 animate-appearance-in"
        />
      )}
    </div>
  );
};
