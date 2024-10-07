import { baseApi } from "../../api/baseApi";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Create a new review
    createReview: builder.mutation({
      query: (data) => ({
        url: "/reviews",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Review"],
    }),
    
    // Get all reviews for a specific service
    getAllReviews: builder.query({
      query: () => ({
        url: `/reviews`,
        method: "GET",
      }),
      providesTags: ["Review"],
    }),

    // Get all reviews for a specific service
    getReviewsByService: builder.query({
      query: (serviceId) => ({
        url: `/reviews/service/${serviceId}`,
        method: "GET",
      }),
      providesTags: ["Review"],
    }),
    
    // Get a specific review by ID
    getReviewById: builder.query({
      query: (reviewId) => ({
        url: `/reviews/${reviewId}`,
        method: "GET",
      }),
      providesTags: ["Review"],
    }),
    
    // Update a review
    updateReview: builder.mutation({
      query: ({ reviewId, reviewData }) => ({
        url: `/reviews/${reviewId}`,
        method: "PUT",
        body: reviewData,
      }),
      invalidatesTags: ["Review"],
    }),
    
    // Delete a review
    deleteReview: builder.mutation({
      query: (reviewId) => ({
        url: `/reviews/${reviewId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetReviewsByServiceQuery,
  useGetReviewByIdQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
  useGetAllReviewsQuery
} = reviewApi;
