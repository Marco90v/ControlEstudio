import Button from "./Button";

function Popup({children, aceptCallback, cancelCallBack}:any){

    const accept = () => {
        aceptCallback();
    }

    const cancel = () => {
        cancelCallBack();
    }

    return(
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
            <div className="bg-white grid grid-cols-[500px] grid-rows-[2.5rem_6rem_4rem] rounded-xl fixed border-solid border border-gray-300 shadow-md shadow-gray-600">
                <h2 className="border-b border-solid border-gray-300 text-center items-center py-3 font-bold text-gray-600 bg-gray-300 rounded-t-xl">Alerta</h2>
                <div className="flex justify-center items-center border-t border-solid border-gray-300">
                    {children}
                </div>
                <div className="grid grid-cols-2 gap-x-6 py-3 px-5 border-t border-solid border-gray-300">
                    <Button type="button" color="red" className="text-white font-semibold" onClick={cancel} >Cancelar</Button>
                    <Button type="button" color="green" className="text-white font-semibold" onClick={accept} >Aceptar</Button>
                </div>
            </div>
        </div>
    );
}

export default Popup;
export {Popup};