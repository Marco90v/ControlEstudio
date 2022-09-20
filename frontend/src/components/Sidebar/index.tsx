import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

import classes from "../../assets/book-solid-24.png";
import { change } from "../../store/module/visibleSideStore";

const Side = styled.div<any>`
    background-color: #e5e5e5;
    border-right: 1px soLid #cfcfcf;
    padding: 1rem;
    overflow: hidden;
    width:${props => props.visibleSide ? "217px" : "72px"};
    transition: width 0.25s ease-in-out;
    ${
        props => !props.visibleSide && css`
            #admin > ul > li span{
                color: transparent
            }
        `
    }
`;
const Ul = styled.ul`
    list-style: none;
    margin-top: 1rem;
`;
const Li = styled.li<any>`
    border: 1px solid transparent;
    padding: 0.5rem;
    background-color: white;
    border-radius: 5px;
    margin-bottom: 0.5rem;
    transition: background-color 0.25s ease-in-out;
    cursor: pointer;
    :hover{
        background-color: #5faaff;
        box-shadow: 0 0 10px 1px #c1c1c1;
        border: 1px solid #c1c1c1;
        a > span{
            color: white;
        }
    }
`;

const MyNavLink = styled(NavLink)`
    font-weight: bold;
    color: black;
    transition: color 0.25s ease-in-out;
    display: flex;
    column-gap: 0.5rem;
    align-items: center;
    text-decoration: none;
`;

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