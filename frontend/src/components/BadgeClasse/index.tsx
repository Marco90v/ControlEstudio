import { memo } from "react";
import iconRemove from "../../assets/x-circle-solid-24.png";

type localClasse = {
    id:number,
    Name_Classes:string
}

type props = {
    classe:localClasse,
    Name_Semesters: string,
    removeClasse: Function
}

const BadgeClasse = ({classe, Name_Semesters, removeClasse}:props) => {
    const {id,Name_Classes} = classe;
    return(
        <li key={id}>
            {Name_Classes}
            <img src={iconRemove} alt="remove" onClick={()=>removeClasse(id,Name_Semesters,Name_Classes)}/>
        </li>
    )
}

export default memo(BadgeClasse,(n:props,p:props)=>n.classe.id === p.classe.id);