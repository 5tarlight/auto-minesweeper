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
            for (let j = 0; j < col; j++) {
              cells.push(<MineCell key={`${i}-${j}`} row={i} col={j} />);
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
          }
        `}
      </style>
    </>
  );
};

export default MineGrid;
