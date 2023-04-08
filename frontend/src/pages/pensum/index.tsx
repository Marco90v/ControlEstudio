import { useSelector } from "react-redux";
import {DataPensum} from "../../components";
import {Sidebar} from "../../components";
import { Main } from "../../styled/style";

function Pensum(){
    const visibleSide = useSelector((state:store) => state.sidebar)

    return(
        <>
            <Main visibleSide={visibleSide.status}>
                <Sidebar  />
                <DataPensum />
            </Main>
        </>
    );
}

export default Pensum;