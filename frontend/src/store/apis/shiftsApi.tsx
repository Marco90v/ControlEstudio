import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const shiftsApi = createApi({
    reducerPath: 'shiftsApi',
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
        getShifts: builder.query<shifts[],void>({
            query: () => 'shifts',
        }),
    }),
});

export const { useGetShiftsQuery } = shiftsApi;