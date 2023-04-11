import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pensumApi = createApi({
    reducerPath: 'pensumApi',
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
        getPensumById: builder.query<pensum[],any>({
            query: (id:number) => `pensum/${id}`,
            // transformResponse: (response:pensum[]) => response
        }),
        postPensum : builder.mutation({
            query: ({body}) => ({
                url:"pensum",
                method: "POST",
                body
            }),
            async onQueryStarted({body,p}, { dispatch, queryFulfilled }) {
                try {
                    const { data:{insertId:id} } = await queryFulfilled
                    const patchResult = dispatch(
                        pensumApi.util.updateQueryData('getPensumById', p, (draft:pensum[]) => {
                            draft.map((pensum:pensum)=>{
                                if(pensum.IdSemesters === body[0].IdSemesters){
                                    pensum.Classes.push({
                                        id,
                                        IdClasses:body[0].IdClasses,
                                        Name_Classes:body[0].Name_Classes
                                    });
                                }
                                return pensum
                            });
                        })
                    )
                } catch(e) {
                    console.log(e);
                }
            },
        }),
        deletePensum : builder.mutation({
            query: ({body}) => ({
                url:"pensum",
                method: "DELETE",
                body
            }),
            async onQueryStarted({p}, { dispatch, queryFulfilled }) {
                try {
                    const { data: {deleteId} } = await queryFulfilled
                    console.log(p);
                    const patchResult = dispatch(
                        pensumApi.util.updateQueryData('getPensumById', p, (draft:pensum[]) => {
                            draft.forEach((semestre:pensum)=>{
                                semestre.Classes = semestre.Classes.filter(classe=>classe.id !== deleteId);
                            });
                        })
                    )
                } catch(e) {
                    console.log(e);
                }
            },
        }),
    }),
});

export const addSemester = (newSemester:pensum, id:number)=>{
    return pensumApi.util.updateQueryData('getPensumById', id, (draftPosts:pensum[]) => {
        draftPosts.push(newSemester);
    })
}

export const {
    useGetPensumByIdQuery, 
    usePostPensumMutation, 
    useDeletePensumMutation
} = pensumApi;