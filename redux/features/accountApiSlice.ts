import { ArtistInSchema } from "@/schemas/artist-schemas";
import { apiSlice } from "../services/apiSlice";
import { z } from "zod";
import { ProfileSchema } from "@/schemas/user-schemas";

const AccountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchMyProfile: builder.query<z.infer<typeof ProfileSchema>, void>({
      query: () => "/profile",
    }),
    fetchProfileById: builder.query<
      z.infer<typeof ProfileSchema>,
      { userId: number }
    >({
      query: (userId) => `/profile/${userId}`,
    }),
    profileSetup: builder.mutation<void, any>({
      query: (profileData) => ({
        url: "/profile/",
        method: "PUT",
        body: profileData,
      }),
    }),
    rolePick: builder.mutation({
      query: (data) => ({
        url: "/role-pick",
        method: "PATCH",
        body: data,
      }),
    }),
  }),
});

export const {
  useFetchMyProfileQuery,
  useFetchProfileByIdQuery,
  useProfileSetupMutation,
  useRolePickMutation,
} = AccountApiSlice;
