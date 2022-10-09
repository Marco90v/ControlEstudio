import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClasses } from "../../store/module/classesStore";

import Sidebar from "../../components/Sidebar";
import DataClasses from "../../components/DataClasses";
import { Main } from "../../styled/style";

function Classes() {

    const visibleSide = useSelector((state:any) => state.side)

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