import { useSelector } from "react-redux";
import DataTeacher from "../../components/DataTeacher";
import Sidebar from "../../components/Sidebar";
import { Main } from "../../styled/style";

function Teacher(){
    const visibleSide = useSelector((state:store) => state.sidebar);

    return(
        <>
            <Main visibleSide={visibleSide.status}>
                <Sidebar  />
                <DataTeacher />
            </Main>
        </>
    );
}

export default Teacher;