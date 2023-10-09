import { SerializedError } from '@reduxjs/toolkit'
import { createApi, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'

export const scoresApi = createApi({
    reducerPath: 'scoresApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3030/api/v2',
        prepareHeaders: (headers, {getState}:any) => {
            const token = getState().session.token;
            if (token) {
              headers.set('authorization', `Bearer ${token}`)  
            }
            return headers
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
    }),
});

export const {
    useGetClassesByProfessionAndSemestersQuery,
    useGetTeachersByProfessionAndSemestersQuery,
    useGetScoresByIdStudentQuery,
    useUpdateScoreByIdMutation,
    usePostScoreMutation
} = scoresApi;