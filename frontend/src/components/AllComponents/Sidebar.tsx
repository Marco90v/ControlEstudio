import arrow from "../../assets/left-arrow-solid-24.png";

import { BiSolidHome, BiBook, BiSolidGraduation, BiSolidData, BiMaleFemale, BiChild, BiSolidFolder } from "react-icons/bi";

import useStoreSideBar from "../../zustanStore/sidebar";
import useProfile, { useStoreProfile } from "../../zustanStore/profile";
import useStoreToken from "../../zustanStore/token";
import { GET_PROFILE_AND_ROLES } from "../../ultil/const";
import { useQuery } from "@apollo/client";
import Button from "./Button";
import { BiLogOut } from "react-icons/bi";
import ButtonSideBar from "./ButtonSideBar";

const size = "size-6"

const obj = {
    home: <BiSolidHome className={size} />,
    classes: <BiBook className={size} />,
    profession: <BiSolidGraduation className={size} />,
    pensums: <BiSolidData className={size} />,
    teachers: <BiMaleFemale className={size} />,
    students: <BiChild className={size} />,
    record: <BiSolidFolder className={size} />,
};

function Sidebar(){

    const { client } = useQuery(GET_PROFILE_AND_ROLES);

    const {visibleSideBar:visibleSide,toggleStatus:toggleSideBar} = useStoreSideBar((state)=>state)
    const role = useProfile((state)=>state.profile.role)
    const deleteToken = useStoreToken((state) => state.deleteToken)
    const deleteProfile = useStoreProfile((state) => state.deleteProfile)

    const side = visibleSide ? "w-[217px]": "w-[72px]"
    const width = visibleSide ? "w-[11.5rem]" : "w-[2.7rem]"
    const toogleButton = visibleSide ? "rotate-0" : "rotate-180"

    const logout = () => {
        deleteProfile()
        deleteToken()
        useStoreProfile.persist.clearStorage()
        client.clearStore()
        client.cache.reset()
    }

    return(
        <div className={`sidebard ${side}`}>
            <div className="grid grid-rows-[1fr_auto] grid-cols-[1fr]" id="title">
                <h1 className={`text-2xl font-bold pb-2 m-auto transition-all `}>{visibleSide ? "Universidad" : "U"}</h1>
                <button
                    className="m-auto transition-all bg-white p-2 rounded-md cursor-pointer border-solid border-2 border-gray-400 hover:bg-blue-200 hover:shadow-md hover:border-blue-400"
                    onClick={()=>toggleSideBar()}
                >
                    <img className={`transition-all origen-center ${toogleButton}`} src={arrow} />
                </button>
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