import { NextPage } from "next";
import MineCell from "./MineCell";

export type CellType = "mine" | "safe";
export type CellActionType = "flag" | "default" | "reveal";

export interface GridState {
  row: number;
  col: number;
  type: CellType;
  action: CellActionType;
  near: number;
}

interface Props {
  row: number;
  col: number;
  gridState: GridState[][];
  revealCell: (row: number, col: number) => void;
  toggleFlag: (row: number, col: number) => void;
}

const MineGrid: NextPage<Props> = ({
  row,
  col,
  gridState,
  revealCell,
  toggleFlag,
}) => {
  return (
    <>
      <div className="container">
        {(() => {
          const cells = [];

          for (let i = 0; i < row; i++) {
            if (!gridState[i]) continue;
            for (let j = 0; j < col; j++) {
              if (!gridState[i][j]) continue;
              cells.push(
                <MineCell
                  key={`${i}-${j}`}
                  row={i}
                  col={j}
                  type={gridState[i][j].type}
                  action={gridState[i][j].action}
                  near={gridState[i][j].near}
                  revealCell={revealCell}
                  toggleFlag={toggleFlag}
                />
              );
            }
          }

          return cells;
        })()}
      </div>

      <style jsx>
        {`
          .container {
            display: grid;
            grid-template-columns: repeat(${col}, 50px);
            grid-template-rows: repeat(${row}, 50px);
            margin: 1rem 2rem;
            border: 1px solid black;
            width: fit-content;
          }
        `}
      </style>
    </>
  );
};

export default MineGrid;
