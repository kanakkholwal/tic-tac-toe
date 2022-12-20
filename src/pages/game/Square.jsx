import { Square as SquareElement } from "./GameElements"


export default function Square(props) {
    return (
        <SquareElement type="button" onClick={props.onClick}>
            {props.value}
        </SquareElement>
    );
}