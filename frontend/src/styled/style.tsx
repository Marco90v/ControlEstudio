import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

export const ContentLogin = styled.main`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    row-gap: 5rem;
    >label{
        font-size: 2rem;
        font-weight: bold;
    }
    >form{
        display: grid;
        grid-template-columns: auto auto;
        grid-template-rows: auto auto auto;
        column-gap: 0.5rem;
        row-gap: 1rem;
        background-color: var(--gris);
        padding: 4rem;
        border-radius: 0.3rem;
        >label{
            font-weight: bold;
        }
        >input{
            margin-left: 1rem;
            border: 0.1rem solid white;
            background-color: white;
            padding: 0.5rem;
            border-radius: 0.15rem;
            font-weight: 900;
        }
        >button{
            grid-column: 1/3;
            padding: 0.5rem;
            background-color: green;
            border: 0.1rem solid green;
            border-radius: 0.25rem;
            color: white;
            font-weight: bold;
            font-size: 0.9rem;
            margin-top: 1rem;
            cursor: pointer;
            transition: all 0.25s ease-in-out;
            :hover{
                box-shadow: 0 0 10px 1px #c1c1c1;
                background-color: limegreen;
            }
        }
    }
`;

export const ContentProfile = styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    row-gap: 2rem;
    >label{
        font-size: 2rem;
        font-weight: bold;
    }
    >.profile{
        display: grid;
        grid-template-columns: auto auto;
        grid-template-rows: auto auto auto auto auto auto;
        column-gap: 0.5rem;
        row-gap: 1rem;
        >label:nth-child(2n+1){
            font-weight: bold;
            padding: 0.25rem;
        }
        >label:nth-child(2n+2){
            padding: 0.25rem 0.5rem;
            background-color: var(--gris);
            border-radius: 0.25rem;
            border: 0.1rem solid #b9b3b3;
        }
    }
`;

export const Main = styled.main<any>`
    display: grid;
    height: 100vh;
    grid-template-columns: min-content auto;
    transition: grid-template-columns 0.5s ease-in-out;
    >div:nth-child(2){
        overflow: auto;
    }
`;

export const Side = styled.div<any>`
    background-color: var(--gris);
    border-right: 1px soLid #cfcfcf;
    padding: 1rem;
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr 2rem;
    width:${props => props.visibleSide ? "217px" : "72px"};
    transition: width 0.25s ease-in-out;
    >button{
        display: flex;
        align-items: center;
        column-gap: 0.5rem;
        font-weight: bold;
        color: white;
        background-color: #b70303;
        border: 1px solid darkred;
        border-radius: 0.25rem;
        height: 2.5rem;
        padding: 0.5rem;
        font-size: 0.9rem;
        width:${props => props.visibleSide ? "11.5rem" : "2.7rem"};
        cursor:pointer;
        transition: all 0.25s ease-in-out;
        :hover{
            background-color: red;
            border: 1px solid red;
            color:${props => props.visibleSide ? "black" : "transparent"};
            box-shadow: 0 0 10px 1px #c1c1c1;
        }
    }
    >#admin>ul>li{
        transition: all 0.25s ease-in-out;
        width:${props => props.visibleSide ? "11.5rem" : "2.7rem"};
    }
    >#admin > ul > li > a > span{
        text-transform: capitalize;
    }
    ${
        props => !props.visibleSide && css`
            >#admin > ul > li > a > span,
            >button{
                color: transparent
            }
        `
    }
    >div#title{
        display: grid;
        grid-template-rows: 1fr auto;
        grid-template-columns: 1fr;
        >h1,>button{
            margin: auto;
            transition: all 0.25s ease-in-out;
        }
        >h1{
            width:${props => props.visibleSide ? "11.2rem" : "1.4rem"};
        }
        >button{
            background-color: white;
            padding: 0.4rem;
            border-radius: 0.3rem;
            margin-top: 0.4rem;
            cursor: pointer;
            border: 1px solid #b9b3b3;
            :hover{
                background-color: var(--azul);
                box-shadow: 0 0 10px 1px #c1c1c1;
                border: 1px solid #c1c1c1;
            }
            >img{
                transform: ${props => props.visibleSide ? "rotateZ(0deg)" : "rotateZ(180deg)"};
                transition: all 0.25s ease-in-out;
            }
        }
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
    padding: 0.5rem;
    border: 1px solid #b9b3b3;
    background-color: white;
    border-radius: 5px;
    margin-bottom: 0.5rem;
    transition: background-color 0.25s ease-in-out, color 0.25s ease-in-out;
    cursor: pointer;
    >span{
        transition: all 0.25s ease-in-out;
    }

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
        border: 1px solid var(--azul);
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
`;

export const Div = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 50px;
`;

export const Table = styled.table`
    width: 500px;
    border-spacing: 0;
    border: 0.1rem solid #d1d1d1;
    border-radius: 0.3rem;
    thead > tr{
        color: white;
        background-color: black;
    }
    th{
        padding: 5px;
    }
    th:first-child{
        border-radius: 0.3rem 0 0 0;
    }
    th:last-child{
        border-radius: 0 0.3rem 0 0;
    }
    tbody > tr:nth-child(2n+1){
        background-color: #e1e1e1;
    }
    td{
        padding: 5px;
        >button{
            background-color: transparent;
            :disabled > img{
                background-color: grey;
                border-color: grey;
                cursor: default;
            }
        }
    }
    tbody > tr > td:nth-child(n+2){
        text-align: center;
    }
    tbody > tr:last-child{
        >td:first-child{
            border-radius: 0 0 0 0.3rem;
        }
        >td:last-child{
            border-radius: 0 0 0.3rem 0;
        }
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
    display: flex;
    flex-direction: row;
    grid-gap: 1rem;
    position: fixed;
    z-index: 111;
    top: 1rem;
    right: -15rem;
    padding: 0.2rem 0.5rem;
    border-radius: 0.25rem;
    font-weight: bold;
    color: white;
    transition: all 0.25s ease-in-out;
    >img{
        cursor: pointer;
    }
    &.blank{
        opacity: 0;
        top: -2rem;
    }
    &.warning{
        opacity: 1;
        right: 2rem;
        background-color: yellow;
        color: black;
    }
    &.success{
        opacity: 1;
        right: 2rem;
        background-color: green;
        color:white;
    }
    &.error{
        opacity: 1;
        right: 2rem;
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
    >.newPerson{
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

export const ContentStudent = styled(ContentTeacher)<any>`
    >.newPerson{
        grid-template-rows: 19rem auto auto;
        >.dataUser{
            grid-template-rows: 1.8rem auto auto;
            >.professionSemesters{
                grid-column: 1/4;
                display: grid;
                grid-template-rows: 1fr;
                grid-template-columns: auto auto;
                grid-column-gap: 1rem;
                >div{
                    display: grid;
                    grid-template-rows: 1fr;
                    grid-template-columns: auto 1fr;
                    grid-column-gap: 1rem;
                }
            }
        }
    }
`;

export const ContentScores = styled(ContentTeacher)`
    >.scores{
        >div{
            display: grid;
            grid-template-columns: 1fr 1fr 5rem;
            column-gap: 1rem;
            margin-bottom: 1rem;
            >input{
                border: 0.1rem solid #d3d0d0;
                padding: 0 0.2rem;
                border-radius: 0.3rem;
            }
            >input:first-child{
                font-weight: bold;
            }
        }
        >div:first-child{
            background: black;
            color: white;
            border-radius: 0.3rem;
            padding: 0.5rem 0 0.5rem 0.5rem;
            >label{
                font-weight: bold;
            }
        }
        >div.save{
            grid-template-columns: 1fr 5rem;
            justify-items: end;
            >button{
                padding: 0.25rem 0.9rem;
                border-radius: 0.3rem;
                background-color: green;
                border: solid green 0.1rem;
                color: white;
                cursor:pointer;
            }
            >button.cancel{
                background-color: red;
                border: solid red 0.1rem;
            }
        }
    }
`;