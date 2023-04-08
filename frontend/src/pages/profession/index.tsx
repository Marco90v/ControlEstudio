import { useSelector } from "react-redux";
import {DataProfession} from "../../components";
import {Sidebar} from "../../components";
import { Main } from "../../styled/style";

function Profession(){
    const visibleSide = useSelector((state:store) => state.sidebar)

    return(
        <>
            <Main visibleSide={visibleSide.status}>
                <Sidebar  />
                <DataProfession />
            </Main>
        </>
    );
}

export default Profession;