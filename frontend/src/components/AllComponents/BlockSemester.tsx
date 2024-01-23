import { ClassesBySemesters, Semestres } from "../../styled/style";
import iconAdd from "../../assets/plus-circle-solid-24.png";
import { memo } from "react";
import { BadgeClasse } from "../";

type localClasse = {
    id:number | null | undefined,
    IdClasses:number | null | undefined,
    Name_Classes:string | null | undefined
}
type localSemester ={
    IdSemesters:number | null | undefined,
    Name_Semesters:string | null | undefined,
    Classes:localClasse[] | null | undefined
}
type props = {
    semester:localSemester
    insertNewClasse:Function,
    removeClasse:Function
}

const BlockSemester = memo (({semester, insertNewClasse, removeClasse}:props) => {
    const {IdSemesters, Name_Semesters, Classes} = semester;
    return(
        <Semestres >
            <h2>
                {Name_Semesters}
                <img src={iconAdd} alt="add" onClick={()=>insertNewClasse(IdSemesters)} />
            </h2>
            <ClassesBySemesters>
                {
                    Classes?.map((classe:any)=>{
                        // const {id,Name_Classes} = classe;
                        return <BadgeClasse key={classe.id} classe={classe} Name_Semesters={Name_Semesters} removeClasse={removeClasse} />
                    })
                }
            </ClassesBySemesters>
        </Semestres>
    )
}, (n:props,p:props)=>{
    return n.semester.IdSemesters === p.semester.IdSemesters && JSON.stringify(n.semester.Classes) === JSON.stringify(p.semester.Classes)
} );

export default BlockSemester;
export {BlockSemester};