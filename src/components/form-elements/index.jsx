import styled from "styled-components";


export const FormElement = styled.div`
width:100%;
margin:0.5rem;
`
export const Label = styled.label`
width:100%;
font-weight: 700;
font-size: 16px;
line-height: 16px;
margin:0.5rem;

`
export const Input = styled.input`
width:100%;
padding: 20px 16px 16px;
background: #f4f4f4;
border-radius: 8px;
font-weight: 600;
font-size: 14px;
line-height: 16px;
margin-block:0.5rem;
color: #333333;
&:placeholder{
    opacity: 0.5;
font-weight:500;
}
&:focus{
    &:placeholder{

    opacity:1;

}
}
`

