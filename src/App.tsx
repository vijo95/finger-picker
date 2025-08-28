import "./App.css";
import { useState, type JSX } from "react";
import { TouchArea } from "./components/touchArea/touchArea";
import { Settings } from "./components/settings/settings";

export default function App(): JSX.Element {
  const [numberOfWinners, setNumberOfWinners] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  return (
    <>
      {!gameStarted ? (
        <Settings
          setGameStarted={setGameStarted}
          setNumberOfWinners={setNumberOfWinners}
        />
      ) : (
        <TouchArea
          numberOfWinners={numberOfWinners}
          setGameStarted={setGameStarted}
        />
      )}
    </>
  );
}
