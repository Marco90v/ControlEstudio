import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  :root{
    font-size: 16px;
  }
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
  {/* <React.StrictMode> */}
    <GlobalStyle/>
    {/* <BrowserRouter > */}
      <App />
    {/* </BrowserRouter> */}
  {/* </React.StrictMode> */}</>
)
