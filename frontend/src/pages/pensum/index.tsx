import { useSelector } from "react-redux";
import {DataPensum} from "../../components";
import {Sidebar} from "../../components";
import { Main } from "../../styled/style";
import useStoreSideBar from "../../zustanStore/sidebar";

function Pensum(){
    // const visibleSide = useSelector((state:store) => state.sidebar)
    const visibleSide = useStoreSideBar((state)=>state.visibleSideBar)


    return(
        <>
            <Main visibleSide={visibleSide}>
                <Sidebar  />
                <DataPensum />
            </Main>
        </>
    );
}

export default Pensum;