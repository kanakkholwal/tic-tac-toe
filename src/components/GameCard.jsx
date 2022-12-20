import styled from "styled-components";
import Button from "./Button";

const Card = styled.div`
background: #FFFFFF;
box-shadow: 2px 4px 16px rgba(0, 0, 0, 0.25);
border-radius: 8px;
padding:16px;
`;
const Title = styled.h2`
font-weight: 700;
font-size: 24px;
line-height: 25px;
color: #333333;
margin-bottom:16px;
`
const Status = styled.h6`
font-weight: 400;
font-size: 14px;
line-height: 18px;
color: #333333;
margin-bottom:16px;
`
const Timing = styled.p`
font-weight: 400;
font-size: 12px;
line-height: 18px;
color: #3F3F3F;
margin: 0 0 16px;

`

export default function GameCard({ name, status, timing }) {

    const CheckStatus = () => {


        switch (status) {
            case "playing":
                return `${name}  just made their move! \n It’s your turn to play now.`
                break;
            case "waiting":
                return `You’ve made your move! Waiting for them.`
                break;
            case "won":
                return `You won!`
                break;
            case "lost":
                return `You lost!`
                break;
            case "draw":
                return `It’s a Draw!`
                break;

            default:
                return "Error"
                break;
        }

    }
    return (<Card>
        <Title>Game with {name}</Title>
        <Status>{CheckStatus()}</Status>
        <Timing>{timing}</Timing>
        <Button>View Game</Button>
    </Card>)


}