import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"], // Invalidate 'Auth' data after signing up
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Auth"], // Invalidate 'Auth' data after signing in
    }),
    // Other auth-related endpoints can be defined similarly
    getUserById: builder.query({
      query: (id) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    validAuthUser:builder.query({
      query:(token)=>({
        url:`/user/validAuth/${token}`,
        method:'GET',
      })
    })
  }),
});

export const { useSignUpMutation, useLoginMutation, useGetUserByIdQuery,useValidAuthUserQuery } =authApi;