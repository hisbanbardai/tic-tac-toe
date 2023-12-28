export default function Log() {
  // So we are also going to show logs which includes all the turns of both players. That means we need to manage it's state too and we can create its state here in this Logs file.
  //But if we notice the information we need to generate the logs is:
  //which player clicked the square and it's symbol and the position of the square
  //We can get all of the above mentioned information from the Gameboard component because there, we have the state of activePlayer and we are managing the state of Gameboard itself which can give us the information about which square was clicked and it's position.
  //But because Gameboard and Logs are siblings and they both need access to the same state i.e. gameboard state, we need to lift the gameboard state up to the common parent of them i.e. App component
}
