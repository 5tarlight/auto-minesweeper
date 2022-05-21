import { NextPage } from "next";

export interface Grid {
  row: number;
  col: number;
}

export type GameStatus = "playing" | "win" | "lose";

interface Props {
  grid: Grid;
  setGrid: (grid: Grid) => void;
  initGrid: () => void;
  leftMines: number;
  status: GameStatus;
  timer: number;
}

const GridInput: NextPage<Props> = ({
  grid: { row, col },
  setGrid,
  initGrid,
  leftMines,
  status,
  timer,
}) => {
  return (
    <>
      <div className="container">
        <input
          type="number"
          placeholder="row"
          value={row}
          onChange={({ target: { value } }) =>
            setGrid({ col, row: Math.max(1, parseInt(value)) })
          }
        />
        <span>X</span>
        <input
          type="number"
          placeholder="col"
          value={col}
          onChange={({ target: { value } }) =>
            setGrid({ row, col: Math.max(1, parseInt(value)) })
          }
        />
        <button onClick={initGrid}>Re-generate</button>

        <div className="mines">
          <span>Mines: {leftMines}</span>
        </div>
        <div>
          {status} ({Math.round(timer * 100) / 100}s)
        </div>
      </div>

      <style jsx>
        {`
          .container {
            display: flex;
            align-items: center;
            margin: 1rem 2rem;
          }

          input {
            width: 50px;
            height: 50px;
            border: 1px solid #ccc;
            border-radius: 5px;
            padding: 5px;
            margin: 5px;
            align-self: center;
            align-items: center;
            align-content: center;
            align-text: center;
          }

          .mines {
            margin: 0 2rem;
          }
        `}
      </style>
    </>
  );
};

export default GridInput;
