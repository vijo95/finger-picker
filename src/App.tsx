import "./App.css";
import { useState, type JSX } from "react";
import { TouchArea } from "./components/touchArea/touchArea";
import { Settings } from "./components/settings/settings";

export type GameMode = "groups" | "winners";

export default function App(): JSX.Element {
  const [gameMode, setGameMode] = useState<GameMode>("winners");
  const [numberOfWinners, setNumberOfWinnersOrGroups] = useState(1);
  const [gameStarted, setGameStarted] = useState(false);
  return (
    <>
      {!gameStarted ? (
        <Settings
          gameMode={gameMode}
          setGameStarted={setGameStarted}
          setGameMode={setGameMode}
          setNumberOfWinnersOrGroups={setNumberOfWinnersOrGroups}
        />
      ) : (
        <TouchArea
          numberOfWinners={numberOfWinners}
          setGameStarted={setGameStarted}
          setNumberOfWinnersOrGroups={setNumberOfWinnersOrGroups}
        />
      )}
    </>
  );
}
