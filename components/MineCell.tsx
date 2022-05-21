import { NextPage } from "next";
import { GridState } from "./MineGrid";

interface Props extends GridState {
  num: number;
  revealCell: (row: number, col: number) => void;
}

const MineCell: NextPage<Props> = ({
  col,
  row,
  action,
  type,
  num,
  revealCell,
}) => {
  const className = `cell ${action} ${type}`;
  return (
    <>
      {action === "default" && (
        <div
          className={className}
          onClick={() => type === "safe" && revealCell(row, col)}
        ></div>
      )}
      {action === "reveal" && (
        <div className={className}>
          {type === "mine" ? "*" : num === 0 ? "" : num}
        </div>
      )}
      {/* <div className={className}>
        {type === "mine" ? "*" : num === 0 ? "" : num}
      </div> */}

      <style jsx>
        {`
          .cell {
            border: 1px solid #ccc;
            align-items: center;
            align-content: center;
            text-align: center;
            font-size: 25px;
            line-height: 50px;
          }

          .default {
            background-color: #efefef;
          }

          .default:hover {
            background-color: #eee;
          }

          // .mine {
          //   background-color: #f00;
          //   line-height: 60px;
          // }

          // .mine.default:hover {
          //   background-color: #f74242;
          // }
        `}
      </style>
    </>
  );
};

export default MineCell;
