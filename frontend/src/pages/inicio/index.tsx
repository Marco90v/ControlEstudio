import { useState } from "react";
import { useSelector } from "react-redux";

import { Main } from "../../styled/style";

import Sidebar from "../../components/Sidebar";

function Inicio(){
    const visibleSide = useSelector((state:store) => state.sidebar);
    
    return(
        <Main visibleSide={visibleSide.status}>
            <Sidebar  />
            <h1>Inicio</h1>
        </Main>
    )
}

export default Inicio