import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom";
import { createGlobalStyle } from "styled-components"

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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <React.StrictMode>
      <GlobalStyle/>
      {/* <BrowserRouter > */}
        <App />
      {/* </BrowserRouter> */}
    </React.StrictMode>
  </>
)
