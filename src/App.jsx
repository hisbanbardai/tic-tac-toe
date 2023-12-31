import { useState } from "react";
import GameBoard from "./components/Gameboard";
import Player from "./components/Player";
import Logs from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const initialGameboard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let activePlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    activePlayer = "O";
  }

  return activePlayer;
}

function App() {
  // const [activePlayer, setactivePlayer] = useState("X");
  //Above what we are doing is called lifting the state up
  //We are handling the state of the active player because we want to highlight the active player. But we are defining the state here and not in the Player component because the active player state should get updated when a square/button is clicked. So that means our Game component also needs the active player state because we will also display "X" or "O" in gameboard on the basis of active player. That means both Player and Gameboard needs access to active player state and that's why we moved the state to the common ancestor of both child components i.e. App component.
  //NOTE: we are handling active player on the basis of symbols "X" and "O"

  //If we notice one thing above, it is that we do not need to have a separate state for activePlayer. We can derive its state from the gameTurns state. game turn is an object that contains information about the active player and the clicked square co-ordinates.

  const [gameTurns, setGameTurns] = useState([]);
  //above we are also lifting the state up because the gameTurns state is going to be used by Gameboard and Log components.

  //DERIVING ACTIVE PLAYER STATE FROM GAMETURNS instead of managing its own separate state
  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = initialGameboard;
  for (const turn of gameTurns) {
    //object destructuring below
    const { square, player } = turn;
    const { rowIndex, colIndex } = square;

    gameBoard[rowIndex][colIndex] = player;
  }
  //Below we are going through every winning combination each time App component gets re-rendered to see if we have a winner. But to get the values off of the gameboard we need access to it. That is why we will lift the game board from Gameboard component to App component
  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    ) {
      winner = firstSymbol;
    }
  }

  function handleSelectSquare(rowIndex, colIndex) {
    // setactivePlayer((currActivePlayer) =>
    //   currActivePlayer === "X" ? "O" : "X"
    // );

    setGameTurns((prevGameTurns) => {
      //below we are updating the state of an object i.e. array, immutably
      //also here we are setting player: activePlayer to get the active player but we are merging two different states i.e. activePLayer and gameTurns. Also just doing this will not guarantee us the active player because React schedules state updates and as we know if we want to update state based on the previous state then we should not set or use it directly
      // const updatedGameTurns = [
      //   { square: { rowIndex, colIndex }, player: activePlayer },
      //   ...prevGameTurns,
      // ];

      //To resolve the above mentioned issue, here we are assuming activePLayer as "X" and then comparing it with the recent gameTurn's activePlayer. We have used prevGameTurns[0] because we are saving the recent gameTurn at first place. We have also catered the case if gameTurns array is empty which would be the case at first turn.

      //DERIVING CURRENT PLAYER STATE FROM PREVGAMETURNS
      const currentPlayer = deriveActivePlayer(prevGameTurns);

      const updatedGameTurns = [
        { square: { rowIndex, colIndex }, player: currentPlayer },
        ...prevGameTurns,
      ];

      return updatedGameTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            isActive={activePlayer === "X"}
            initialName={"Player 1"}
            symbol={"X"}
          />
          <Player
            isActive={activePlayer === "O"}
            initialName={"Player 2"}
            symbol={"O"}
          />
        </ol>
        <p>{winner && `You won ${winner}`}</p>
        <GameBoard
          //no need to send activePlayer because we have activePlayer's state in gameTurns
          // activePlayerSymbol={activePlayer}
          board={gameBoard}
          clickSquare={handleSelectSquare}
        />
      </div>
      <Logs turns={gameTurns} />
    </main>
  );
}

export default App;
