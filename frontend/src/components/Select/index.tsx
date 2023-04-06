import { memo } from "react";
import { SelectStyle } from "../../styled/style";

type select = {
    identify:string,
    changeSelect:React.ChangeEventHandler<HTMLSelectElement>,
    value:number | string,
    data:profession[] | semesters[],
    disabled?:boolean
}
const Select = memo( ({identify,changeSelect,value,data,disabled=false}:select) => {
    return(
        <SelectStyle name={identify} id={identify} onChange={changeSelect} value={value} disabled={disabled}>
            <option value="0"></option>
            {
                data.map((item:profession | semesters)=>{
                    return(
                        <option key={item.id} value={item.id}>{item.names}</option>
                    )
                })
            }
        </SelectStyle>
    )
},(n:any,p:any)=>{
    return n.value===p.value && JSON.stringify(n.data)===JSON.stringify(p.data);
});

export { Select };