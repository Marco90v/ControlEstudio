import arrow from "../../assets/left-arrow-solid-24.png";
import close from "../../assets/log-out-regular-24.png";

import home from "../../assets/home-solid-24.png";
import classes from "../../assets/book-solid-24.png";
import profession from "../../assets/graduation-solid-24.png";
import pensums from "../../assets/data-solid-24.png";
import teachers from "../../assets/male-female-regular-24.png";
import students from "../../assets/child-regular-24.png";
import record from "../../assets/folder-solid-24.png";
import useStoreSideBar from "../../zustanStore/sidebar";
import useProfile from "../../zustanStore/profile";
import useStoreToken from "../../zustanStore/token";
import { NavLink } from "react-router-dom";

const obj = {
    home,
    classes,
    profession,
    pensums,
    teachers,
    students,
    record,
};

const roleProtection:any = {
    home:[1,2,3],
    classes:[1],
    profession:[1],
    pensums:[1],
    teachers:[1],
    students:[1],
    record:[1,2,3],
}

const modules:any = {
    home:'Inicio',
    classes:'Clases',
    profession:'Profesión',
    pensums:'Pensums',
    teachers:'Profesores',
    students:'Estudiantes',
    record:'Notas',
}

type Li = {
    ruta:string,
    img:string,
    role:number,
    w:string,
    visibleSide:boolean
}

const Li = ({visibleSide, w, ruta,img,role}:Li) => {
    const permision = roleProtection[ruta].find((x:number)=>x===role);
    if(!permision) return null;
    return(
        <li className={`transition-all overflow-hidden duration-300 ${w} ${visibleSide ? "text-black" : "text-transparent"}`}>
            <NavLink to={`/dashboard/${ruta}`}
                className={({isActive})=>{
                    const active =  isActive ? "bg-blue-200 border-blue-400 shadow-md has-[span]:text-white" : ""
                    return `group btn-menu ${active} `
                }}
            >
                <img src={img} />
                <span className="transition-all duration-300 group-hover:text-white">
                    {modules[ruta]}
                </span>
            </NavLink>
        </li>
    );
}

function Sidebar(){
    const {visibleSideBar:visibleSide,toggleStatus:toggleSideBar} = useStoreSideBar((state)=>state)
    const role = useProfile((state)=>state.profile.role)
    const deleteToken = useStoreToken((state) => state.deleteToken)

    const side = visibleSide ? "w-[217px]": "w-[72px]"
    const width = visibleSide ? "w-[11.5rem]" : "w-[2.7rem]"
    const textLoggout = visibleSide ? "text-[black]" : "text-[transparent]"
    const toogleButton = visibleSide ? "rotate-0" : "rotate-180"

    const logout = () => {
        deleteToken()
    }

    return(
        <div className={`sidebard ${side}`}>
            <div className="grid grid-rows-[1fr_auto] grid-cols-[1fr]" id="title">
                <h1 className={`text-2xl font-bold pb-2 m-auto transition-all `}>{visibleSide ? "Universidad" : "U"}</h1>
                <button
                    className="m-auto transition-all bg-white p-2 rounded-md cursor-pointer border-solid border-2 border-gray-400 hover:bg-blue-200 hover:shadow-md hover:border-blue-400"
                    onClick={()=>toggleSideBar()}
                >
                    <img className={`transition-all origen-center ${toogleButton}`} src={arrow} />
                </button>
            </div>
            <div id="admin">
                <ul className="list-none mt-4">
                    {
                        Object.entries(obj).map(([k,v],idx)=>{
                            return <Li visibleSide={visibleSide} w={width} key={idx} ruta={k} img={v} role={role} />
                        })
                    }
                </ul>
            </div>
            <button
                className={`btn-loggout ${width} hover:${textLoggout} ${!visibleSide && "text-transparent"}`}
                onClick={logout}
            >
                <img src={close} />
                <span>Cerrar Sesion</span>
            </button>
        </div>
    )
}

export default Sidebar;
export {Sidebar};