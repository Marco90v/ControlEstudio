import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

export const Main = styled.main<any>`
    display: grid;
    height: 100vh;
    grid-template-columns: min-content auto;
    transition: grid-template-columns 0.5s ease-in-out;
`;

export const Side = styled.div<any>`
    background-color: #e5e5e5;
    border-right: 1px soLid #cfcfcf;
    padding: 1rem;
    overflow: hidden;
    width:${props => props.visibleSide ? "217px" : "72px"};
    transition: width 0.25s ease-in-out;
    ${
        props => !props.visibleSide && css`
            #admin > ul > li span{
                color: transparent
            }
        `
    }
`;

export const Ul = styled.ul`
    list-style: none;
    margin-top: 1rem;
`;

export const MyNavLink = styled(NavLink)<any>`
    font-weight: bold;
    color: black;
    /* transition: color 0.25s ease-in-out; */
    display: flex;
    column-gap: 0.5rem;
    align-items: center;
    text-decoration: none;

    border: 1px solid transparent;
    padding: 0.5rem;
    background-color: white;
    border-radius: 5px;
    margin-bottom: 0.5rem;
    transition: background-color 0.25s ease-in-out, color 0.25s ease-in-out;
    cursor: pointer;

    :hover{
        background-color: #5faaff;
        box-shadow: 0 0 10px 1px #c1c1c1;
        border: 1px solid #c1c1c1;
        span{
            color: white;
        }
    }

    &.${props=>props.activeClassName}{
        background-color: #5faaff;
        span{
            color: white;
        }
    }
`;

export const Form = styled.form`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px;
    column-gap: 10px;
    input{
        padding: 5px;
        border-radius: 5px;
        border: 1px solid grey;
    }
`;

export const Button = styled.button`
    background-color: green;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    border: 1px solid green;
    font-weight: bold;
    cursor: pointer;
    &.red{
        background-color: red;
        border: 1px solid red;
    }
    /* &.green{
        background-color: green;
    } */
`;

export const Div = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 50px;
`;

export const Table = styled.table`
    width: 500px;
    border-spacing: 0;
    thead > tr{
        color: white;
        background-color: black;
    }
    th{
        padding: 5px;
    }
    tbody > tr:nth-child(2n+1){
        background-color: #e1e1e1;
    }
    td{
        padding: 5px;
    }
    tbody > tr > td:nth-child(n+2){
        text-align: center;
    }
    tbody > tr:hover{
        background-color: #d1d1d1;
    }
`;

export const Img = styled.img`
    background-color: green;
    border-radius: 5px;
    cursor: pointer;
    &.red{
        background-color: red;
    }
`;

export const FloatAlert = styled.div`
    position: fixed;
    z-index: 111;
    right: 10px;
    padding: 5px 20px;
    border-radius: 5px;
    font-weight: bold;
    color: white;
    transition: opacity 0.25s ease-in-out, background-color 0.25s ease-in-out, top 0.25s ease-in-out;
    &.blank{
        opacity: 0;
        top: -20px;
    }
    &.warning{
        opacity: 1;
        top: 10px;
        background-color: yellow;
        color:black;
    }
    &.success{
        opacity: 1;
        top: 10px;
        background-color: green;
        color:white;
    }
    &.error{
        opacity: 1;
        top: 10px;
        background-color: red;
        color:white;
    }
`;