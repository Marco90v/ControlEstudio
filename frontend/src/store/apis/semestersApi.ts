import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const semestersApi = createApi({
    reducerPath: 'semestersApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3030/api/v1',
        prepareHeaders: (headers, {getState}:any) => {
            const token = getState().session.token;
            if (token) {
              headers.set('authorization', `Bearer ${token}`)  
            }
            return headers
        },
    }),
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