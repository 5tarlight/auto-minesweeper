import { NextPage } from "next";
import { GridState } from "./MineGrid";

interface Props extends GridState {
  num: number;
}

const MineCell: NextPage<Props> = ({ col, row, action, type, num }) => {
  const className = `cell ${action} ${type}`;
  return (
    <>
      <div className={className}>
        {type === "mine" ? "*" : num === 0 ? "" : num}
      </div>

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

          .mine {
            background-color: #f00;
          }
        `}
      </style>
    </>
  );
};

export default MineCell;
