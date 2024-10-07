import { baseApi } from "../../api/baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    paymentInitiate: builder.mutation({
      query: (data) => ({
        url: "/initiate",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"], 
    }),
   
   
  }),
});

export const {usePaymentInitiateMutation} =paymentApi;