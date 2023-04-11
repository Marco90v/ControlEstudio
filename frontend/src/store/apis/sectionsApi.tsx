import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const sectionsApi = createApi({
    reducerPath: 'sectionsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3030/api/v1',
        prepareHeaders: (headers, {getState}:any) => {
            // console.log(getState());
            const token = getState().session.token;
            if (token) {
                // console.log(token);
             // include token in req header
              headers.set('authorization', `Bearer ${token}`)  
              return headers
            }
        },
    }),
    endpoints: (builder) => ({
        getSections: builder.query<sections[],void>({
            query: () => 'sections',
        }),
    }),
});

export const { useGetSectionsQuery } = sectionsApi;