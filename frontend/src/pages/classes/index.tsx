import { useSelector } from "react-redux";
import {Sidebar} from "../../components";
import {DataClasses} from "../../components";
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