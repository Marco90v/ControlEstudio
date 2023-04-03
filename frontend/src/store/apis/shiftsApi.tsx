import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const shiftsApi = createApi({
    reducerPath: 'shiftsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api/v1' }),
    endpoints: (builder) => ({
        getShifts: builder.query<shifts[],void>({
            query: () => 'shifts',
        }),
    }),
});

export const { useGetShiftsQuery } = shiftsApi;