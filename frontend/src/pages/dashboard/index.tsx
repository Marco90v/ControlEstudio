import { Outlet } from "react-router"
import { Sidebar } from "../../components"
import { Main } from "../../styled/style"
import useStoreSideBar from "../../zustanStore/sidebar"

const Dashboard = () => {
    const visibleSide = useStoreSideBar((state)=>state.visibleSideBar)

    return(
        <Main visibleSide={visibleSide}>
          <Sidebar  />
          <Outlet />
        </Main>
    )
}

export {Dashboard}
export default Dashboard