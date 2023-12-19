import React from 'react'
import ReactDOM from 'react-dom/client'
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client/core';
import { ApolloProvider } from '@apollo/client/react';
import { setContext } from '@apollo/client/link/context';

import App from './App'
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components"
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
  const token = JSON.parse(localStorage.getItem('token') || "");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const client = new ApolloClient({
  // uri: 'http://localhost:3030/graphql',
  link: authLink.concat(httpLink),
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
