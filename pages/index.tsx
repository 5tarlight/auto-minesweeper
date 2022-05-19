import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import MineGrid, { GridState } from "../components/MineGrid";
import GridInput, { Grid } from "../components/GridInput";

const Home: NextPage = () => {
  const [grid, setGrid] = useState<Grid>({ row: 10, col: 10 });
  const [gridState, setGridState] = useState<GridState[][]>([]);

  useEffect(() => {
    const state: GridState[][] = [];
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
      state.push(row);
    }
    setGridState(state);
  }, [grid]);

  return (
    <>
      <Head>
        <title>Auto MineSweeper</title>
      </Head>
      <GridInput grid={grid} setGrid={setGrid} />
      <MineGrid col={grid.col} row={grid.row} gridState={gridState} />
    </>
  );
};

export default Home;
