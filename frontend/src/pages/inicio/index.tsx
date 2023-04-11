import { useState } from "react";
import { useSelector } from "react-redux";
import { Profile, Sidebar } from "../../components";
import { Main } from "../../styled/style";

function Inicio(){
    const visibleSide = useSelector((state:store) => state.sidebar);
    
    return(
        <Main visibleSide={visibleSide.status}>
            <Sidebar  />
            <Profile />
        </Main>
    )
}

export default Inicio