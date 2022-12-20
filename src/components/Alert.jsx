import styled from "styled-components";


const Alert = styled.div`
width:100%;
margin:auto 0.75rem 1rem;
border-radius: 8px;
font-weight: 400;
font-size: 14px;
color:#fbfbfb;
padding:26px 16px;
background:${props => props.success ? "#6FCF97" : "#EB5757"}
display:${props => props.hidden ? "none" : "block"}
`;
export default Alert;