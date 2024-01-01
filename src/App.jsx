import { useState } from "react";
import GameBoard from "./components/Gameboard";
import Player from "./components/Player";
import Logs from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const INITIAL_GAMEBOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

const PLAYERS = { X: "Player 1", O: "Player 2" };

function deriveActivePlayer(gameTurns) {
  let activePlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    activePlayer = "O";
  }

  return activePlayer;
}

function deriveGameBoard(gameTurns) {
  //we should not do the below because of the immutability rule i.e. objects cannot be copied just by assignment operator. They will always refer to the same object in memory
  // const gameBoard = initialGameboard;

  const gameBoard = [...INITIAL_GAMEBOARD.map((array) => [...array])];
  for (const turn of gameTurns) {
    //object destructuring below
    const { square, player } = turn;
    const { rowIndex, colIndex } = square;

    gameBoard[rowIndex][colIndex] = player;
  }

  return gameBoard;
}

function deriveWinner(gameBoard, playerName) {
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
      winner = playerName[firstSymbol];
    }
  }

  return winner;
}

function App() {
  // const [activePlayer, setactivePlayer] = useState("X");
  //Above what we are doing is called lifting the state up
  //We are handling the state of the active player because we want to highlight the active player. But we are defining the state here and not in the Player component because the active player state should get updated when a square/button is clicked. So that means our Game component also needs the active player state because we will also display "X" or "O" in gameboard on the basis of active player. That means both Player and Gameboard needs access to active player state and that's why we moved the state to the common ancestor of both child components i.e. App component.
  //NOTE: we are handling active player on the basis of symbols "X" and "O"

  //If we notice one thing above, it is that we do not need to have a separate state for activePlayer. We can derive its state from the gameTurns state. game turn is an object that contains information about the active player and the clicked square co-ordinates.

  const [gameTurns, setGameTurns] = useState([]);
  //above we are also lifting the state up because the gameTurns state is going to be used by Gameboard and Log components.

  const [playerName, setPlayerName] = useState(PLAYERS);
  //above we are setting a separate players names state and not lifting the player name state from Player component because in Player component we are update the Player state everytime user input is changed. So if we lift it up to the App component then on every input change whole App component will be rendered
  function handleChangePlayerName(symbol, playerName) {
    setPlayerName((prevPlayersName) => {
      return {
        ...prevPlayersName,
        [symbol]: playerName,
      };
    });
  }

  //DERIVING ACTIVE PLAYER STATE FROM GAMETURNS instead of managing its own separate state
  const activePlayer = deriveActivePlayer(gameTurns);

  const gameBoard = deriveGameBoard(gameTurns);

  const winner = deriveWinner(gameBoard, playerName);

  //as we know that there can be total 9 turns so below we are checking if total turns are 9 and we do not have a winner then set gameOver as true
  const gameOver = gameTurns.length === 9 && !winner;

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

  function handleGameRestart() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            isActive={activePlayer === "X"}
            initialName={PLAYERS.X}
            symbol={"X"}
            onPlayerNameChange={handleChangePlayerName}
          />
          <Player
            isActive={activePlayer === "O"}
            initialName={PLAYERS.O}
            symbol={"O"}
            onPlayerNameChange={handleChangePlayerName}
          />
        </ol>
        <p>
          {(winner || gameOver) && (
            <GameOver winner={winner} onRestart={handleGameRestart} />
          )}
        </p>
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
