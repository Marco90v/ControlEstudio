import React from "react";
import styled from "styled-components";
import { Button } from "../../styled/style";

const ContenAlert = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgb(0 0 0 / 50%);
`;
const Alert = styled.div`
    background-color: white;
    position: fixed;
    display: grid;
    grid-template-rows: 30px 80px 40px;
    grid-template-columns: 500px;
    border-radius: 5px;
    div:last-child{
        display: grid;
        grid-template-columns: auto auto;
        column-gap: 10px;
        padding: 5px;
    }
    div:nth-child(2){
        display: flex;
        justify-content: center;
        align-items: center;
        input{
            padding: 5px;
        }
    }
    div:first-child{
        background-color: black;
        color: white;
        font-weight: bold;
        text-align: center;
        border-radius: 5px 5px 0 0;
        padding: 5px 0;
    }    
`;

function Popup({setAlert, children, aceptCallback}:any){

    const acept = () => {
        aceptCallback()
        setAlert({type:"", value:false,  data:{id:0,names:""}});
    }

    const cancel = () => {
        setAlert({type:"", value:false,  data:{id:0,names:""}});
    }

    return(
        <ContenAlert>
            <Alert>
                <div>Alerta</div>
                <div>{children}</div>
                <div>
                    <Button className="red" onClick={cancel}>Cancelar</Button>
                    <Button onClick={acept}>Aceptar</Button>
                </div>
            </Alert>
        </ContenAlert>
    );
}

export default Popup;