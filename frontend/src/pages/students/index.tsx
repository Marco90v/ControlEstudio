import { useSelector } from "react-redux";
import {DataStudents} from "../../components";
import {Sidebar} from "../../components";
import { Main } from "../../styled/style";
import useStoreSideBar from "../../zustanStore/sidebar";

function Students(){
    // const visibleSide = useSelector((state:store) => state.sidebar)
    const visibleSide = useStoreSideBar((state)=>state.visibleSideBar)


    return(
        <>
            <Main visibleSide={visibleSide}>
                <Sidebar  />
                <DataStudents />
            </Main>
        </>
    );
}

export default Students;