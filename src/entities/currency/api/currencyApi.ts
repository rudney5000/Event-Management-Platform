import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Currency } from "../model/type";

export const currencyApi = createApi({
  reducerPath: "currencyApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ["Currency"],
  endpoints: (builder) => ({
    getCurrencies: builder.query<Currency[], void>({
      query: () => "/api/currency",
      providesTags: ["Currency"],
    }),
    createCurrency: builder.mutation<Currency, Omit<Currency, "id">>({
      query: (body) => ({
        url: "/api/currency",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Currency"],
    }),
    updateCurrency: builder.mutation<Currency, { id: string; currency: Omit<Currency, "id"> }>({
      query: ({ id, currency }) => ({
        url: `/api/currency/${id}`,
        method: "PUT",
        body: currency,
      }),
      invalidatesTags: ["Currency"],
    }),
    deleteCurrency: builder.mutation<void, string>({
      query: (id) => ({
        url: `/api/currency/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Currency"],
    }),
  }),
});

export const {
  useGetCurrenciesQuery,
  useCreateCurrencyMutation,
  useUpdateCurrencyMutation,
  useDeleteCurrencyMutation,
} = currencyApi;