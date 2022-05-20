import { NextPage } from "next";
import MineCell from "./MineCell";

export type CellType = "mine" | "safe";
export type CellActionType = "flag" | "default" | "reveal";

export interface GridState {
  row: number;
  col: number;
  type: CellType;
  action: CellActionType;
}

interface Props {
  row: number;
  col: number;
  gridState: GridState[][];
}

const MineGrid: NextPage<Props> = ({ row, col, gridState }) => {
  return (
    <>
      <div className="container">
        {(() => {
          const cells = [];
          for (let i = 0; i < row; i++) {
            if (!gridState[i]) continue;
            for (let j = 0; j < col; j++) {
              if (
                !gridState[i] ||
                !gridState[i][j] ||
                (i > 0 &&
                  (!gridState[i - 1] ||
                    !gridState[i - 1][j] ||
                    (j > 0 && !gridState[i - 1][j - 1]) ||
                    (j < col - 1 && !gridState[i - 1][j + 1]))) ||
                (j > 0 && !gridState[i][j - 1]) ||
                (j < col - 1 && !gridState[i][j + 1]) ||
                (i < row - 1 &&
                  (!gridState[i + 1] ||
                    !gridState[i + 1][j] ||
                    (j > 0 && !gridState[i + 1][j - 1]) ||
                    (j < col - 1 && !gridState[i + 1][j + 1])))
              )
                continue;

              let count = 0;

              if (i > 0 && j > 0 && gridState[i - 1][j - 1].type === "mine")
                // 왼쪽위
                count++;
              if (i > 0 && gridState[i - 1][j].type === "mine") count++; // 위
              if (
                i > 0 &&
                j < col - 1 &&
                gridState[i - 1][j + 1].type === "mine" // 오른쪽위
              )
                count++;
              if (j > 0 && gridState[i][j - 1].type === "mine") count++; // 왼쪽
              if (j < col - 1 && gridState[i][j + 1].type === "mine") count++; //오른쪽
              if (
                i < row - 1 &&
                j > 0 &&
                gridState[i + 1][j - 1].type === "mine" // 왼쪽아래
              )
                count++;
              if (i < row - 1 && gridState[i + 1][j].type === "mine") count++; //아래
              if (
                i < row - 1 &&
                j < col - 1 &&
                gridState[i + 1][j + 1].type === "mine" // 오른쪽아래
              )
                count++;

              cells.push(
                <MineCell
                  key={`${i}-${j}`}
                  row={i}
                  col={j}
                  type={gridState[i][j].type}
                  action={gridState[i][j].action}
                  num={count}
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
          }
        `}
      </style>
    </>
  );
};

export default MineGrid;
