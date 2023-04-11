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

export const studentsApi = createApi({
    reducerPath: 'studentsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3030/api/v2',
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
    tagTypes: ["Students"],
    endpoints: (builder) => ({
        getStudentsById: builder.query<students,number>({
            query: (IdPersons) => `students/${IdPersons}`,
            providesTags: ["Students"],
        }),
        postStudent : builder.mutation<any,students>({
            query: (body) => ({
                url:"students",
                method: "POST",
                body
            }),
            invalidatesTags: ["Students"],
        }),
        updateStudentById : builder.mutation<any,students>({
            query: (body) => ({
                url:"students",
                method: "PUT",
                body
            }),
            invalidatesTags: ["Students"],
        }),
        deleteStudentById : builder.mutation<any,{id:number}>({
            query: (body) => ({
                url:"students",
                method: "DELETE",
                body
            }),
            invalidatesTags: ["Students"],
        }),
    }),
});

export const {
    useGetStudentsByIdQuery,
    usePostStudentMutation,
    useUpdateStudentByIdMutation,
    useDeleteStudentByIdMutation
} = studentsApi;