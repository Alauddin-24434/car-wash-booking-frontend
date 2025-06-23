import baseApi from "@/redux/api/baseApi";

const slotApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSlot: builder.mutation({
      query: (data) => ({
        url: "/slots",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Slot"],
    }),
    getAvailableSlots: builder.query({
      query: ({ serviceId, date }) => ({
        url: "/slots/availability",
        method: "GET",
        params: { serviceId, date },
      }),
      providesTags: ["Slot"],
    }),
    getAllSlots: builder.query({
      query: () => ({
        url: "/slots",
        method: "GET",
      }),
      providesTags: ["Slot"],
    }),
    toggleSlotStatus: builder.mutation({
      query: ({ slotId, newStatus }) => ({
        url: `/slots/${slotId}/status`,
        method: "PATCH",
        body: { status: newStatus },
      }),
      invalidatesTags: ["Slot"],
    }),
  }),
});

export const { useCreateSlotMutation, useGetAvailableSlotsQuery, useGetAllSlotsQuery, useToggleSlotStatusMutation } = slotApi;