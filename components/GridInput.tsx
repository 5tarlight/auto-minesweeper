import { NextPage } from "next";

export interface Grid {
  row: number;
  col: number;
}

interface Props {
  grid: Grid;
  setGrid: (grid: Grid) => void;
}

const GridInput: NextPage<Props> = ({ grid: { row, col }, setGrid }) => {
  return (
    <>
      <input
        type="number"
        placeholder="row"
        value={row}
        onChange={({ target: { value } }) =>
          setGrid({ col, row: Math.max(0, parseInt(value)) })
        }
      />
      <span>X</span>
      <input
        type="number"
        placeholder="col"
        value={col}
        onChange={({ target: { value } }) =>
          setGrid({ row, col: Math.max(0, parseInt(value)) })
        }
      />

      <style jsx>
        {`
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
        `}
      </style>
    </>
  );
};

export default GridInput;
