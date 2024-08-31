import { baseApi } from "../../api/baseApi";

const slotApi= baseApi.injectEndpoints({
    endpoints: (builder)=>({
        createSlot:builder.mutation({
            query: (data)  => ({
                url: "/slots",
                method: "POST",
                body: data,
                
              }),
              invalidatesTags: ["Slot"], 
        }),
        getAvailableSlots:builder.query({
            query:({serviceId, date})=>({
                url:'/slots/availability',
                method:"GET",
                params: { serviceId, date }, // Correctly include query parameters
            
            }),
            providesTags:["Slot"],
        }),
       
    })
})



export const {useCreateSlotMutation,useGetAvailableSlotsQuery}=slotApi;

