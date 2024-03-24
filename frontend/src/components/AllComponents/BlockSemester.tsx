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
    disabled:boolean
}

const BlockSemester = memo (({semester, insertNewClasse, removeClasse, disabled}:props) => {
    const {IdSemesters, Name_Semesters, Classes} = semester;
    return(
        <div className="text-center rounded mt-7 border-solid border border-gray-300" >
            <h2 className="p-1 bg-blue-400 text-white border-t-4 font-bold">
                {Name_Semesters}
                <img
                    className="float-right mr-2 bg-white rounded-full cursor-pointer transition-all duration-300 hover:bg-black"
                    src={iconAdd}
                    alt="add"
                    onClick={()=>insertNewClasse(IdSemesters)}
                />
            </h2>
            <ul className="list-none bg-neutral-200 rounded-b flex flex-wrap gap-y-5 justify-center items-center py-5 px-2">
                {
                    Classes?.map((classe:any)=>{
                        return (
                            <BadgeClasse
                                key={classe.id}
                                classe={classe}
                                Name_Semesters={Name_Semesters}
                                removeClasse={removeClasse}
                                disabled={disabled}
                            />
                        )
                    })
                }
            </ul>
        </div>
    )
}, (n:props,p:props)=>{
    return n.semester.IdSemesters === p.semester.IdSemesters && JSON.stringify(n.semester.Classes) === JSON.stringify(p.semester.Classes)
} );

export default BlockSemester;
export {BlockSemester};