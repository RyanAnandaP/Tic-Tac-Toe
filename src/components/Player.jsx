import React, { useState } from "react";

const Player = ({ name, symbol, isActive, onChangeName }) => {
  const [playerName, setPlayerName] = useState(name);
  const [isEditing, setisEditing] = useState(false);

  const shortenName = (name) => {
    const words = name.split(" ");
    if (words.length > 2) {
      return `${words[0]} ${words[1]} ${words[2][0]}.`;
    }
    return name;
  };

  const handleEditing = () => {
    setisEditing((editing) => !editing);

    {
      isEditing ? onChangeName(symbol, playerName) : undefined;
    }
  };

  const handleChange = (e) => {
    setPlayerName(shortenName(e.target.value));
  };

  let PlayerName = <span className="player-name">{playerName}</span>;
  let EditPlayerName = (
    <input
      type="text"
      required
      placeholder={playerName}
      onChange={handleChange}
    />
  );

  return (
    <li className={isActive ? "active" : null}>
      <span className="player">
        {isEditing ? EditPlayerName : PlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditing}>{isEditing ? "Save" : "Edit"}</button>
    </li>
  );
};

export default Player;
