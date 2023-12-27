const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

//we have created the above initialGameboard because we know for tic tac toe game we need a 3x3 grid and this info is static (it will not change). Then we use the above array to create our html structure below i.e. the outer array is the ol element which contains three li elements and each li element contains a child ol element and this child ol element contains three li elements. The only thing dynamic will be the values inside button elements

export default function GameBoard() {
  return (
    <ol id="game-board">
      {initialGameboard.map((row, rowIndex) => {
        return (
          <li key={rowIndex}>
            <ol>
              {row.map((col, colIndex) => {
                return (
                  <li key={colIndex}>
                    <button>{col}</button>
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
