import "./settings.css";

export const Settings = ({
  setNumberOfWinners,
  setGameStarted,
}: {
  setNumberOfWinners: React.Dispatch<React.SetStateAction<number>>;
  setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <div className="settingsContainer">
      <input
        type="number"
        placeholder="Number of winners"
        className="numberOfWinnersInput"
        onChange={(e) => setNumberOfWinners(Number(e.target.value))}
        min={1}
      />
      <button className="button-styled" onClick={() => setGameStarted(true)}>
        Start
      </button>
    </div>
  );
};
