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
      <select
        className="numberOfWinnersInput"
        onChange={(e) => {
          setNumberOfWinners(Number(e.target.value));
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
