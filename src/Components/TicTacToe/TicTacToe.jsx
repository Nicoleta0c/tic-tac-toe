import React, { useRef, useState } from 'react';
import './TicTacToe.css';
import circle_icon from '../assets/circle.png';
import cross_icon from '../assets/cross.png';

let data = Array(9).fill("");

const TicTacToe = () => {
    let [count, setCount] = useState(0);
    let [lock, setLock] = useState(false);
    let titleRef = useRef(null);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    let boxesRef = Array(9).fill().map(() => useRef(null));

    const toggle = (e, num) => {
        if (lock || data[num]) return;

        const currentSymbol = count % 2 === 0 ? "x" : "o";
        const icon = currentSymbol === "x" ? cross_icon : circle_icon;

        e.target.innerHTML = `<img src='${icon}'>`;
        data[num] = currentSymbol;
        setCount(count + 1);
        checkWin();
    };

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
    };

    const won = (winner) => {
        setLock(true);
        titleRef.current.innerHTML = `¡Congratulations! ${winner === 'x' ? 'X' : 'O'} Wins`;
    };

    const reset = () => {
        setLock(false);
        data.fill("");
        titleRef.current.innerHTML = 'Tic <span>Tac</span> Toe';
        boxesRef.forEach((box) => {
            box.current.innerHTML = "";
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
