import { useSelector } from "react-redux";
import {DataTeacher} from "../../components";
import {Sidebar} from "../../components";
import { Main } from "../../styled/style";
import useStoreSideBar from "../../zustanStore/sidebar";

function Teacher(){
    // const visibleSide = useSelector((state:store) => state.sidebar);
    const visibleSide = useStoreSideBar((state)=>state.visibleSideBar)


    return(
        <>
            <Main visibleSide={visibleSide}>
                <Sidebar  />
                <DataTeacher />
            </Main>
        </>
    );
}

export default Teacher;