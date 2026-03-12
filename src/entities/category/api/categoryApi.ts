import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { Category } from "../model";

export const categoryApi = createApi({
    reducerPath: "categoryApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
    tagTypes: ["Category"],
    endpoints: (builder) => ({
        getCategories: builder.query<Category[], void>({
            query: () => "/api/category",
            providesTags: ["Category"]
        }),
        createCategory: builder.mutation<Category, Category>({
            query: (category) => ({
                url: "/api/category",
                method: "POST",
                body: category
            }),
            invalidatesTags: ["Category"]
        }),
        updateCategory: builder.mutation<Category, {id: string, category: Partial<Category>}>({
            query: ({id, category}) => ({
                url: `/api/category/${id}`,
                method: "PUT",
                body: category
            }),
            invalidatesTags: ["Category"]
        }),
        deleteCategory: builder.mutation<void, string>({
            query: (id) => ({
                url: `api/category/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Category"]
        })
    })
})

export const {
    useGetCategoriesQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} = categoryApi

