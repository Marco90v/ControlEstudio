import { Button, Input } from "../../components";
import { BiEditAlt } from "react-icons/bi";


function ViewComponents(){
    return(
        <div className="p-4 overflow-auto">
            <div className="border border-solid border-gray-400 rounded p-4 mb-4">
                <p className="font-semibold underline">Inputs</p>
                <div className="mb-2">
                    <label htmlFor="">Input text enabled</label>
                    <Input id="te" type="text" name="" onChange={()=>null} />
                </div>
                <div className="mb-2">
                    <label htmlFor="">Input text disabled</label>
                    <Input id="td" type="text" name="" onChange={()=>null} disabled={true} />
                </div>
                <div className="mb-2">
                    <label htmlFor="">Input password</label>
                    <Input id="pe" type="password" name="" onChange={()=>null} />
                </div>
                <div className="mb-2">
                    <label htmlFor="">Input file</label>
                    <Input id="fe" type="file" name="" onChange={()=>null} />
                </div>
            </div>
            <div className="border border-solid border-gray-400 rounded p-4 mb-4">
                <p className="font-semibold underline">Buttons</p>
                <div className="mb-2">
                    <label htmlFor="">button simple</label>
                    <Button type="button">Button Simple</Button>
                </div>
                <div className="mb-2">
                    <label htmlFor="">button simple enabled</label>
                    <Button type="button" disabled={true}>Button Simple</Button>
                </div>
                <div className="mb-2">
                    <label htmlFor="">button simple with icon</label>
                    <Button type="button" icon={true} >
                        Button Simple
                        <BiEditAlt className="text-center" />
                    </Button>
                </div>
                <div className="mb-2">
                    <label htmlFor="">button blue</label>
                    <Button type="button" color="blue">Button Blue</Button>
                </div>
                <div className="mb-2">
                    <label htmlFor="">button red</label>
                    <Button type="button" color="red">Button red</Button>
                </div>
                <div className="mb-2">
                    <label htmlFor="">button green</label>
                    <Button type="button" color="green">Button green</Button>
                </div>
                <div className="mb-2">
                    <label htmlFor="">button orange</label>
                    <Button type="button" color="orange">Button orange</Button>
                </div>
                <div className="mb-2">
                    <label htmlFor="">button purple</label>
                    <Button type="button" color="purple">Button purple</Button>
                </div>
                <div className="mb-2">
                    <label htmlFor="">button yellow</label>
                    <Button type="button" color="yellow">Button yellow</Button>
                </div>
                <div className="mb-2">
                    <label htmlFor="">button only icon</label>
                    <Button type="button" color="green">
                        <BiEditAlt />
                    </Button>
                </div>
            </div>
        </div>
        
    )
}
export default ViewComponents
export {ViewComponents}