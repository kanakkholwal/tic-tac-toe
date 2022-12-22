import { Square as SquareElement } from "./GameElements"
import { Cross, Circle } from "./GameElements"


export default function Square(props) {
    return (
        <SquareElement type="button" onClick={props.onClick}>
            {props.value === "X" ? <Cross /> : props.value === "O" ? <Circle /> : null}
        </SquareElement>
    );
}