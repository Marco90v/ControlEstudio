import { useSelector } from "react-redux";
import DataPensum from "../../components/DataPensum";
import Sidebar from "../../components/Sidebar";
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