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
      //also here we are setting player: activePlayer to get the active player but we are merging two different states i.e. activePLayer and gameTurns. Also just doing this will not guarantee us the active player because React schedules state updates and as we know if we want to update state based on the previous state then we should not set or use it directly
      // const updatedGameTurns = [
      //   { square: { rowIndex, colIndex }, player: activePlayer },
      //   ...prevGameTurns,
      // ];

      //To resolve the above mentioned issue, here we are assuming activePLayer as "X" and then comparing it with the recent gameTurn's activePlayer. We have used prevGameTurns[0] because we are saving the recent gameTurn at first place. We have also catered the case if gameTurns array is empty which would be the case at first turn.
      let currentPlayer = "X";

      if (prevGameTurns.length > 0 && prevGameTurns[0].player === "X") {
        currentPlayer = "O";
      }
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
        <GameBoard
          //no need to send activePlayer because we have activePlayer's state in gameTurns
          // activePlayerSymbol={activePlayer}
          turns={gameTurns}
          clickSquare={handleSelectSquare}
        />
      </div>
      <Logs turns={gameTurns} />
    </main>
  );
}

export default App;
