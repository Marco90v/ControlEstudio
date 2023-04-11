import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setProfile } from '../module/profileStore';
// import { setSession } from '../module/sessionStore';
// import { classesApi } from './classesApi';

export const profileApi = createApi({
    reducerPath: 'profileApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3030/api/v2',
        // credentials:"include",
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
        getProfile: builder.query<any,void>({
            query: () => 'profile',
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                try{
                    const {data:d} = await queryFulfilled
                    dispatch(setProfile(d));
                    // dispatch(classesApi.util.resetApiState());
                } catch(e){
                    console.log(e);
                }
            },
        }),
    }),
});

export const { useGetProfileQuery } = profileApi;