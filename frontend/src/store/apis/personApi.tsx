import { SerializedError } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

type data ={
    data:{
        insertId: number
    }
}
type error = {
    error: FetchBaseQueryError | SerializedError
}

export const personApi = createApi({
    reducerPath: 'personApi',
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
        getPersonByRole: builder.query<person[],number>({
            query: (role:number) => `persons/${role}`,
            transformResponse: (response:person[]) => response.reverse()
        }),
        postPerson : builder.mutation<any,{body:person,role:number}>({
            query: ({body}) => ({
                url:"persons",
                method: "POST",
                body
            }),
            async onQueryStarted({body,role}, { dispatch, queryFulfilled }) {
                try {
                    const { data:{insertId:id} } = await queryFulfilled
                    const patchResult = dispatch(
                        personApi.util.updateQueryData('getPersonByRole', role, (draft:person[]) => {
                            draft.unshift({...body, id, idPerson:id});
                        })
                    )
                } catch(e) {
                    console.log(e);
                }
            },
        }),
        updatePersonById : builder.mutation<any,{body:person,role:number}>({
            query: ({body}) => ({
                url:"persons",
                method: "PUT",
                body
            }),
            async onQueryStarted({body,role}, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled
                    const patchResult = dispatch(
                        personApi.util.updateQueryData('getPersonByRole', role, (draft:person[]) => {
                            return draft.map((item:person)=> item.id === body.id ? body : item);
                        })
                    )
                } catch(e) {
                    console.log(e);
                }
            },
        }),
        deletePersonById : builder.mutation<any,{body:{id:number},role:number}>({
            query: ({body}) => ({
                url:"persons",
                method: "DELETE",
                body
            }),
            async onQueryStarted({role}, { dispatch, queryFulfilled }) {
                try {
                    const { data: {deleteId} } = await queryFulfilled
                    const patchResult = dispatch(
                        personApi.util.updateQueryData('getPersonByRole', role, (draft:person[]) => {
                            return draft.filter((item:person)=> item.id !== deleteId);
                        })
                    )
                } catch(e) {
                    console.log(e);
                }
            },
        }),
    }),
});

export const {
    useGetPersonByRoleQuery,
    usePostPersonMutation,
    useUpdatePersonByIdMutation,
    useDeletePersonByIdMutation
} = personApi;