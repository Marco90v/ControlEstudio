import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const rolesApi = createApi({
    reducerPath: 'rolesApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api/v1' }),
    endpoints: (builder) => ({
        getRoles: builder.query<role[],void>({
            query: () => 'roles',
        }),
    }),
});

export const { useGetRolesQuery } = rolesApi;