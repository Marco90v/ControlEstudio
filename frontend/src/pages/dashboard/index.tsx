import { Outlet } from "react-router"
import { Loading, Sidebar } from "../../components"
import { Suspense } from "react"

const Dashboard = () => {
    return(
      <main className={`h-screen grid grid-cols-[min-content_auto]`}>
          <Sidebar  />
          <Suspense fallback={<Loading/>}>
            <Outlet />
          </Suspense>
      </main>
    )
}

export {Dashboard}
export default Dashboard