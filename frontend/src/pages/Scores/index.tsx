import { useSelector } from "react-redux";
import {DataScores} from "../../components";
import {Sidebar} from "../../components";
import { Main } from "../../styled/style";
import useStoreSideBar from "../../zustanStore/sidebar";

function Scores(){
    // const visibleSide = useSelector((state:store) => state.sidebar)
    const visibleSide = useStoreSideBar((state)=>state.visibleSideBar)

    return(
        <>
            <Main visibleSide={visibleSide}>
                <Sidebar  />
                <DataScores />
            </Main>
        </>
    );
}

export default Scores;