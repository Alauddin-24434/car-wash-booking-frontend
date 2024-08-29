import { baseApi } from "../../api/baseApi";

const serviceApi= baseApi.injectEndpoints({
    endpoints: (builder)=>({
        addService:builder.mutation({
            query: (data) => ({
                url: "/services",
                method: "POST",
                body: data,
              }),
              invalidatesTags: ["Service"], 
        })
    })
})



export const {useAddServiceMutation}=serviceApi;

