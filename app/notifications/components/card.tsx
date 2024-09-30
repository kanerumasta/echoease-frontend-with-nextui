"use client";

import { cn } from "@/lib/utils";
import { useDeleteNotificationMutation } from "@/redux/features/notificationApiSlice";
import { NotificationInSchema } from "@/schemas/notification-schemas";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { z } from "zod";

export default function NotificationCard({
  notif,
  isNew,
  onDelete,
}: {
  notif: z.infer<typeof NotificationInSchema>;
  isNew: boolean;
  onDelete: () => void;
}) {
  const hoverRef = useRef<HTMLDivElement | null>(null);
  const [deleteMutation] = useDeleteNotificationMutation();
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
        onDelete();
      }
    }
  };

  const handlePress = () => {
    notif?.booking?.id &&
      router.push(`/bookings/${notif.booking?.id.toString()}`);
  };

  return (
    <div
      ref={hoverRef}
      onClick={handlePress}
      key={notif.id}
      className="shadow-md flex items-center justify-between shadow-blue-200/10 my-2 hover:cursor-pointer text-white/75 rounded-md p-4 bg-white/10"
    >
      <div>
        <p className={cn({ "font-bold text-white": isNew })}>{notif.title}</p>
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
}
