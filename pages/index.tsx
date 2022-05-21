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
          near: -1,
        });
      }
      tempGridState.push(row);
    }

    for (let i = 0; i < grid.row * grid.col * 0.15; i++) {
      const row = Math.floor(Math.random() * grid.row);
      const col = Math.floor(Math.random() * grid.col);
      tempGridState[row][col].type = "mine";
    }

    const { row, col } = grid;
    for (let i = 0; i < row; i++) {
      if (!tempGridState[i]) continue;
      for (let j = 0; j < col; j++) {
        if (
          !tempGridState[i] ||
          !tempGridState[i][j] ||
          (i > 0 &&
            (!tempGridState[i - 1] ||
              !tempGridState[i - 1][j] ||
              (j > 0 && !tempGridState[i - 1][j - 1]) ||
              (j < col - 1 && !tempGridState[i - 1][j + 1]))) ||
          (j > 0 && !tempGridState[i][j - 1]) ||
          (j < col - 1 && !tempGridState[i][j + 1]) ||
          (i < row - 1 &&
            (!tempGridState[i + 1] ||
              !tempGridState[i + 1][j] ||
              (j > 0 && !tempGridState[i + 1][j - 1]) ||
              (j < col - 1 && !tempGridState[i + 1][j + 1]))) ||
          tempGridState[i][j].type === "mine"
        )
          continue;

        let count = 0;

        if (i > 0 && j > 0 && tempGridState[i - 1][j - 1].type === "mine")
          // 왼쪽위
          count++;
        if (i > 0 && tempGridState[i - 1][j].type === "mine") count++; // 위
        if (
          i > 0 &&
          j < col - 1 &&
          tempGridState[i - 1][j + 1].type === "mine" // 오른쪽위
        )
          count++;
        if (j > 0 && tempGridState[i][j - 1].type === "mine") count++; // 왼쪽
        if (j < col - 1 && tempGridState[i][j + 1].type === "mine") count++; //오른쪽
        if (
          i < row - 1 &&
          j > 0 &&
          tempGridState[i + 1][j - 1].type === "mine" // 왼쪽아래
        )
          count++;
        if (i < row - 1 && tempGridState[i + 1][j].type === "mine") count++; //아래
        if (
          i < row - 1 &&
          j < col - 1 &&
          tempGridState[i + 1][j + 1].type === "mine" // 오른쪽아래
        )
          count++;

        tempGridState[i][j].near = count;
      }
    }

    setGridState(tempGridState);
  };

  const revealCell = (row: number, col: number) => {
    if (gridState[row][col].action !== "default") return;

    const tempGridState = [...gridState];
    tempGridState[row][col].action = "reveal";

    if (tempGridState[row][col].type === "safe") setGridState(tempGridState);
  };

  const toggleFlag = (row: number, col: number) => {
    if (gridState[row][col].action === "reveal") return;

    const tempGridState = [...gridState];
    tempGridState[row][col].action =
      tempGridState[row][col].action === "flag" ? "default" : "flag";

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
      <MineGrid
        col={grid.col}
        row={grid.row}
        gridState={gridState}
        revealCell={revealCell}
        toggleFlag={toggleFlag}
      />
    </>
  );
};

export default Home;
