import baseApi from "@/redux/api/baseApi";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addService: builder.mutation({
      query: (data) => ({
        url: "/service",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Service"],
    }),
    getAllServices: builder.query({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
      providesTags: ["Service"],
    }),
    getServiceById: builder.query({
      query: (id) => ({
        url: `/services/${id}`,
        method: "GET",
      }),
      providesTags: ["Service"],
    }),
    deleteServiceById: builder.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Service"],
    }),
    updateServiceById: builder.mutation({
      query: ({data, id}) => ({
        url: `/services/${id}`,
        method: "PUT",
        body:data,
      }),
      invalidatesTags: ["Service"],
    }),
  }),
});

export const {
  useAddServiceMutation,
  useGetAllServicesQuery,
  useGetServiceByIdQuery,
  useDeleteServiceByIdMutation,
  useUpdateServiceByIdMutation
} = serviceApi;