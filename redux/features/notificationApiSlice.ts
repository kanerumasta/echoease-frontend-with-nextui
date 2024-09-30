import { z } from "zod";
import { apiSlice } from "../services/apiSlice";
import { NotificationInSchema } from "@/schemas/notification-schemas";
// {
//     "id": 3,
//     "notification_type": "new_booking",
//     "title": "New Booking Inquiry!",
//     "description": "You have a new booking inquiry for an event on 2024-09-30 from boot chuuk",
//     "is_read": false,
//     "created_at": "2024-09-23T02:36:34.810685Z",
//     "user": 5,
//     "booking": 19,
//     "message": null,
//     "follower": null
//   },

const notificationSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchNewNotifications: builder.query<
      z.infer<typeof NotificationInSchema>[],
      void
    >({
      query: () => "/notifications?new=True",
    }),
    countNewNotifications: builder.query<{ notifications_count: number }, void>(
      {
        query: () => "/notifications?new=True&&count=True",
      }
    ),

    fetchOldNotifications: builder.query<
      z.infer<typeof NotificationInSchema>[],
      number
    >({
      query: (page) => `/notifications?old=True&page=${page}`,
    }),
    readNotification: builder.mutation<any, string>({
      query: (id) => ({
        method: "PATCH",

        url: `/notifications/${id}/read`,
      }),
    }),
    deleteNotification: builder.mutation<any, number>({
      query: (id) => ({
        method: "DELETE",
        url: `/notifications/${id}/delete`,
      }),
    }),
  }),
});

export const {
  useFetchNewNotificationsQuery,
  useCountNewNotificationsQuery,
  useFetchOldNotificationsQuery,
  useReadNotificationMutation,
  useDeleteNotificationMutation,
} = notificationSlice;
