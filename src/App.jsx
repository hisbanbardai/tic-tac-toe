import { useState } from "react";
import GameBoard from "./components/Gameboard";
import Player from "./components/Player";
import Logs from "./components/Log";

function App() {
  const [activePlayer, setactivePlayer] = useState("X");
  //Above what we are doing is called lifting the state up
  //We are handling the state of the active player because we want to highlight the active player. But we are defining the state here and not in the Player component because the active player state should get updated when a square/button is clicked. So that means our Game component also needs the active player state because we will also display "X" or "O" in gameboard on the basis of active player. That means both Player and Gameboard needs access to active player state and that's why we moved the state to the common ancestor of both child components i.e. App component.
  //NOTE: we are handling active player on the basis of symbols "X" and "O"

  const [gameTurns, setGameTurns] = useState([]);
  //above we are also lifting the state up because the gameTurns state is going to be used by Gameboard and Log components.

  function handleSelectSquare(rowIndex, colIndex) {
    setactivePlayer((currActivePlayer) =>
      currActivePlayer === "X" ? "O" : "X"
    );

    setGameTurns((prevGameTurns) => {
      //below we are updating the state of an object i.e. array, immutably
      const updatedGameTurns = [
        { square: { rowIndex, colIndex }, player: activePlayer },
        ...prevGameTurns,
      ];
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
        <GameBoard
          activePlayerSymbol={activePlayer}
          clickSquare={handleSelectSquare}
        />
      </div>
      <Logs />
    </main>
  );
}

export default App;
