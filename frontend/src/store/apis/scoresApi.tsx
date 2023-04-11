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

export const scoresApi = createApi({
    reducerPath: 'scoresApi',
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
    tagTypes: ["scoreByIdStudent"],
    endpoints: (builder) => ({
        getClassesByProfessionAndSemesters: builder.query<classe[],{IdProfession:number,IdSemesters:number}>({
            query: (body) => ({
                url:"getClassesByProfessionAndSemesters",
                method: "POST",
                body
            }),
        }),
        getTeachersByProfessionAndSemesters: builder.query<teacherByPSC[],{IdProfession:number,IdSemesters:number}>({
            query: (body) => ({
                url:"getTeachersByProfessionAndSemesters",
                method: "POST",
                body
            }),
        }),
        getScoresByIdStudent: builder.query<scores[],{IdStudents:number}>({
            query: ({IdStudents}) => `scores/${IdStudents}`,
            providesTags: ["scoreByIdStudent"],
        }),
        postScore : builder.mutation<any,scores[]>({
            query: (body) => ({
                url:"scores",
                method: "POST",
                body
            }),
            invalidatesTags: ["scoreByIdStudent"],
        }),
        updateScoreById : builder.mutation<any,scores>({
            query: (body) => ({
                url:"scores",
                method: "PUT",
                body
            }),
            invalidatesTags: ["scoreByIdStudent"],
        }),
        // deleteStudentById : builder.mutation<any,{id:number}>({
        //     query: (body) => ({
        //         url:"students",
        //         method: "DELETE",
        //         body
        //     }),
        //     invalidatesTags: ["Students"],
        // }),
    }),
});

export const {
    useGetClassesByProfessionAndSemestersQuery,
    useGetTeachersByProfessionAndSemestersQuery,
    useGetScoresByIdStudentQuery,
    useUpdateScoreByIdMutation,
    usePostScoreMutation
} = scoresApi;