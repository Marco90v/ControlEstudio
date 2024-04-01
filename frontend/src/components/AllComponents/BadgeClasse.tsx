import { memo } from "react";
import { BiSolidXCircle } from "react-icons/bi";

import Button from "./Button";

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
            <Button type="button" className="size-6 px-[0] py-[0] float-right mr-2 bg-white border-0 rounded-[100rem]" onClick={()=>removeClasse(id,Name_Semesters,Name_Classes)}>
                <BiSolidXCircle className="size-6 bg-white rounded-full text-red-700 transition-all duration-300 hover:bg-black" />
            </Button>
        </li>
    )
}, (n:props,p:props)=>n.classe.id === p.classe.id );

export default BadgeClasse;
export {BadgeClasse};