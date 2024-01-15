// import { useDispatch, useSelector } from "react-redux";
import { change } from "../../store/module/visibleSideStore";
import { MyNavLink, Side, Ul } from "../../styled/style";
import { useAppDispatch } from "../../store/store";
import { removeSession } from "../../store/module/sessionStore";
import { removeProfile } from "../../store/module/profileStore";
import { authApi } from "../../store/apis/authApi";
import { profileApi } from "../../store/apis/profileApi";

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
    role:number
}

const Li = ({ruta,img,role}:Li) => {
    const permision = roleProtection[ruta].find((x:number)=>x===role);
    if(!permision) return null;
    return(
        <li>
            <MyNavLink to={`/dashboard/${ruta}`} style={({ isActive }:any) => ( isActive ? "active" : "" )}>
                <img src={img} />
                <span>{modules[ruta]}</span>
            </MyNavLink>
        </li>
    );
}

function Sidebar(){

    // const dispatch = useAppDispatch();
    // const { role } = useSelector((state:store) => state.profile);
    // const visibleSide = useSelector((state:store) => state.sidebar);

    const {visibleSideBar:visibleSide,toggleStatus:toggleSideBar} = useStoreSideBar((state)=>state)
    const role = useProfile((state)=>state.profile.role)
    const deleteToken = useStoreToken((state) => state.deleteToken)


    const logout = () => {
        // dispatch(removeProfile());
        // dispatch(authApi.util.resetApiState());
        // dispatch(profileApi.util.resetApiState());
        // dispatch(removeSession());
        deleteToken()
    }

    return(
        <Side id="sidebar" visibleSide={visibleSide} >
            <div id="title">
                <h1>{visibleSide ? "Universidad" : "U"}</h1>
                {/* <button onClick={()=>dispatch(change())}><img src={arrow} /> </button> */}
                <button onClick={()=>toggleSideBar()}><img src={arrow} /> </button>
            </div>
            <div id="admin">
                <Ul>
                    {
                        Object.entries(obj).map(([k,v],idx)=>{
                            return <Li key={idx} ruta={k} img={v} role={role} />
                        })
                    }
                </Ul>
            </div>
            <button onClick={logout}>
                <img src={close} />
                <span>Cerrar Sesion</span>
            </button>
        </Side>
    )
}

export default Sidebar;
export {Sidebar};