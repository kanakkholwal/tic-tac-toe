import styled from "styled-components";


const Button = styled.button`
box-shadow: 2px 2px 16px rgba(0, 0, 0, 0.16);
border-radius: 8px;
padding:1rem 2rem;
width:100%;
color:rgba(255, 255, 255,1);
background:${props => props.primary ? "#2F80ED" : props.grey ? "#E0E0E0" : "#F2C94C"};
margin-block:0.75rem;
cursor:pointer;
transition:all 0.3s ease-in-out;
font-weight: 700;
font-size: 14px;
line-height: 14px;
text-align:center;
letter-spacing:1px;
&:active{
    scale:0.9;

}
`

export default Button;