import { useState } from "react";
import { useSelector } from "react-redux";

import styled from "styled-components";
import Sidebar from "../../components/Sidebar";

const Main = styled.main<any>`
    display: grid;
    height: 100vh;
    grid-template-columns: min-content auto;
    transition: grid-template-columns 0.5s ease-in-out;
`;


function Inicio(){
    const visibleSide = useSelector((state:any) => state.side);
    
    return(
        <Main visibleSide={visibleSide.status}>
            <Sidebar  />
            <h1>Inicio</h1>
        </Main>
    )
}

export default Inicio