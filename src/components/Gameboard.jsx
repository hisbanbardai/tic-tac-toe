import { useState } from "react";

// const initialGameboard = [
//   [null, null, null],
//   [null, null, null],
//   [null, null, null],
// ];

//we have created the above initialGameboard because we know for tic tac toe game we need a 3x3 grid and this info is static (it will not change). Then we use the above array to create our html structure below i.e. the outer array is the ol element which contains three li elements and each li element contains a child ol element and this child ol element contains three li elements. The only thing dynamic will be the values inside button elements

export default function GameBoard({ board, clickSquare }) {
  // const gameBoard = initialGameboard;

  //Below what we are doing is called deriving the state from props. We are deriving the state of gameBoard from turns prop. We should use as less states as possible and derive other states from it
  // for (const turn of turns) {
  //   //object destructuring below
  //   const { square, player } = turn;
  //   const { rowIndex, colIndex } = square;

  //   gameBoard[rowIndex][colIndex] = player;
  // }

  // const [gameBoard, setGameboard] = useState(initialGameboard);

  // function handleClickSquare(rowIndex, colIndex) {
  //   setGameboard((prevGameBoard) => {
  //     //we should not do the below because objects are mutable and the below line of code will directly change the object in memory and as we know React schedules state updates, so the object in memory will be changed before React updates the state and this can cause issues. Instead we should create a deep copy of the object using spread operator
  //     // prevGameBoard[rowIndex][colIndex] = "X";
  //     // return prevGameBoard;

  //     //we did the below because spread operator only creates a shallow copy of the object which means that if we modify any nested element then this change will also be affected to the original object. Therefore we need to deeply copy the object i.e. inner Array
  //     const updatedGameBoard = [
  //       ...prevGameBoard.map((innerArray) => [...innerArray]),
  //     ];
  //     updatedGameBoard[rowIndex][colIndex] = activePlayerSymbol;
  //     return updatedGameBoard;
  //   });

  //   switchPlayer();
  // }

  return (
    <ol id="game-board">
      {board.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ol>
              {/* below col represents player symbol */}
              {row.map((col, colIndex) => {
                return (
                  <li key={colIndex}>
                    <button
                      //sending information which square was clicked
                      onClick={() => clickSquare(rowIndex, colIndex)}
                      disabled={col !== null}
                    >
                      {/* here "col" is player's symbol */}
                      {col}
                    </button>
                  </li>
                );
              })}
            </ol>
          </li>
        );
      })}
    </ol>
  );
}
