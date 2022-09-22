import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { change } from "../../store/module/visibleSideStore";
// import { NavLink } from "react-router-dom";

import { Li, MyNavLink, Side, Ul } from "../../styled/style";
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
                    <Li>
                        <MyNavLink to="/dashboard">
                            <img src={classes} />
                            <span>Inicio</span>
                        </MyNavLink>
                    </Li>
                    <Li>
                        <MyNavLink to="/dashboard/classes">
                            <img src={classes} />
                            <span>Materias</span>
                        </MyNavLink>
                    </Li>
                    <Li>
                        <MyNavLink to="/dashboard/profession">
                            <img src={classes} />
                            <span>Profesiones</span>
                        </MyNavLink>
                    </Li>
                    <Li>
                        <MyNavLink to="/dashboard/pensums">
                            <img src={classes} />
                            <span>Pensum/Programa</span>
                        </MyNavLink>
                    </Li>
                    <Li>
                        <MyNavLink to="/dashboard/teachers">
                            <img src={classes} />
                            <span>Profesores</span>
                        </MyNavLink>
                    </Li>
                    <Li>
                        <MyNavLink to="/dashboard/students">
                            <img src={classes} />
                            <span>Alumnos</span>
                        </MyNavLink>
                    </Li>
                    <Li>
                        <MyNavLink to="/dashboard/scores">
                            <img src={classes} />
                            <span>Record</span>
                        </MyNavLink>
                    </Li>
                </Ul>
            </div>
        </Side>
    )
}

export default Sidebar;