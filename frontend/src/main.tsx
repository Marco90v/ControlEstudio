import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client/core';
import { ApolloProvider } from '@apollo/client/react';
import { setContext } from '@apollo/client/link/context';

import App from './App'
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components"
import { removeTypenameFromVariables } from '@apollo/client/link/remove-typename';
// import useStoreToken from './zustanStore/token';

const GlobalStyle = createGlobalStyle`
  :root{
    font-size: 16px;
    --azul: #67aafd;
    --gris: #e5e5e5
  }
  *{
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
  }
`;

// const token = useStoreToken((state) => state.token)


const httpLink = createHttpLink({
  uri: 'http://localhost:3030/graphql',
  credentials: 'same-origin'
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = JSON.parse(localStorage.getItem('token') || "");
  const token = localStorage.getItem('token');
  // console.log(token)
  // return the headers to the context so httpLink can read them
  return token ? 
  {
    headers: {
      ...headers,
      authorization: `Bearer ${JSON.parse(token)}`,
    }
  }
  : { headers: {...headers} }
});

const removeTypenameLink = removeTypenameFromVariables();
const link = from([removeTypenameLink, httpLink]);
const client = new ApolloClient({
  // uri: 'http://localhost:3030',
  // link: from([removeTypenameLink,authLink.concat(httpLink)]),
  link: authLink.concat(link),
  cache: new InMemoryCache(),
  connectToDevTools: true
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <React.StrictMode>
      <GlobalStyle/>
      <ApolloProvider client={client}>
      {/* <BrowserRouter > */}
        <App />
      {/* </BrowserRouter> */}
      </ApolloProvider>
    </React.StrictMode>
  </>
)
