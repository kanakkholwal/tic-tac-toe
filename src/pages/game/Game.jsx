import { useState } from "react";
import Board from "./Board";
import { Turn, Cross, Circle } from "./GameElements"
import Button from "../../components/Button";
import ButtonContainer from "../../components/ButtonContainer";
import Heading from "../../components/Heading"


export default function Game(props) {

    const [state, setState] = useState({
        history: [
            {
                squares: Array(9).fill(null)
            }
        ],
        stepNumber: 0,
        xIsNext: true
    })
    function handleClick(i) {
        const history = state.history.slice(0, state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = state.xIsNext ? <Cross /> : <Circle />;
        setState({
            history: history.concat([
                {
                    squares: squares
                }
            ]),
            stepNumber: history.length,
            xIsNext: !state.xIsNext
        });
    }

    function jumpTo(step) {
        setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }


    const history = state.history;
    const current = history[state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
        const desc = move ?
            'Go to move #' + move :
            'Go to game start';
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
            </li>
        );
    });

    let status;
    if (winner) {
        status = "Winner: " + winner;
    } else {
        status = "Next player: " + (state.xIsNext ? <Cross /> : <Circle />);
    }
    return (
        <>
            <Heading>Game with {" Harry"}</Heading>
            <p>Your piece</p>
            <Turn>{status} </Turn>
            <Board
                squares={current.squares}
                onClick={i => handleClick(i)}
            />
            <ButtonContainer>
                <Button>Submit</Button>
            </ButtonContainer>
        </>
    );
}


function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}
