import { Outlet } from "react-router"
import { Sidebar } from "../../components"
import { Main } from "../../styled/style"
import useStoreSideBar from "../../zustanStore/sidebar"

const Dashboard = () => {
    return(
      <main className={`h-screen grid grid-cols-[min-content_auto]`}>
          <Sidebar  />
          <Outlet />
      </main>
    )
}

export {Dashboard}
export default Dashboard