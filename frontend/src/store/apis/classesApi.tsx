import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const classesApi = createApi({
    reducerPath: 'classesApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3030/api/v1',
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
        getClasses: builder.query<classe[],void>({
            query: () => 'classes',
            transformResponse: (response:classe[]) => response.sort((a:classe,b:classe)=>b.id-a.id)
        }),
        postClasses : builder.mutation({
            query: (body:{names:string}) => ({
                url:"classes",
                method: "POST",
                body
            }),
            async onQueryStarted({names}, { dispatch, queryFulfilled }) {
                try {
                    const { data:{insertId:id} } = await queryFulfilled
                    const patchResult = dispatch(
                        classesApi.util.updateQueryData('getClasses', undefined, (draft:classe[]) => {
                            draft.unshift({id, names});
                        })
                    )
                } catch(e) {
                    console.log(e);
                }
            },
        }),
        updateClasses : builder.mutation({
            query: (body:classe) => ({
                url:"classes",
                method: "PUT",
                body
            }),
            async onQueryStarted(value, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    const patchResult = dispatch(
                        classesApi.util.updateQueryData('getClasses', undefined, (draft:classe[]) => {
                            return draft.map((item:classe)=> item.id === value.id ? value : item);
                        })
                    )
                } catch(e) {
                    console.log(e);
                }
            },
        }),
        deleteClasses : builder.mutation({
            query: (body:{id:number}) => ({
                url:"classes",
                method: "DELETE",
                body
            }),
            async onQueryStarted(value, { dispatch, queryFulfilled }) {
                try {
                    const { data: {deleteId} } = await queryFulfilled
                    const patchResult = dispatch(
                        classesApi.util.updateQueryData('getClasses', undefined, (draft:classe[]) => {
                            return draft.filter((item:classe)=> item.id !== deleteId);
                        })
                    )
                } catch(e) {
                    console.log(e);
                }
            },
        }),
    }),
});

export const { useGetClassesQuery, usePostClassesMutation, useUpdateClassesMutation, useDeleteClassesMutation } = classesApi;