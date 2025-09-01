import type { GameMode } from "../../App";
import "./settings.css";

export const Settings = ({
  gameMode,
  setGameStarted,
  setGameMode,
  setNumberOfWinnersOrGroups,
}: {
  gameMode: GameMode;
  setGameMode: React.Dispatch<React.SetStateAction<GameMode>>;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setNumberOfWinnersOrGroups: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="settingsContainer">
      <label className="radio">
        <input
          type="radio"
          name="selection"
          value="groups"
          checked={gameMode === "groups"}
          onChange={() => setGameMode("groups")}
        />
        <span className="radiomark" />
        <span style={{ color: "white", userSelect: "none" }}>Groups</span>
      </label>
      <label className="radio">
        <input
          type="radio"
          name="selection"
          value="winners"
          checked={gameMode === "winners"}
          onChange={() => setGameMode("winners")}
        />
        <span className="radiomark" />
        <span style={{ color: "white", userSelect: "none" }}>
          Number of Winners
        </span>
      </label>

      <select
        className="numberOfWinnersInput"
        onChange={(e) => {
          setNumberOfWinnersOrGroups(Number(e.target.value));
        }}
      >
        {[...Array(5)]?.map((_, i) => (
          <option key={i}>{i + 1}</option>
        ))}
      </select>
      <button className="buttonStyled" onClick={() => setGameStarted(true)}>
        Start
      </button>
    </div>
  );
};
