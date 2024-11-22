import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

import { logout, setAuth, setLoading } from "../features/authSlice";

const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_HOST}/api`,
  credentials: "include",
});
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  api.dispatch(setLoading());
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const refreshResult = await baseQuery(
          {
            url: "/jwt/refresh/",
            method: "POST",
          },
          api,
          extraOptions,
        );

        if (refreshResult.data) {
          api.dispatch(setAuth());
          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: "api",
  tagTypes: [
    "CurrentUser",
    "oldNotifications",
    "newNotifications",
    "Bookings",
    "Echoees",
    "ConnectionRequests",
    "PendingBookings",
    "Portfolio",
    "Connections",
    "RecommendedArtists",
    "SentConnectionRequests",
    "CurrentArtist",
    "AwaitingDownpayments",
    "ApprovedBookings",
    "MyUnavailableDates",
    "CompletedBookings",
    "PendingPayments",
    "UpcomingEvents",
    "ScheduledDays",
    "CombinedAvailability",
    "Transactions",
    "followers",
    "BlockedChats",
    "Rates",
    "UnavailableDates",
  ],
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
