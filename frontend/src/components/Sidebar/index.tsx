import { useDispatch, useSelector } from "react-redux";
import { change } from "../../store/module/visibleSideStore";

import { MyNavLink, Side, Ul } from "../../styled/style";
import classes from "../../assets/book-solid-24.png";


function Sidebar(){

    const dispatch = useDispatch();
    const visibleSide = useSelector((state:any) => state.side)

    return(
        <Side id="sidebar" visibleSide={visibleSide.status} >
            <div id="title">
                <h1>Universidad</h1>
                <button onClick={()=>dispatch(change())}>{visibleSide.status ? "-" : "+"}</button>
            </div>
            <div id="admin">
                <Ul>
                    <li>
                        <MyNavLink to="/dashboard/inicio" style={({ isActive }:any) => ( isActive ? "active" : "" )}>
                            <img src={classes} />
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
                            <img src={classes} />
                            <span>Profesiones</span>
                        </MyNavLink>
                    </li>
                    <li>
                        <MyNavLink to="/dashboard/pensums" style={({ isActive }:any) => ( isActive ? "active" : "" )}>
                            <img src={classes} />
                            <span>Pensum/Programa</span>
                        </MyNavLink>
                    </li>
                    <li>
                        <MyNavLink to="/dashboard/teachers" style={({ isActive }:any) => ( isActive ? "active" : "" )}>
                            <img src={classes} />
                            <span>Profesores</span>
                        </MyNavLink>
                    </li>
                    <li>
                        <MyNavLink to="/dashboard/students" style={({ isActive }:any) => ( isActive ? "active" : "" )}>
                            <img src={classes} />
                            <span>Alumnos</span>
                        </MyNavLink>
                    </li>
                    <li>
                        <MyNavLink to="/dashboard/scores" style={({ isActive }:any) => ( isActive ? "active" : "" )}>
                            <img src={classes} />
                            <span>Record</span>
                        </MyNavLink>
                    </li>
                </Ul>
            </div>
        </Side>
    )
}

export default Sidebar;