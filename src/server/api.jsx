import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8000",
})

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery,
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => "/users",
    }),
    getUserById: builder.query({
      query: ({ id }) => `/users/${id}`,
    }),
    changeUser: builder.mutation({
      query: ({ id, firstName, lastName, email, age }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: {
          firstName,
          lastName,
          email,
          age,
        },
      }),
    }),
  }),
})

export const { useGetAllUsersQuery, useGetUserByIdQuery, useChangeUserMutation } = usersApi
