import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const teacherApi = createApi({
    reducerPath: 'teacherApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3030/api/v2' }),
    tagTypes: ["Teachers"],
    endpoints: (builder) => ({
        getTeacherById: builder.query<teacher[],number>({
            query: (id:number) => `teachers/${id}`,
            // transformResponse: (response:classe[]) => response.sort((a:classe,b:classe)=>b.id-a.id)
            providesTags: ["Teachers"]
        }),
        postTeacher : builder.mutation<any,{body:teacher[],id:number}>({
            query: ({body}) => ({
                url:"teachers",
                method: "POST",
                body
            }),
            invalidatesTags: ["Teachers"],
            // async onQueryStarted({body,id}, { dispatch, queryFulfilled }) {
            //     try {
            //         await queryFulfilled
            //         const patchResult = dispatch(
            //             teacherApi.util.updateQueryData('getTeacherById', id, (draft:teacher[]) => {
            //                 draft.unshift(...body);
            //             })
            //         )
            //     } catch(e) {
            //         console.log(e);
            //     }
            // },
        }),
        updateTeacherById : builder.mutation<any, {body:teacher, role:number}>({
            query: ({body}) => ({
                url:"teachers",
                method: "PUT",
                body
            }),
            invalidatesTags: ["Teachers"],
            // async onQueryStarted({body,role}, { dispatch, queryFulfilled }) {
            //     try {
            //         await queryFulfilled
            //         const patchResult = dispatch(
            //             teacherApi.util.updateQueryData('getTeacherById', role, (draft:teacher[]) => {
            //                 return draft.map((item:teacher)=> item.id === body.id ? body : item);
            //             })
            //         )
            //     } catch(e) {
            //         console.log(e);
            //     }
            // },
        }),
        deleteTeacherById : builder.mutation<any, number[] >({
            query: (ids) => ({
                url:"teachers",
                method: "DELETE",
                body:ids
            }),
            invalidatesTags: ["Teachers"],
            // async onQueryStarted({id}, { dispatch, queryFulfilled }) {
            //     try {
            //         const { data: {deleteId} } = await queryFulfilled
            //         const patchResult = dispatch(
            //             teacherApi.util.updateQueryData('getTeacheryId', id, (draft:classe[]) => {
            //                 return draft.filter((item:classe)=> item.id !== deleteId);
            //             })
            //         )
            //     } catch(e) {
            //         console.log(e);
            //     }
            // },
        }),
        deleteTeacherByIdPerson: builder.mutation<any, {idPersons:number}>({
            query:(idPersons) => ({
                url:"teachersDelete",
                method: "DELETE",
                body:idPersons
            }),
            invalidatesTags: ["Teachers"],
        }),
    }),
});

export const {
    useGetTeacherByIdQuery,
    usePostTeacherMutation,
    useUpdateTeacherByIdMutation,
    useDeleteTeacherByIdMutation,
    useDeleteTeacherByIdPersonMutation
} = teacherApi;