import styled from "styled-components";


const Heading = styled.h2`
font-size: 28px;
font-family:${props => props.font ? 'Bilbo' : ""};
margin:${props => props.font ? '8rem auto 20px' : "20px"};
text-align:${props => props.font ? 'center' : "left"};
font-weight:${props => props.font ? '400' : "700"};
font-size:${props => props.large ? '96px' : "36px"};
`;


export default Heading;