import { useSelector } from "react-redux";
import DataStudents from "../../components/DataStudents";
import Sidebar from "../../components/Sidebar";
import { Main } from "../../styled/style";

function Students(){
    const visibleSide = useSelector((state:store) => state.sidebar)

    return(
        <>
            <Main visibleSide={visibleSide.status}>
                <Sidebar  />
                <DataStudents />
            </Main>
        </>
    );
}

export default Students;