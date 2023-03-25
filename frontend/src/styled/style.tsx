import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

export const Main = styled.main<any>`
    display: grid;
    height: 100vh;
    grid-template-columns: min-content auto;
    transition: grid-template-columns 0.5s ease-in-out;
`;

export const Side = styled.div<any>`
    background-color: var(--gris);
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
        background-color: var(--azul);
        box-shadow: 0 0 10px 1px #c1c1c1;
        border: 1px solid #c1c1c1;
        span{
            color: white;
        }
    }
    &.active{
        background-color: var(--azul);
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

export const Semestres = styled.div`
    text-align: center;
    border-radius: 5px;
    margin-top: 30px;
    border: solid 1px #b9b9b9;
    > h2{
        padding: 5px;
        background-color: var(--azul);
        color: white;
        border-radius: 5px 5px 0 0;
        > img {
            float: right;
            margin-right: 10px;
            background-color: white;
            border-radius: 50%;
            transition: background-color 0.25s ease-in-out;
            cursor: pointer;
            :hover{
                background-color: black;
            }
        }
    }
`;

export const ClassesBySemesters = styled.ul`
    list-style: none;
    background-color: #e5e5e5;
    border-radius: 0 0 5px 5px;
    display: flex;
    flex-wrap: wrap;
    row-gap: 20px;
    justify-content: center;
    align-items: center;
    padding: 20px 10px;
    > li {
        display: grid;
        grid-template-columns: auto 20px;
        align-items: center;
        grid-column-gap: 10px;
        background-color: #3eb53e;
        font-weight: bold;
        padding: 5px 10px;
        border-radius: 5px;
        margin: 0 5px;
        > img {
            background-color: white;
            border-radius: 50%;
            transition: background-color 0.25s ease-in-out;
            cursor: pointer;
            :hover{
                background-color: black;
            }
        }
    }
`;

export const ContentDataPensum = styled.div`
    padding: 20px;
    margin: 20px;
`;

export const SelectPensum = styled.div`
    display: grid;
    grid-template-columns: 200px 1fr;
    margin-bottom: 20px;
    /* > select{
        border: solid 1px var(--gris);
        background-color: var(--gris);
        border-radius: 5px;
        :focus-visible{
            outline: solid 1px grey;
        }
    } */
`;

export const SelectSemester = styled.div`
    display: grid;
    grid-template-columns: 1fr 200px;
    grid-column-gap: 20px;
    margin-top: 20px;
    > button {
        background-color: #28ad28;
        color: white;
        font-weight: bold;
        border: solid 1px green;
        border-radius: 5px;
        transition: background-color 0.25s ease-in-out;
        cursor: pointer;
        :hover{
            background-color: green;
        }
        :disabled{
            background-color: grey;
            border-color: grey;
            cursor: default;
        }
    }
`;

export const SelectStyle = styled.select`
    height: 30px;
    // border: solid 1px var(--gris);
    border: solid 1px grey;
    background-color: var(--gris);
    border-radius: 5px;
    :focus-visible{
        outline: solid 1px grey;
    }
`;

export const ContentTeacher = styled.div<any>`
    &.content{
        margin: 2rem;
    }
    >table{
        width: 900px;
        margin: auto;
        margin-top: 3rem;
        >tbody > tr > td:nth-child(n+2) {
            text-align: left;
        }
        >tbody > tr > td:nth-child(n+5) {
            text-align: center;
        }
    }
    >.newTeacher{
        display: grid;
        row-gap: 1rem;
        grid-template-rows: 14rem auto auto;
        >.dataUser{
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1.8rem auto;
            column-gap: 1rem;
            row-gap: 1rem;
            >div{
                display: grid;
                grid-template-columns: auto 1fr;
                grid-template-rows: auto;
                min-height: 1.8rem;
                column-gap: 0.5rem;
            }
            >div.data{
                grid-column: 1/4;
                row-gap: 1rem;
                >input{
                    max-height: 1.8rem;
                }
            }
            >div>input[type=text],
            >div>input[type=number] {
                border-radius: 5px;
                border: grey solid 1px;
                padding: 0 0.3rem;
            }
        }
        >.dataTeacher>.dataClasses{
            :hover{
                background-color: #f7f7f7;
            }
            display: grid;
            row-gap: 0.5rem;
            grid-template-columns: auto auto auto;
            grid-template-rows: auto auto;
            column-gap: 1rem;
            margin-bottom: 1rem;
            background-color: #fbfbfb;
            padding: 0.5rem 0.5rem;
            border-radius: 0.5rem;
            border: #e5e5e5 solid 1px;
            >div{
                display: grid;
                grid-template-columns: auto 1fr;
                column-gap: 0.5rem;
            }
            >div.delete{
                grid-template-columns: auto;
                grid-row: 1/3;
                grid-column: 4/5;
                padding: 1.3rem 0;
                >button{
                    border: grey solid 0.1rem;
                    border-radius: 0.3rem;
                    color: white;
                    font-weight: bold;
                    background-color: red;
                    border: red solid 0.1rem;
                    cursor: pointer;
                    ${props => props.wait === true && css`
                        background-color: grey;
                        border: grey solid 0.1rem;
                    `}
                }
            }
        }
        >.dataTeacher>.addClass>button,
        >.save>button{
            padding: 0.25rem 0.5rem;
            border-radius: 0.3rem;
            // border: grey solid 0.1rem;
            color: white;
            font-weight: bold;
            cursor: pointer;
        }
        >.dataTeacher>.addClass>button{
            background-color: blue;
            border: blue solid 0.1rem;
            ${props => props.wait === true && css`
                background-color: grey;
                border: grey solid 0.1rem;
            `}
        }
        >.save{
            display: grid;
            justify-content: end;
            grid-template-columns: auto auto;
            column-gap: 0.5rem;
            >button{
                background-color: green;
                border: green solid 0.1rem;
                ${props => props.wait === true && css`
                    background-color: grey;
                    border: grey solid 0.1rem;
                `}
            }
            >.edit{
                color: black;
                background-color: #ffc107;
                border: #ffc107 solid 0.1rem;
                ${props => props.wait === true && css`
                    background-color: grey;
                    border: grey solid 0.1rem;
                `}
            }
            >.cancel{
                background-color: red;
                border: red solid 0.1rem;
                ${props => props.wait === true && css`
                    background-color: grey;
                    border: grey solid 0.1rem;
                `}
            }
        }
    }
`;
