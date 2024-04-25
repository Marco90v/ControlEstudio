import { BiSolidHome, BiSolidBook, BiSolidGraduation, BiSolidData, BiMaleFemale, BiChild, BiSolidFolder, BiSolidLeftArrow, BiLogOut } from "react-icons/bi";
import Button from "./Button";
import ButtonSideBar from "./ButtonSideBar";
import useStoreSideBar from "../../zustanStore/sidebar";
import useStoreToken from "../../zustanStore/token";
import useStoreSupabase from "../../zustanStore/supabase";
import { useShallow } from "zustand/react/shallow";
import useStoreProfile from "../../zustanStore/profile";

const size = "size-6"

const obj = {
    home: <BiSolidHome className={size} />,
    classes: <BiSolidBook className={size} />,
    profession: <BiSolidGraduation className={size} />,
    pensums: <BiSolidData className={size} />,
    teachers: <BiMaleFemale className={size} />,
    students: <BiChild className={size} />,
    record: <BiSolidFolder className={size} />,
};

function Sidebar(){

    const { supabase } = useStoreSupabase(useShallow(state=>({
        supabase: state.supabase,
    })))

    const { visibleSideBar:visibleSide, toggleStatus:toggleSideBar } = useStoreSideBar(useShallow(state=>({
        visibleSideBar: state.visibleSideBar,
        toggleStatus: state.toggleStatus,
    })))
    const { role, deleteProfile } = useStoreProfile(useShallow(state=>({
        role: state.profile.role,
        deleteProfile: state.deleteProfile
    })))
    const { deleteToken } = useStoreToken(useShallow(state=>({
        deleteToken: state.deleteToken,
    })))

    const side = visibleSide ? "w-[217px]": "w-[72px]"
    const width = visibleSide ? "w-[11.5rem]" : "w-[2.7rem]"
    const toogleButton = visibleSide ? "rotate-0" : "rotate-180"

    const logout = async () => {
        deleteProfile()
        deleteToken()
        await supabase.auth.signOut()
        localStorage.clear()
    }

    return(
        <div className={`sidebard ${side}`}>
            <div className="grid grid-rows-[1fr_auto] grid-cols-[1fr]" id="title">
                <h1 className={`text-2xl font-bold pb-2 m-auto transition-all `}>{visibleSide ? "Universidad" : "U"}</h1>
                <Button type="button" onClick={()=>toggleSideBar()} className="m-auto py-2 bg-white border-2 hover:bg-blue-200 hover:shadow-md hover:border-blue-400" >
                    <BiSolidLeftArrow className={`size-6 transition-all origen-center ${toogleButton}`} />
                </Button>
            </div>
            <div id="admin">
                <ul className="list-none mt-4">
                    {
                        Object.entries(obj).map(([k,v],idx)=>{
                            return <ButtonSideBar
                                        visibleSide={visibleSide}
                                        w={width}
                                        key={idx}
                                        ruta={k as Ruta}
                                        icon={v}
                                        role={role}
                                    />
                        })
                    }
                </ul>
            </div>
            <Button type="button" color="red" className={`${!visibleSide && "m-auto size-[2.7rem] overflow-hidden" } font-semibold text-white`} icon={true} onClick={logout} >
                <BiLogOut className="size-6" />
                {visibleSide && "Cerrar Sesion"}
            </Button>
        </div>
    )
}

export default Sidebar;
export {Sidebar};