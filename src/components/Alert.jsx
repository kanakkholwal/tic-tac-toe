import styled from "styled-components";


const Alert = styled.div`
width:100%;
margin:auto 0.75rem 1rem;
border-radius: 8px;
font-weight: 400;
font-size: 14px;
color:#fbfbfb;
padding:26px 16px;
background:${props => props.type.length > 0 ? (props.type == "success" ? "#6FCF97" : props.type == "error" ? "#EB5757" : "#E0E0E0") : "#E0E0E0"};
display:${props => props.hidden ? "none" : "block"}
`;
export default Alert;