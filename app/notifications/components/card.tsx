"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { z } from "zod";

import { NotificationInSchema } from "@/schemas/notification-schemas";
import { useDeleteNotificationMutation } from "@/redux/features/notificationApiSlice";
import { useFetchCurrentUserQuery } from "@/redux/features/authApiSlice";
import { cn } from "@/lib/utils";

export default function NotificationCard({
  notif,
  isNew,
}: {
  notif: z.infer<typeof NotificationInSchema>;
  isNew: boolean;
}) {
  const hoverRef = useRef<HTMLDivElement | null>(null);
  const [deleteMutation] = useDeleteNotificationMutation();
  const { data: currentUser } = useFetchCurrentUserQuery();
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

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
  };

  const handleRedirect = () => {
    if (currentUser) {
      alert(notif.notification_type);
      if (notif.notification_type === "application_accepted") {
        router.push(`/echoverse`);

        return;
      }
      if (currentUser.role === "artist") {
        notif.booking?.id
          ? router.push(`/echoverse/bookings/${notif.booking?.id}`)
          : router.push(`/echoverse/bookings`);
      } else {
        router.push(`/bookings/${notif.booking?.id}`);
      }
    }
  };

  return (
    <div
      key={notif.id}
      ref={hoverRef}
      className="shadow-md  flex items-center justify-between shadow-blue-200/10 my-2 hover:cursor-pointer text-white/75 rounded-md p-4 bg-white/10"
      onClick={handleRedirect}
    >
      <div>
        <p className={cn({ "font-bold text-white": isNew })}>{notif.title}</p>
        <small className="text-white/40">{notif.description}.</small>
      </div>
      {isHovered && (
        <MdDelete
          className="duration-700 rounded-md p-1 animate-appearance-in"
          color="#e33b3b"
          size={30}
          onClick={() => handleDelete(notif.id)}
        />
      )}
    </div>
  );
}
