import { memo } from "react";
import useStoreLoading from "../../zustanStore/loading";
import { useShallow } from "zustand/react/shallow";

type select = {
    identify:string,
    changeSelect:React.ChangeEventHandler<HTMLSelectElement>,
    value:number | string,
    data:any[] | undefined | null,
    disabled?: boolean
}

const Select = memo( ({identify,changeSelect,value, data=[], disabled}:select) => {
    const { loading } = useStoreLoading(useShallow((state=>({
        loading: state.loading,
    }))))
    return(
        <select
            className="h-8 border-solid border border-gray-200 bg-gray-100 rounded cursor-pointer focus-visible:outline focus-visible:outline-1 focus-visible:outline-gray-400 disabled:bg-gray-400 disabled:cursor-not-allowed"
            name={identify} id={identify} onChange={changeSelect} value={value} disabled={loading || disabled}
        >
            <option value="0"></option>
            {
                data &&
                data.map((item:profession | semesters | classe)=>{
                    return(
                        <option key={item.id} value={item.id}>{item.names}</option>
                    )
                })
            }
        </select>
    )
},(n:any,p:any)=>{
    // return n.value===p.value && JSON.stringify(n.data)===JSON.stringify(p.data) && n.disabled === p.disabled;
    return n.value===p.value && JSON.stringify(n.data)===JSON.stringify(p.data);
});

export default Select;
export {Select};