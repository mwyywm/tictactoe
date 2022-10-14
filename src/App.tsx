import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [tiles, setTiles] = useState([
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ]); // 2d Array

  return (
    <div className="App">
      {tiles.map((row, rowIndex) => (
        <div className="container">
          {row.map((_, colIndex) => (
            <div className="tile">
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
