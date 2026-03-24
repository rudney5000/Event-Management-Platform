import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { City } from "../model";

export const cityApi = createApi({
  reducerPath: "cityApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["City"],
  endpoints: (builder) => ({
    getCities: builder.query<City[], void>({
      query: () => "/api/cities",
      providesTags: ["City"],
    }),
    createCity: builder.mutation<City, Omit<City, "id">>({
      query: (body) => ({
        url: "/api/cities",
        method: "POST",
        body,
      }),
      invalidatesTags: ["City"],
    }),
    updateCity: builder.mutation<City, { id: string; city: Omit<City, "id"> }>({
      query: ({ id, city }) => ({
        url: `/api/cities/${id}`,
        method: "PUT",
        body: city,
      }),
      invalidatesTags: ["City"],
    }),
    deleteCity: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/cities/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["City"],
    }),
  }),
});

export const {
  useGetCitiesQuery,
  useCreateCityMutation,
  useUpdateCityMutation,
  useDeleteCityMutation,
} = cityApi;
