import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { logout, setUser } from '../features/auth/authSlice';
import { toast } from 'sonner';

/**
 * Configure the base query with default settings.
 * - `baseUrl`: The base URL for all API requests.
 * - `credentials`: Include cookies in requests.
 * - `prepareHeaders`: A function to set the authorization header if a token exists.
 */
const baseQuery = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/', // Base API URL
  credentials: 'include', // Include cookies in requests
  prepareHeaders: (headers, { getState }) => {
    // Retrieve the token from the Redux state
    const token = (getState() as RootState).auth.token;

    if (token) {
      // If the token exists, set it in the Authorization header
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

/**
 * Custom base query function that handles token refresh logic.
 * It wraps the default `baseQuery` and adds additional error handling.
 *
 * @param args - Fetch arguments (URL, method, body, etc.)
 * @param api - The base query API interface
 * @param extraOptions - Additional options for the query
 * @returns The result of the query, possibly with refreshed tokens
 */
const baseQueryWithRefreshToken: BaseQueryFn<
  FetchArgs, // The type for fetch arguments
  unknown, // The expected result type (can be customized)
  unknown // The error type (can be customized)
> = async (args, api, extraOptions) => {
  // Perform the initial API request
  let result = await baseQuery(args, api, extraOptions);

  // Handle different error statuses
  if (result?.error) {
    const { status, data } = result.error;

    // Handle 404 Not Found errors
    if (status === 404) {
      toast.error((data as any).message || 'Resource not found');
    }

    // Handle 403 Forbidden errors
    if (status === 403) {
      toast.error((data as any).message || 'Access forbidden');
    }

    // Handle 401 Unauthorized errors
    if (status === 401) {
      console.log('Unauthorized. Attempting to refresh token.');

      try {
        // Attempt to refresh the token by making a request to the refresh endpoint
        const refreshResponse = await fetch('http://localhost:5000/api/auth/refresh-token', {
          method: 'POST',
          credentials: 'include', // Include cookies in the refresh request
        });

        // Parse the JSON response
        const refreshData = await refreshResponse.json();

        if (refreshData?.data?.accessToken) {
          // If a new access token is received, update the Redux state
          const user = (api.getState() as RootState).auth.user;

          api.dispatch(
            setUser({
              user,
              token: refreshData.data.accessToken,
            })
          );

          // Retry the original query with the new token
          result = await baseQuery(args, api, extraOptions);
        } else {
          // If refreshing fails, log out the user
          api.dispatch(logout());
        }
      } catch (error) {
        // Handle any unexpected errors during the refresh process
        console.error('Error refreshing token:', error);
        api.dispatch(logout());
      }
    }
  }

  return result;
};

/**
 * Create the base API slice using Redux Toolkit Query.
 * - `reducerPath`: The key in the Redux state where the API state will be stored.
 * - `baseQuery`: The custom base query function with refresh token logic.
 * - `tagTypes`: Tags for caching and invalidating data.
 * - `endpoints`: A function to define endpoints (left empty here as a base API).
 */
export const baseApi = createApi({
  reducerPath: 'baseApi', // Unique key for the API slice
  baseQuery: baseQueryWithRefreshToken, // Use the custom base query
  tagTypes: ['Auth', 'Service', 'Slot'], // Define tag types for caching
  endpoints: () => ({}), // No endpoints defined here; extend this in other files
});
