import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const sectionsApi = createApi({
    reducerPath: 'sectionsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api/v1' }),
    endpoints: (builder) => ({
        getSections: builder.query<sections[],void>({
            query: () => 'sections',
        }),
    }),
});

export const { useGetSectionsQuery } = sectionsApi;