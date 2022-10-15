import { useState, useEffect } from "react";
import "./App.css";

function ResetButton({ reset }: { reset: VoidFunction }) {
  return <button onClick={() => reset()}>Play again</button>;
}

function App() {
  const [currPlayer, setCurrPlayer] = useState<1 | 2>(1);
  const [lastClicked, setLastClicked] = useState<number[]>([0, 0]); // [row, col]
  const [tiles, setTiles] = useState<number[][]>([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]); // 2D Array
  const [round, setRound] = useState(0);
  const [winningPlayer, setWinningPlayer] = useState<number | false>(false);
  // player 1 = X
  // player 2 = O
  // everytime tiles changes we need to check if we have 3 in a row

  function handleClick(currPlayer: 1 | 2, row: number, col: number) {
    if (tiles[row][col] !== 0) return; // Only allows a single click per tile.
    currPlayer === 1 ? setCurrPlayer(2) : setCurrPlayer(1); // change current player every click
    // Set the index in tiles 2D array to the players number
    setTiles((prev: number[][]) => {
      prev[row][col] = currPlayer;
      return prev;
    });
    setLastClicked([row, col]);
    setRound((prev) => prev + 1);
  }

  function threeInARow(row: number, col: number): number | false {
    // we check the last clicked tile to see if we have 3 in a row.
    // check row
    if (
      tiles[row].every((elem: number) => elem > 0 && elem === tiles[row][col])
    ) {
      return tiles[row][0]; // winning player
    }
    // check vertically
    if (tiles.every((arr) => arr[col] > 0 && arr[col] === tiles[row][col])) {
      return tiles[row][col]; // winning player
    }
    // temp arrays for checking diagonals 00 11 22 and 20 11 02
    let temp1: number[] = [];
    let temp2: number[] = [];
    for (let i = 0; i < 3; i++) {
      // inserting data into temp arrays
      temp1.push(tiles[i][i]);
      temp2.push(tiles[i][2 - i]);
    }
    // Diagonal check
    if (temp1.every((elem) => temp1[0] === elem && elem > 0)) {
      return temp1[0]; // winning player
    } else if (temp2.every((elem) => temp1[0] === elem && elem > 0)) {
      return temp2[0];
    }
    // No match was made returns false
    return false;
  }
  function newGame(): void {
    // reset all the states to their default values
    setCurrPlayer(1);
    setLastClicked([0, 0]);
    setTiles([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
    setRound(0);
    setWinningPlayer(false);
  }
  useEffect(() => {
    if (!!threeInARow(lastClicked[0], lastClicked[1])) {
      setWinningPlayer(threeInARow(lastClicked[0], lastClicked[1]));
    }
  }, [currPlayer]);

  if (!!winningPlayer) {
    // we have a winning player
    return (
      <div>
        <h1>Player {winningPlayer} won the game!</h1>
        <ResetButton reset={newGame} />
      </div>
    );
  }
  if (round >= 9) {
    // All the tiles are filled
    return (
      <div>
        <h1>It's a tie!</h1>
        <ResetButton reset={newGame} />
      </div>
    );
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
              aria-labelledby="button"
              id={`tile${rowIndex}${colIndex}`}
              key={`${rowIndex}${colIndex}`}
              style={{
                cursor: tiles[rowIndex][colIndex] >= 1 ? "default" : "pointer",
              }}
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
