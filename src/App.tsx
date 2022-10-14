import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [tiles, setTiles] = useState([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ]); // 2d Array
  // player 1 = X
  // player 2 = O
  return (
    <div className="App">
      {tiles.map((row, rowIndex) => (
        <div className="container" key={rowIndex}>
          {row.map((_, colIndex) => (
            <div className="tile" key={`${rowIndex}${colIndex}`}>
              <p>{rowIndex}</p>
              <p>{colIndex}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
