import type { Class, Grade, PensumEntry, Profession, Professor, ProfessorAssignment, Student } from '@/types';
import { createClient, type Session } from '@supabase/supabase-js'
// import type { Session } from 'react-router';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
const db = import.meta.env.VITE_DB_NAME

// const token = localStorage.getItem("token") || '';
// const supabaseAccessToken = token !== '' ? JSON.parse(token) : '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseKey,{
  // global: { headers: { Authorization: `Bearer ${supabaseAccessToken}` } },
  db: { schema:db }
});

// supabase.auth.onAuthStateChange();

export const getSession = async (setSession:(session:Session)=>void) => {
  const { data } = await supabase.auth.getSession();
  if(data && data.session){
    setSession(data.session);
  }
};

// export const onAuthStateChange = async (setSession:(session:Session)=>void):Promise<Subscription> => {
//   const { data: { subscription } } = await supabase.auth.onAuthStateChange((_event, session) => {
//     if(session){
//       setSession(session);
//     }
//   });
//   return subscription;
// };


export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if(error){
    return null;
  }else{
    return data;
  }
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if(error){
    return null;
  }
  return true;
};

export const getUser = async () => {
  // if(token === null){
  //   return null;
  // }
  const { data, error } = await supabase.auth.getUser();
  if(error){
    return null;
  }else{
    return data;
  }
};

export const getPerson = async (id: string) => {
  // supabase.from(TABLE_NAME.PERSONS).select('*, roles!inner(names)').eq('userUID', user.id)
  const { data, error } = await supabase.from('persons').select('*, roles!inner(names)').eq('userUID', id);
  if(error){
    return null;
  }else{
    return data;
  }
};

/** CLASSES */

export const getAllClasses = async () => {
  // const { data, error } = await supabase.from('classes').select('*, professions!inner(name)').eq('id', id);
  const { data, error } = await supabase.from('classes').select();
  if(error){
    return null;
  }else{
    return data;
  }
};

export const addClassSupabase = async (classData: Class) => {
  const { error } = await supabase.from('classes').insert(classData);
  if(error){
    return null;
  }else{
    return true;
  }
};

export const updateClassSupabase = async (classData: Class) => {
  const {id, ...rest} = classData;
  const { error } = await supabase.from('classes').update(rest).eq('id', id);
  if(error){
    return null;
  }else{
    return true;
  }
};

export const deleteClassSupabase = async (id: string) => {
  const { error } = await supabase.from('classes').delete().eq('id', id);
  if(error){
    return null;
  }else{
    return true;
  }
};

/** PROFESSIONS */

export const getAllProfessions = async () => {
  // const { data, error } = await supabase.from('professions').select('*, classes!inner(name)').eq('id', id);
  const { data, error } = await supabase.from('professions').select();
  if(error){
    return null;
  }else{
    return data;
  }
};

export const getProfessionById = async (id: string) => {
  const { data, error } = await supabase.from('professions').select().eq('id', id);
  if(error){
    return null;
  }else{
    return data;
  }
};

export const addProfessionSupabase = async (professionData: Profession) => {
  const { error } = await supabase.from('professions').insert(professionData);
  if(error){
    return null;
  }else{
    return true;
  }
};

export const updateProfessionSupabase = async (professionData: Profession) => {
  const {id, ...rest} = professionData;
  const { error } = await supabase.from('professions').update(rest).eq('id', id);
  if(error){
    return null;
  }else{
    return true;
  }
};

export const deleteProfessionSupabase = async (id: string) => {
  const { error } = await supabase.from('professions').delete().eq('id', id);
  if(error){
    return null;
  }else{
    return true;
  }
};

/** PENSUM */

export const getAllPensum = async () => {
  // const { data, error } = await supabase.from('pensum').select('*, professions!inner(name)').eq('id', id);
  const { data, error } = await supabase.from('pensum').select();
  if(error){
    return null;
  }else{
    return data;
  }
};

export const addPensumSupabase = async (pensumData: PensumEntry) => {
  const { error } = await supabase.from('pensum').insert(pensumData);
  if(error){
    return null;
  }else{
    return true;
  }
};

export const updatePensumSupabase = async (pensumData: PensumEntry) => {
  const {id, ...rest} = pensumData;
  const { error } = await supabase.from('pensum').update(rest).eq('id', id);
  if(error){
    return null;
  }else{
    return true;
  }
};

export const deletePensumSupabase = async (id: string) => {
  const { error } = await supabase.from('pensum').delete().eq('id', id);
  if(error){
    return null;
  }else{
    return true;
  }
};

/** PROFESSORS */

export const getAllProfessors = async () => {
  // const { data, error } = await supabase.from('professors').select('*, roles!inner(names)').eq('id', id);
  const { data, error } = await supabase.from('professors').select();
  if(error){
    return null;
  }else{
    return data;
  }
};

// export const getProfessorById = async (id: string) => {
//   const { data, error } = await supabase.from('professors').select('*, roles!inner(names)').eq('id', id);
//   if(error){
//     return null;
//   }else{
//     return data;
//   }
// };

export const addProfessorSupabase = async (professorData: Professor) => {
  const { error } = await supabase.from('professors').insert(professorData);
  if(error){
    return null;
  }else{
    return true;
  }
};

export const updateProfessorSupabase = async (professorData: Professor) => {
  const {id, ...rest} = professorData;
  const { error } = await supabase.from('professors').update(rest).eq('id', id);
  if(error){
    return null;
  }else{
    return true;
  }
};

export const deleteProfessorSupabase = async (id: string) => {
  const { error } = await supabase.from('professors').delete().eq('id', id);
  if(error){
    return null;
  }else{
    return true;
  }
};

/** ASSIGNMENTS */

export const getAllAssignments = async () => {
  // const { data, error } = await supabase.from('assignments').select('*, professors!inner(name)').eq('id', id);
  const { data, error } = await supabase.from('assignments').select();
  if(error){
    return null;
  }else{
    return data;
  }
};

export const addAssignmentSupabase = async (assignmentData: ProfessorAssignment) => {
  const { error } = await supabase.from('assignments').insert(assignmentData);
  if(error){
    return null;
  }else{
    return true;
  }
};

export const updateAssignmentSupabase = async (assignmentData: ProfessorAssignment) => {
  const {id, ...rest} = assignmentData;
  const { error } = await supabase.from('assignments').update(rest).eq('id', id);
  if(error){
    return null;
  }else{
    return true;
  }
};

export const deleteAssignmentSupabase = async (id: string) => {
  const { error } = await supabase.from('assignments').delete().eq('id', id);
  if(error){
    return null;
  }else{
    return true;
  }
};

export const deleteProfessorAssignmentSupabase = async (id: string) => {
  const { error } = await supabase.from('assignments').delete().eq('professorId', id);
  if(error){
    return null;
  }else{
    return true;
  }
};

/** STUDENTS **/

export const getAllStudents = async () => {
  // const { data, error } = await supabase.from('students').select('*, roles!inner(names)').eq('id', id);
  const { data, error } = await supabase.from('students').select();
  if(error){
    return null;
  }else{
    return data;
  }
};

export const getStudentById = async (id: string) => {
  const { data, error } = await supabase.from('students').select().eq('id', id);
  if(error){
    return null;
  }else{
    return data;
  }
};

export const addStudentSupabase = async (studentData: Student) => {
  const { error } = await supabase.from('students').insert(studentData);
  if(error){
    return null;
  }else{
    return true;
  }
};

export const updateStudentSupabase = async (studentData: Student) => {
  const {id, ...rest} = studentData;
  const { error } = await supabase.from('students').update(rest).eq('id', id);
  if(error){
    return null;
  }else{
    return true;
  }
};

export const deleteStudentSupabase = async (id: string) => {
  const { error } = await supabase.from('students').delete().eq('id', id);
  if(error){
    return null;
  }else{
    return true;
  }
};

/** GRADES **/

export const getAllGrades = async () => {
  // const { data, error } = await supabase.from('grades').select('*, professions!inner(name)').eq('id', id);
  const { data, error } = await supabase.from('grades').select();
  if(error){
    return null;
  }else{
    return data;
  }
};

export const addGradeSupabase = async (gradeData: Grade) => {
  const { error } = await supabase.from('grades').insert(gradeData);
  if(error){
    return null;
  }else{
    return true;
  }
};

export const updateGradeSupabase = async (gradeData: Grade) => {
  const {id, ...rest} = gradeData;
  const { error } = await supabase.from('grades').update(rest).eq('id', id);
  if(error){
    return null;
  }else{
    return true;
  }
};

export const deleteGradeSupabase = async (id: string) => {
  const { error } = await supabase.from('grades').delete().eq('id', id);
  if(error){
    return null;
  }else{
    return true;
  }
};

export const updateAllGradesSupabase = async (grades: Grade[]) => {
  const { error } = await supabase.from("grades").upsert(grades);
  if(error){
    return null;
  }else{
    return true;
  }
};
