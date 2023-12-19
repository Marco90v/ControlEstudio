import { useEffect, useState } from "react";
import { useLazyQuery, useQuery } from "@apollo/client/react";
// import { gql } from "@apollo/client/core";
// import { useLoginMutation } from "../../store/apis/authApi";
import { ContentLogin } from "../../styled/style";
import useStoreToken from "../../zustanStore/token";
import { gql } from "../../__generated__";

const dataUser = {
    user:'LeonadoCuellar',
    pass:'1234'
}

const LOGIN = gql(`
    query Login($user: String, $pass: String) {
        login(user: $user, pass: $pass) {
            token
            __typename
        }
    }
`);

function Login(){
    const [data, setData] = useState(dataUser);
    const [getLogin, { loading, error, data:token } ]= useLazyQuery(LOGIN, {
        variables: { user: data.user, pass: data.pass },
    });
    const setToken = useStoreToken((state) => state.setToken)

    useEffect(() => {
        if(token?.login?.token){
            // console.log(token.login.token)
            setToken(token.login.token)
        }
      return () => {}
    }, [token])
    

    // const [ login ] = useLoginMutation();
    
    

    const changeData = (element:any) => {
        const id = element.target.id;
        const value = element.target.value;
        setData((e)=>({...e,[id]:value}))
    }


    const submit = (e:any) => {
        e.preventDefault();
        // login(data);
        getLogin()
        // console.log(token)
    }  

    return(
        <ContentLogin>
            <label>Universidad</label>
            <form onSubmit={submit} >
                <label htmlFor="">Usuario</label>
                <input type="text" name="user" id="user" value={data.user} onChange={(e)=>changeData(e)} />
                <label htmlFor="">Contraseña</label>
                <input type="password" name="pass" id="pass" value={data.pass} onChange={(e)=>changeData(e)} />
                <button type="submit">Ingresar</button>
            </form>
        </ContentLogin>
    );
}

export {Login};