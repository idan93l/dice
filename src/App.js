import GameBoard from "./Pages/GameBoard";

if (module.hot) {
  module.hot.accept();
}

function App() {
  return (
    <GameBoard />
  );
}

export default App;
