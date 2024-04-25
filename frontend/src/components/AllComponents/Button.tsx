import { useShallow } from "zustand/react/shallow"
import useStoreLoading from "../../zustanStore/loading"

interface props{
    type: "button" | "submit",
    children: any
    className?: React.ReactNode,
    color?: "blue" | "red" | "green" | "yellow" | "purple" | "orange",
    icon?: boolean,
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined,
    disabled?:boolean,
}
const COLORS = {
    BLUE: "blue",
    RED: "red",
    GREEN: "green",
    YELLOW: "yellow",
    PURPLE: "purple",
    ORANGE: "orange",
}
const styleBase = "px-2 py-1 border border-solid border-gray-400 rounded-md cursor-pointer transition-all duration-300 enabled:hover:shadow disabled:cursor-not-allowed disabled:bg-gray-200 disabled:border-gray-400"
const styleWithIcon = " flex justify-center items-center gap-2"
const buttonBlue = " bg-blue-700 border-blue-800 hover:bg-blue-600"
const buttonRed = " bg-red-700 border-red-800 hover:bg-red-600"
const buttonGreen = " bg-green-600 border-green-800 hover:bg-green-500"
const buttonYellow = " bg-yellow-400 border-yellow-600 hover:bg-yellow-300"
const buttonPurple = " bg-purple-600 border-purple-800 hover:bg-purple-500"
const buttonOrange = " bg-orange-600 border-orange-800 hover:bg-orange-500"
function Button({children, className, color, icon, disabled=false, ...rest}:props){
    const {loading} = useStoreLoading(useShallow((state=>({
        loading: state.loading,
    }))))
    let style = styleBase
    if(color === COLORS.BLUE) style+= buttonBlue
    if(color === COLORS.RED) style+= buttonRed
    if(color === COLORS.GREEN) style+= buttonGreen
    if(color === COLORS.YELLOW) style+= buttonYellow
    if(color === COLORS.PURPLE) style+= buttonPurple
    if(color === COLORS.ORANGE) style+= buttonOrange
    if(icon) style+= styleWithIcon
    if(className) style+= " " + className
    return(
        <button
            className={style}
            disabled={disabled || loading}
            {...rest}
        >
            {children}
        </button>
    )
}
export default Button
export { Button }