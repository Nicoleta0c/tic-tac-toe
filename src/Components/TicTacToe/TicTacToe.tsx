import React, { useRef, useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../assets/circle.png';
import cross_icon from '../assets/cross.png';

let data: string[] = Array(9).fill("");

const TicTacToe: React.FC = () => {
    const [count, setCount] = useState<number>(0);
    const [lock, setLock] = useState<boolean>(false);
    const titleRef = useRef<HTMLHeadingElement | null>(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const boxesRef = Array(9).fill(null).map(() => useRef<HTMLDivElement | null>(null));

    const toggle = (e: React.MouseEvent<HTMLDivElement>, num: number) => {
        if (lock || data[num]) return;

        //Determines the symbol ('x' or 'o') based on the number of moves
        const currentSymbol = count % 2 === 0 ? "x" : "o";
        const icon = currentSymbol === "x" ? cross_icon : circle_icon;

        if (e.target instanceof HTMLDivElement) {
            e.target.innerHTML = `<img src='${icon}'>`;
        }
        
        data[num] = currentSymbol;
        setCount(count + 1);

        //Checks if there is a winner after the move
        checkWin();
    };

    //Function to check if there is a winner in the game
    const checkWin = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (data[a] && data[a] === data[b] && data[a] === data[c]) {
                won(data[a]);
                return;
            }
        }
        checkDraw();
    };

    // Logic to determine if it's a tie
    const checkDraw = () => {
        if (count === 8 && !lock) {
            setLock(true);
            titleRef.current!.innerHTML = "Draw!";
        }
    };

    // This function is called when a player wins and detects if X or O has won
    const won = (winner: string) => {
        setLock(true);
        titleRef.current!.innerHTML = `¡Congratulations! ${winner === 'x' ? 'X' : 'O'} Wins`;
    };

    // Button to restart the game
    const reset = () => {
        setLock(false);
        data.fill("");
        titleRef.current!.innerHTML = 'Tic <span>Tac</span> Toe';
        boxesRef.forEach((box) => {
            if (box.current) {
                box.current.innerHTML = "";
            }
        });
        setCount(0);
    };

    return (
        <div className='container'>
            <h1 className='title' ref={titleRef}>Tic <span>Tac</span> Toe</h1>
            <div className='board'>
                <div className='row1'>
                    <div className="boxes" ref={boxesRef[0]} onClick={(e) => toggle(e, 0)}></div>
                    <div className="boxes" ref={boxesRef[1]} onClick={(e) => toggle(e, 1)}></div>
                    <div className="boxes" ref={boxesRef[2]} onClick={(e) => toggle(e, 2)}></div>
                </div>
                <div className='row2'>
                    <div className="boxes" ref={boxesRef[3]} onClick={(e) => toggle(e, 3)}></div>
                    <div className="boxes" ref={boxesRef[4]} onClick={(e) => toggle(e, 4)}></div>
                    <div className="boxes" ref={boxesRef[5]} onClick={(e) => toggle(e, 5)}></div>
                </div>
                <div className='row3'>
                    <div className="boxes" ref={boxesRef[6]} onClick={(e) => toggle(e, 6)}></div>
                    <div className="boxes" ref={boxesRef[7]} onClick={(e) => toggle(e, 7)}></div>
                    <div className="boxes" ref={boxesRef[8]} onClick={(e) => toggle(e, 8)}></div>
                </div>
            </div>
            <button className='reset' onClick={reset}>Reset</button>
        </div>
    );
};

export default TicTacToe;
