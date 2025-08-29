import "./App.css";
import { useState, type JSX } from "react";
import { TouchArea } from "./components/touchArea/touchArea";
import { Settings } from "./components/settings/settings";

function VibrateButton() {
  const vibrate = (pattern = [200, 100, 200]) => {
    if ("vibrate" in navigator) {
      navigator.vibrate(pattern);
    } else {
      console.warn("Vibration API not supported on this device/browser.");
    }
  };

  return (
    <button
      style={{ position: "absolute", color: "white", top: 10, right: 10 }}
      onClick={() => vibrate()}
    >
      Vibrate
    </button>
  );
}

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
          setNumberOfWinners={setNumberOfWinners}
        />
      )}
      <VibrateButton />
    </>
  );
}
