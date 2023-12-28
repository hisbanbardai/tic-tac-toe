import { useState } from "react";
import GameBoard from "./components/Gameboard";
import Player from "./components/Player";

function App() {
  //Below what we are doing is called lifting the state up
  //We are handling the state of the active player because we want to highlight the active player. But we are defining the state here and not in the Player component because the active player state should get updated when a square/button is clicked. So that means our Game component also needs the active player state because we will also display "X" or "O" in gameboard on the basis of active player. That means both Player and Gameboard needs access to active player state and that's why we moved the state to the common ancestor of both child components i.e. App component.
  //NOTE: we are handling active player on the basis of symbols "X" and "O"
  const [activePlayer, setactivePlayer] = useState("X");

  function handleActivePlayer() {
    setactivePlayer((currActivePlayer) =>
      currActivePlayer === "X" ? "O" : "X"
    );
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
          switchPlayer={handleActivePlayer}
        />
      </div>
    </main>
  );
}

export default App;
