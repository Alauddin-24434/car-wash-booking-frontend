import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Mutex } from 'async-mutex';
import { setUser, logout } from '../features/auth/authSlice';
import { jwtDecode } from 'jwt-decode';
import { JwtPayload, RefreshTokenResponse } from '@/types/auth.interface';

// Mutex to prevent multiple token refresh at once
const mutex = new Mutex();

// http://localhost:5000

// 🔶 Base fetch function
const baseQuery = fetchBaseQuery({
  baseUrl: 'https://car-wash-server-one.vercel.app/api',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as any).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

// 🔷 Base query wrapper with re-authentication
const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();

  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await baseQuery(
          { url: '/refresh-token', method: 'POST' },
          api,
          extraOptions
        );

        const resultData = refreshResult.data as RefreshTokenResponse;

        if (resultData?.data?.accessToken) {
          const newToken = resultData.data.accessToken;
          const decodedUser = jwtDecode<JwtPayload>(newToken);

          api.dispatch(setUser({ token: newToken, user: decodedUser }));

          result = await baseQuery(args, api, extraOptions);
        } else {
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};


// 🔵 Create base API
const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Auth", "Service", "Slot", "Booking", "Payment", "Review"], // Define tag types for caching
  endpoints: () => ({}),
});

export default baseApi;