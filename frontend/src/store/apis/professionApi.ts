import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const professionApi = createApi({
    reducerPath: 'professionApi',
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
        getProfession: builder.query<profession[],void>({
            query: () => 'profession',
            transformResponse: (response:profession[]) => response.reverse()
        }),
        postProfession : builder.mutation({
            query: (body:{names:string}) => ({
                url:"profession",
                method: "POST",
                body
            }),
            async onQueryStarted({names}, { dispatch, queryFulfilled }) {
                try {
                    const { data:{insertId:id} } = await queryFulfilled
                    const patchResult = dispatch(
                        professionApi.util.updateQueryData('getProfession', undefined, (draft:profession[]) => {
                            draft.unshift({id, names});
                        })
                    )
                } catch(e) {
                    console.log(e);
                }
            },
        }),
        updateProfession : builder.mutation({
            query: (body:profession) => ({
                url:"profession",
                method: "PUT",
                body
            }),
            async onQueryStarted(value, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    const patchResult = dispatch(
                        professionApi.util.updateQueryData('getProfession', undefined, (draft:profession[]) => {
                            return draft.map((item:profession)=> item.id === value.id ? value : item);
                        })
                    )
                } catch(e) {
                    console.log(e);
                }
            },
        }),
        deleteProfession : builder.mutation({
            query: (body:{id:number}) => ({
                url:"profession",
                method: "DELETE",
                body
            }),
            async onQueryStarted(value, { dispatch, queryFulfilled }) {
                try {
                    const { data: {deleteId} } = await queryFulfilled
                    const patchResult = dispatch(
                        professionApi.util.updateQueryData('getProfession', undefined, (draft:profession[]) => {
                            return draft.filter((item:profession)=> item.id !== deleteId);
                        })
                    )
                } catch(e) {
                    console.log(e);
                }
            },
        }),
    }),
});

export const { useGetProfessionQuery, 
    usePostProfessionMutation, 
    useUpdateProfessionMutation, 
    useDeleteProfessionMutation } = professionApi;