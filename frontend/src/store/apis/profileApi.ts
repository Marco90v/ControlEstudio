import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setProfile } from '../module/profileStore';

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3030/api/v2',
        prepareHeaders: (headers, {getState}:any) => {
            const token = getState().session.token;
            if (token) {
              headers.set('authorization', `Bearer ${token}`)  
              return headers
            }
        },
    }),
    endpoints: (builder) => ({
        getProfile: builder.query<any,void>({
            query: () => 'profile',
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                try{
                    const {data:d} = await queryFulfilled
                    dispatch(setProfile(d));
                } catch(e){
                    console.log(e);
                }
            },
        }),
    }),
});

export const { useGetProfileQuery } = profileApi;