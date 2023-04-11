import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const rolesApi = createApi({
    reducerPath: 'rolesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3030/api/v1',
        prepareHeaders: (headers, {getState}:any) => {
            const token = getState().session.token;
            if (token) {
              headers.set('authorization', `Bearer ${token}`)  
              return headers
            }
        },
    }),
    endpoints: (builder) => ({
        getRoles: builder.query<role[],void>({
            query: () => 'roles',
        }),
    }),
});

export const { useGetRolesQuery } = rolesApi;