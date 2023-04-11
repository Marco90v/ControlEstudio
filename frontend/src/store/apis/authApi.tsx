import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { setSession } from '../module/sessionStore';
import { classesApi } from './classesApi';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3030/api/v1',
        // credentials:"include",
        // prepareHeaders: (headers, query) => {
        //     console.log(query.getState());
        //     // const token = getState().auth.userToken
        //     // if (token) {
        //     //  // include token in req header
        //     //   headers.set('authorization', `Bearer ${token}`)  
        //     //   return headers
        //     // }
        // },
    }),
    endpoints: (builder) => ({
        login: builder.mutation<any,{user:string, pass:string}>({
            query: (body) => ({
                url: 'login',
                method: 'POST',
                body,
            }),
            async onQueryStarted(data, { dispatch, queryFulfilled }) {
                try{
                    const {data:d} = await queryFulfilled
                    dispatch(setSession(d));
                    // dispatch(classesApi.util.resetApiState());
                } catch(e){
                    console.log(e);
                }
            },
        }),
        // validateToken: builder.mutation<any,{token:string}>({
        //     query:(body) => ({
        //         url:'validateToken',
        //         method:'POST',
        //         body
        //     })
        // })
    }),
});

export const { useLoginMutation } = authApi;