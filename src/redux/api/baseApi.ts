 
  import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";







const baseQuery= fetchBaseQuery({
  baseUrl: "http://localhost:5000/api",

  // এখানে credentials: "include" করা হয়েছে ব্যাকেন্ড থেকে পাঠানো refreshToken Cookie এর ভিতরে পাঠানোর জন্য। তাই credentials: "include" অবশ্যই লিখতে হবে যদি cookie তে টোকেন পাঠানো হয়। আর কুকিতে কোন টোকেন না পাঠালে   credentials: "include", না লিখলেও চলবে।
  credentials: "include",
  prepareHeaders:(headers, {getState})=>{
    const token = (getState() as RootState).auth.token
    if(token){
      headers.set('authorization', `${token}`)
    }
    return headers;
  }
 
})







  export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery:baseQuery,
    tagTypes: ['Auth','Service'], // Tag type for products
    endpoints: () => ({}),
  });

