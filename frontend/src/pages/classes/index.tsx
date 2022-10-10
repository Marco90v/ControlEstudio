import { useSelector } from "react-redux";

import Sidebar from "../../components/Sidebar";
import DataClasses from "../../components/DataClasses";
import { Main } from "../../styled/style";

function Classes() {

    const visibleSide = useSelector((state:store) => state.sidebar); 
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