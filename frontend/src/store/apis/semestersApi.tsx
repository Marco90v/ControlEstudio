import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const semestersApi = createApi({
    reducerPath: 'semestersApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api/v1' }),
    endpoints: (builder) => ({
        getSemesters: builder.query<semesters[],void>({
            query: () => 'semesters',
            transformResponse: (response:semesters[]) => response
        }),
    }),
});

export const {
    useGetSemestersQuery,
} = semestersApi;