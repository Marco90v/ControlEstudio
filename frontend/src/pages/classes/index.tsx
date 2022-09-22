import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Sidebar from "../../components/Sidebar";
import DataClasses from "../../components/DataClasses";
import { fetchClasses } from "../../store/module/classesStore";

const Main = styled.main<any>`
    display: grid;
    height: 100vh;
    grid-template-columns: min-content auto;
    transition: grid-template-columns 0.5s ease-in-out;
`;


function Classes() {
    // const dispatch = useDispatch();
    // const classes = useSelector((state:any) => state.classes);

    const visibleSide = useSelector((state:any) => state.side)

    // useEffect(() => {
    //     if(classes.status === "") dispatch(fetchClasses())
    //   return () => {}
    // }, [])
    

    return(
        <>
            <Main visibleSide={visibleSide.status}>
                <Sidebar  />
                <DataClasses />
            </Main>
        </>
    );
}

export default Classes;