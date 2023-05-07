import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const teacherApi = createApi({
    reducerPath: 'teacherApi',
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
    tagTypes: ["Teachers"],
    endpoints: (builder) => ({
        getTeacherById: builder.query<teacher[],number>({
            query: (id:number) => `teachers/${id}`,
            providesTags: ["Teachers"]
        }),
        postTeacher : builder.mutation<any,{body:teacher[],id:number}>({
            query: ({body}) => ({
                url:"teachers",
                method: "POST",
                body
            }),
            // invalidatesTags: ["Teachers"],
        }),
        updateTeacherById : builder.mutation<any, {body:teacher, role:number}>({
            query: ({body}) => ({
                url:"teachers",
                method: "PUT",
                body
            }),
            // invalidatesTags: ["Teachers"],
        }),
        deleteTeacherById : builder.mutation<any, number[] >({
            query: (ids) => ({
                url:"teachers",
                method: "DELETE",
                body:ids
            }),
            // invalidatesTags: ["Teachers"],
        }),
        deleteTeacherByIdPerson: builder.mutation<any, {IdPersons:number}>({
            query:(IdPersons) => ({
                url:"teachersDelete",
                method: "DELETE",
                body:IdPersons
            }),
            // invalidatesTags: ["Teachers"],
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