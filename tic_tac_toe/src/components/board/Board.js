import React from 'react';
import Square from '../square/Square';
import styles from './Board.module.css';
import {useDispatch, useSelector} from "react-redux";
import {batchArray} from "../../utils/arrayUtils";
import {computerStart, reset} from "./boardSlice";
import Score from "../score/Score";

export default function Board(props) {
  const squares = props.squares;
  const started = props.started;
  const gameState = useSelector((state) => state.board.gameState);
  const score = useSelector((state) => ({
    draws: state.board.draws,
    playerScore: state.board.playerScore,
    computerScore: state.board.computerScore,
  }));

  const squaresByRow = batchArray(squares, 3);
  const dispatch = useDispatch();

  const renderRows = () => (
    squaresByRow.map((row, rowIdx) => (
      <React.Fragment key={rowIdx}>
        <div className={styles.row}>
          {
            row.map((marker, sqIdx) => {
              const idx = sqIdx + rowIdx * 3;
              return (
                <React.Fragment key={idx} >
                  <Square marker={marker} idx={idx} gameState={gameState}/>
                </React.Fragment>
              );
            })
          }
        </div>
      </React.Fragment>
    ))
  );

  return (
    <>
      <Score draws={score.draws} playerScore={score.playerScore} computerScore={score.computerScore}/>
      <h3 className={styles.header}>{gameState}</h3>
      <div className={styles.board}>
        {renderRows()}
      </div>
      <div>
        {
          started ?
            null :
            <button className={styles.boardButton} onClick={() => dispatch(computerStart())}>COMPUTER START</button>
        }
        <button className={styles.boardButton} onClick={() => dispatch(reset())}>RESET</button>
      </div>
    </>
  );
}
