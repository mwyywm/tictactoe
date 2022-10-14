import React, { useState } from "react";
import "./App.css";

function App() {
  const [currPlayer, setCurrPlayer] = useState<1 | 2>(1);
  const [tiles, setTiles] = useState<number[][] | undefined[][]>([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ]); // 2d Array
  // player 1 = X
  // player 2 = O

  function handleClick(currPlayer: 1 | 2, row: number, col: number) {
    if (tiles[row][col] !== undefined) return; // Only allows a single click per tile.
    currPlayer === 1 ? setCurrPlayer(2) : setCurrPlayer(1); // change current player every click

    // Set the index in tiles 2D array to the players number
    setTiles((prev: number[][] | undefined[][]) => {
      prev[row][col] = currPlayer;
      return prev;
    });
  }
  return (
    <div className="App">
      <h1>Player {currPlayer} turn!</h1>
      <h3>
        Player {currPlayer} uses {currPlayer === 1 ? "X" : "O"}
      </h3>
      {tiles.map((row, rowIndex) => (
        <div className="container" key={rowIndex}>
          {row.map((_, colIndex) => (
            <div
              className="tile"
              key={`${rowIndex}${colIndex}`}
              onClick={() => handleClick(currPlayer, rowIndex, colIndex)}
            >
              <p>
                {tiles[rowIndex][colIndex] === 1
                  ? "X"
                  : tiles[rowIndex][colIndex] === 2
                  ? "O"
                  : undefined}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
