import { useSelector } from "react-redux";
import DataProfession from "../../components/DataProfession";
import Sidebar from "../../components/Sidebar";
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