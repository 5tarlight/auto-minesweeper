import { NextPage } from "next";

interface Props {
  row: number;
  col: number;
}

const MineCell: NextPage<Props> = ({ col, row }) => {
  return (
    <>
      <div className="cell"></div>

      <style jsx>
        {`
          .cell {
            border: 1px solid #ccc;
          }
        `}
      </style>
    </>
  );
};

export default MineCell;
