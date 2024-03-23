import { memo } from "react";
import iconRemove from "../../assets/x-circle-solid-24.png";

type localClasse = {
    id:number | null | undefined,
    Name_Classes:string | null | undefined
}

type props = {
    classe:localClasse,
    Name_Semesters: string | null | undefined,
    removeClasse: Function
    disabled:boolean
}

const BadgeClasse = memo( ({classe, Name_Semesters, removeClasse, disabled}:props) => {
    const {id,Name_Classes} = classe;
    return(
        <li
            className="grid grid-cols-[auto_20px] items-center gap-x-2 bg-green-500 font-bold rounded py-1 px-2 my-0 mx-1"
            key={id}
        >
            {Name_Classes}
            <img
                className="bg-white rounded-full cursor-pointer transition-all duration-300 hover:bg-black"
                src={iconRemove} alt="remove" onClick={()=>removeClasse(id,Name_Semesters,Name_Classes)}
            />
        </li>
    )
}, (n:props,p:props)=>n.classe.id === p.classe.id );

export default BadgeClasse;
export {BadgeClasse};