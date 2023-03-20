import styled from "styled-components";

interface TabStyled {
  color?: string;
  state?:number;
  height?:string;
}

export const Tab=styled.div<TabStyled>`
display: flex;
 > button {
  height: ${props=>props.height||'39px'};
  flex-basis: 100%;
  flex-grow: 1;
  font-size: 15px;
  font-weight: 700;
  color:${props=>props.color==='green'?`var(--darkGreen__color)`:'var(--chamong__color)'};
  background-color:white;
  border:1px solid ${props=>props.color==='green'?`var(--darkGreen__color)`:'var(--chamong__color)'};
  border-left:none;
  padding:0px 10px;
  cursor: pointer;
  &:hover {
    color:white;
    background-color: ${props=>props.color==='green'?`var(--green__color)`:'var(--chamong__color)'};
  }
  &:first-child {
    border-left:1px solid ${props=>props.color==='green'?`var(--darkGreen__color)`:'var(--chamong__color)'};
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
  }
  &:last-child{
    border-top-right-radius:25px;
    border-bottom-right-radius:25px;
  }
  &:nth-child(${props=>props.state||0}){
    color:white;
    background-color: ${props=>props.color==='green'?`var(--green__color)`:'var(--chamong__color)'};
  }
 } 
`