import { NavLink } from "react-router-dom";
import { PAGES, ROLES_PROTECTION } from "../../ultil/const";

interface props {
    ruta:Ruta,
    icon:JSX.Element,
    role:number,
    w:string,
    visibleSide:boolean
}

function ButtonSideBar({visibleSide, w, ruta, icon,role}:props){
    const permision = ROLES_PROTECTION[ruta].find((x:number)=>x===role);
    if(!permision) return null;
    return(
        <li className={`transition-all overflow-hidden duration-300 ${w} ${visibleSide ? "text-black" : "text-transparent"}`}>
            <NavLink to={`/dashboard/${ruta}`}
                className={({isActive})=>{
                    const active =  isActive ? "bg-blue-200 border-blue-400 shadow-md has-[span]:text-white" : ""
                    return `group btn-menu ${active} `
                }}
            >
                <div>{icon}</div>
                <span className="transition-all duration-300 group-hover:text-white">
                    {PAGES[ruta]}
                </span>
            </NavLink>
        </li>
    );
}
export default ButtonSideBar
export { ButtonSideBar }