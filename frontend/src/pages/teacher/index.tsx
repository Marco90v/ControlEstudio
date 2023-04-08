import { useSelector } from "react-redux";
import {DataTeacher} from "../../components";
import {Sidebar} from "../../components";
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