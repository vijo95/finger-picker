import { TouchArea } from "./components/touchArea";
import "./App.css";
import { Settings } from "./components/settings";
import { useState } from "react";

export default function App() {
  const [numberOfWinners, setNumberOfWinners] = useState<number>(0);
  const [gameStarted, setGameStarted] = useState<boolean>(false);

  return (
    <div className="root">
      {!gameStarted ? (
        <Settings
          setNumberOfWinners={setNumberOfWinners}
          setGameStarted={setGameStarted}
        />
      ) : null}
      {gameStarted ? <TouchArea numberOfWinners={numberOfWinners} /> : null}
    </div>
  );
}
