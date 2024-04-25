import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'

type ClassesByProfessionAndSemester = {
    id:number,
    names:string,
}

type TeachersByProfessionAndSemester = {
    IdClasses: number,
    IdPersons: number,
    IdSections: number,
    IdShifts: number,
    id: number,
    lastNames: string,
    names: string,
}

type Score = {
    id: number,
    IdStudents: number,
    IdTeachers: number,
    IdClasses: number,
    IdShifts: number,
    IdSections: number,
    score: number,
}

type State = {
    classes: ClassesByProfessionAndSemester[],
    teachers:TeachersByProfessionAndSemester[],
    scores: Score[],
}

type Action = {
  setClasses: (classes:ClassesByProfessionAndSemester[]) => void,
  setTeachers: (teachers:TeachersByProfessionAndSemester[]) => void,
  setScores: (scores:Score[]) => void,
  changeScores: (key:string, value:number, IdClasses:number) => void,
  clearScore: () => void,
}

const initialState:State = {
    classes:[],
    teachers:[],
    scores:[],
}

const useStoreScores = create<State & Action>()(
    devtools(
        persist(
            (set)=>({
                classes:[],
                teachers:[],
                scores:[],
                setClasses: (classes:ClassesByProfessionAndSemester[]) => set((state) => {
                    return {
                        ...state,
                        classes
                    }
                }),
                setTeachers: (teachers:TeachersByProfessionAndSemester[]) => set((state) => {
                    return {
                        ...state,
                        teachers
                    }
                }),
                setScores:(scores:Score[]) => set((state) => {
                    return {
                        ...state,
                        scores
                    }
                }),
                changeScores: (key:string, value:number, IdClasses:number) => set((state)=>{
                    return{
                        ...state,
                        scores: state.scores.map(e=>{
                            if(key==='IdTeachers'){
                                if(e.IdClasses===IdClasses && value===0) return {...e, IdShifts:0, IdSections:0, [key]:value}
                                if(e.IdClasses===IdClasses){
                                    const teacher = state.teachers.find((x:teacherByPSC)=>x.id===value);
                                    if(teacher){
                                        const { IdShifts, IdSections } = teacher;
                                        return {...e, IdShifts, IdSections, [key]:value};
                                    }
                                }
                                return e
                            }else{
                                return e.IdClasses===IdClasses ? {...e, [key]:value} : e;
                            }
                        })
                    }
                }),
                clearScore: () => set((state) => {
                    return {
                        ...state,
                        classes:[],
                        teachers:[],
                        scores:[]
                    }
                })
            }),
            {
            name:"useStoreScores",
            // storage: createJSONStorage(() => sessionStorage)
            }
        )
    )
)

export default useStoreScores
export { useStoreScores }