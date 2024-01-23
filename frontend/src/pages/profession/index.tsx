import { useSelector } from "react-redux";
import {DataProfession} from "../../components";
import {Sidebar} from "../../components";
import { Main } from "../../styled/style";
import useStoreSideBar from "../../zustanStore/sidebar";

function Profession(){
    // const visibleSide = useSelector((state:store) => state.sidebar)
    const visibleSide = useStoreSideBar((state)=>state.visibleSideBar)


    return(
        <>
            <Main visibleSide={visibleSide}>
                <Sidebar  />
                <DataProfession />
            </Main>
        </>
    );
}

export default Profession;