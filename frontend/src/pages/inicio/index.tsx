import { useState } from "react";
import { useSelector } from "react-redux";
import { Profile, Sidebar } from "../../components";
import { Main } from "../../styled/style";
import useStoreSideBar from "../../zustanStore/sidebar";

function Inicio(){
    // const visibleSide = useSelector((state:store) => state.sidebar);
    const visibleSide = useStoreSideBar((state)=>state.visibleSideBar)
    
    return(
        <Main visibleSide={visibleSide}>
            <Sidebar  />
            <Profile />
        </Main>
    )
}

export default Inicio