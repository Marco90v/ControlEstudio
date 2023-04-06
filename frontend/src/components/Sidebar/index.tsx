import { useDispatch, useSelector } from "react-redux";
import { change } from "../../store/module/visibleSideStore";

import { MyNavLink, Side, Ul } from "../../styled/style";
import home from "../../assets/home-solid-24.png";
import classes from "../../assets/book-solid-24.png";
import profesion from "../../assets/graduation-solid-24.png";
import pensum from "../../assets/data-solid-24.png";
import teachers from "../../assets/male-female-regular-24.png";
import students from "../../assets/child-regular-24.png";
import record from "../../assets/folder-solid-24.png";
import arrow from "../../assets/left-arrow-solid-24.png";


function Sidebar(){

    const dispatch = useDispatch();
    const visibleSide = useSelector((state:store) => state.sidebar)

    return(
        <Side id="sidebar" visibleSide={visibleSide.status} >
            <div id="title">
                <h1>{visibleSide.status ? "Universidad" : "U"}</h1>
                <button onClick={()=>dispatch(change())}><img src={arrow} /> </button>
            </div>
            <div id="admin">
                <Ul>
                    <li>
                        <MyNavLink to="/dashboard/inicio" style={({ isActive }:any) => ( isActive ? "active" : "" )}>
                            <img src={home} />
                            <span>Inicio</span>
                        </MyNavLink>
                    </li>
                    <li>
                        <MyNavLink to="/dashboard/classes" style={({ isActive }:any) => ( isActive ? "active" : "" )}>
                            <img src={classes} />
                            <span>Materias</span>
                        </MyNavLink>
                    </li>
                    <li>
                        <MyNavLink to="/dashboard/profession" style={({ isActive }:any) => ( isActive ? "active" : "" )}>
                            <img src={profesion} />
                            <span>Profesiones</span>
                        </MyNavLink>
                    </li>
                    <li>
                        <MyNavLink to="/dashboard/pensums" style={({ isActive }:any) => ( isActive ? "active" : "" )}>
                            <img src={pensum} />
                            <span>Pensum/Programa</span>
                        </MyNavLink>
                    </li>
                    <li>
                        <MyNavLink to="/dashboard/teachers" style={({ isActive }:any) => ( isActive ? "active" : "" )}>
                            <img src={teachers} />
                            <span>Profesores</span>
                        </MyNavLink>
                    </li>
                    <li>
                        <MyNavLink to="/dashboard/students" style={({ isActive }:any) => ( isActive ? "active" : "" )}>
                            <img src={students} />
                            <span>Alumnos</span>
                        </MyNavLink>
                    </li>
                    <li>
                        <MyNavLink to="/dashboard/scores" style={({ isActive }:any) => ( isActive ? "active" : "" )}>
                            <img src={record} />
                            <span>Record</span>
                        </MyNavLink>
                    </li>
                </Ul>
            </div>
        </Side>
    )
}

// export default Sidebar;
export {Sidebar}