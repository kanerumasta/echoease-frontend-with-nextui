"use client";

import { useRouter } from "next/navigation";
import { z } from "zod";

import { useReadNotificationMutation } from "@/redux/features/notificationApiSlice";
import { NotificationInSchema } from "@/schemas/notification-schemas";

import NotificationCard from "./card";

export default function Notifications({
  notifications,
  isNew,
}: {
  notifications: z.infer<typeof NotificationInSchema>[];
  isNew: boolean;
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
      {notifications.length > 0 ? (
        notifications.map((notif) => (
          <NotificationCard isNew={isNew} notif={notif} />
        ))
      ) : (
        <div className="p-8 bg-white/5 rounded-md flex justify-center">
          Empty notifications
        </div>
      )}
    </div>
  );
}
