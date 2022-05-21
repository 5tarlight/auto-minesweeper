import { NextPage } from "next";
import { GridState } from "./MineGrid";

interface Props extends GridState {
  revealCell: (row: number, col: number) => void;
  toggleFlag: (row: number, col: number) => void;
}

const MineCell: NextPage<Props> = ({
  col,
  row,
  action,
  type,
  near,
  revealCell,
  toggleFlag,
}) => {
  const className = `cell ${action} ${type}`;
  return (
    <>
      {action === "default" && (
        <div
          className={className}
          onClick={() => type === "safe" && revealCell(row, col)}
          onContextMenu={(e) => {
            e.preventDefault();
            toggleFlag(row, col);
          }}
        >
          {/* {type === "mine" && "*"}
          {type === "safe" && (near === 0 ? "" : near)} */}
        </div>
      )}
      {action === "reveal" && (
        <div className={className}>
          {type === "mine" ? "*" : near === 0 ? "" : near}
        </div>
      )}
      {action === "flag" && (
        <div
          className={className}
          onContextMenu={(e) => {
            e.preventDefault();
            toggleFlag(row, col);
          }}
        >
          P
        </div>
      )}

      {/* <div className={className}>
        {type === "mine" ? "*" : near === 0 ? "" : near}
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
            user-select: none;
          }

          .default {
            background-color: #efefef;
          }

          .default:hover {
            background-color: #eee;
            cursor: pointer;
          }

          .flag {
            color: #00ff0d;
            background-color: #efefef;
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
