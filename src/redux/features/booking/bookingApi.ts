import { baseApi } from "../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    booking: builder.mutation({
      query: (data) => ({
        url: "/bookings",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Booking"], 
    }),
    getCurrentUserBookingByUserId: builder.query({
      query: (id) => ({
        url: `/my-bookings/${id}`,
        method: "GET",
      }),
      providesTags: ["Booking"],
    }),
   
  }),
});

export const {useBookingMutation, useGetCurrentUserBookingByUserIdQuery} =bookingApi;