"use client";

import { useReadNotificationMutation } from "@/redux/features/notificationApiSlice";
import { NotificationInSchema } from "@/schemas/notification-schemas";
import { useRouter } from "next/navigation";
import { z } from "zod";
import NotificationCard from "./card";

export default function Notifications({
  notifications,
  title,
  isNew,
  onDelete,
}: {
  notifications: z.infer<typeof NotificationInSchema>[];
  title: string;
  isNew: boolean;
  onDelete: () => void;
}) {
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
        <NotificationCard onDelete={onDelete} notif={notif} isNew={isNew} />
      ))}
    </div>
  );
}
