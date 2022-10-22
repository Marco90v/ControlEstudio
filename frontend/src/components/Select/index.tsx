import { SelectStyle } from "../../styled/style";

type select = {
    identify:string,
    changeSelect:React.ChangeEventHandler<HTMLSelectElement>,
    value:number,
    data:profession[] | semesters[]
}
function Select({identify,changeSelect,value,data}:select){
    return(
        <SelectStyle name={identify} id={identify} onChange={changeSelect} value={value}>
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
}
export default Select;