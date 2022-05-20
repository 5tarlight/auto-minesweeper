import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import MineGrid, { GridState } from "../components/MineGrid";
import GridInput, { Grid } from "../components/GridInput";

const Home: NextPage = () => {
  const [grid, setGrid] = useState<Grid>({ row: 10, col: 10 });
  const [gridState, setGridState] = useState<GridState[][]>([]);

  const initGrid = () => {
    const tempGridState: GridState[][] = [];
    for (let i = 0; i < grid.row; i++) {
      const row: GridState[] = [];
      for (let j = 0; j < grid.col; j++) {
        row.push({
          row: i,
          col: j,
          type: "safe",
          action: "default",
        });
      }
      tempGridState.push(row);
    }

    for (let i = 0; i < grid.row * grid.col * 0.2; i++) {
      const row = Math.floor(Math.random() * grid.row);
      const col = Math.floor(Math.random() * grid.col);
      tempGridState[row][col].type = "mine";
    }

    setGridState(tempGridState);
  };

  useEffect(() => {
    initGrid();
  }, [grid]);

  return (
    <>
      <Head>
        <title>Auto MineSweeper</title>
      </Head>
      <GridInput grid={grid} setGrid={setGrid} initGrid={initGrid} />
      <MineGrid col={grid.col} row={grid.row} gridState={gridState} />
    </>
  );
};

export default Home;
