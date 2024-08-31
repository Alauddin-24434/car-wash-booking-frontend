import { baseApi } from "../../api/baseApi";

const serviceApi= baseApi.injectEndpoints({
    endpoints: (builder)=>({
        addService:builder.mutation({
            query: (data)  => ({
                url: "/services",
                method: "POST",
                body: data,
                
              }),
              invalidatesTags: ["Service"], 
        }),
        getAllServices:builder.query({
            query:()=>({
                url:'/services',
                method:"GET",
            
            }),
            providesTags:["Service"],
        }),
        getServiceById:builder.query({
            query:(id)=>({
            
                url:`/services/${id}`,
                method:"GET",
            }),
            providesTags:["Service"]
        })
    })
})



export const {useAddServiceMutation,useGetAllServicesQuery,useGetServiceByIdQuery}=serviceApi;

