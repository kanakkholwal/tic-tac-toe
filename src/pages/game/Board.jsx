import Square from "./Square";
import { Board as BoardElement } from "./GameElements"
const NoOfSquare = [0, 1, 2, 3, 4, 5, 6, 7, 8];



export default function Board(props) {

    return (
        <BoardElement>
            {
                NoOfSquare.map((item, index) => {
                    return (<Square value={props.squares[index]} onClick={() => props.onClick(index)} key={item} />)
                })
            }

        </BoardElement>
    );

}