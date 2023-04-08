import { useSelector } from "react-redux";
import {DataScores} from "../../components";
import {Sidebar} from "../../components";
import { Main } from "../../styled/style";

function Scores(){
    const visibleSide = useSelector((state:store) => state.sidebar)

    return(
        <>
            <Main visibleSide={visibleSide.status}>
                <Sidebar  />
                <DataScores />
            </Main>
        </>
    );
}

export default Scores;