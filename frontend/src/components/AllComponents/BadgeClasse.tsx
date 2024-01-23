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
}

const BadgeClasse = memo( ({classe, Name_Semesters, removeClasse}:props) => {
    const {id,Name_Classes} = classe;
    return(
        <li key={id}>
            {Name_Classes}
            <img src={iconRemove} alt="remove" onClick={()=>removeClasse(id,Name_Semesters,Name_Classes)}/>
        </li>
    )
}, (n:props,p:props)=>n.classe.id === p.classe.id );

export default BadgeClasse;
export {BadgeClasse};