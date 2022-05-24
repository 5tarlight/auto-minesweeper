import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import MineGrid, { GridState } from "../components/MineGrid";
import GridInput, { GameStatus, Grid } from "../components/GridInput";

const Bfs: NextPage = () => {
  const [grid, setGrid] = useState<Grid>({ row: 10, col: 10 });
  const [gridState, setGridState] = useState<GridState[][]>([]);
  const [status, setStatus] = useState<GameStatus>("playing");
  const [timer, setTimer] = useState<number>(0);

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

    setStatus("playing");
    setTimer(0);
    setGridState(tempGridState);
  };

  const revealCellClick = (row: number, col: number) => {
    if (status !== "playing") return;
    revealCell(row, col);

    if (status === "playing" && gridState[row][col].near == 0) {
      revealNearCell(row - 1, col);
      revealNearCell(row, col - 1);
      revealNearCell(row, col + 1);
      revealNearCell(row + 1, col);

      revealCellWithoutEmpty(row - 1, col - 1);
      revealCellWithoutEmpty(row - 1, col);
      revealCellWithoutEmpty(row - 1, col + 1);
      revealCellWithoutEmpty(row, col - 1);
      revealCellWithoutEmpty(row, col + 1);
      revealCellWithoutEmpty(row + 1, col - 1);
      revealCellWithoutEmpty(row + 1, col);
      revealCellWithoutEmpty(row + 1, col + 1);
    }
  };

  const revealCell = (row: number, col: number) => {
    if (row < 0 || row >= grid.row || col < 0 || col >= grid.col) return;
    if (gridState[row][col].action !== "default") return;

    const tempGridState = [...gridState];
    tempGridState[row][col].action = "reveal";

    if (tempGridState[row][col].type === "safe") setGridState(tempGridState);
    else if (tempGridState[row][col].type === "mine") {
      setStatus("lose");

      // reveal all mine
      for (let i = 0; i < grid.row; i++) {
        for (let j = 0; j < grid.col; j++) {
          if (gridState[i][j].type === "mine") {
            tempGridState[i][j].action = "reveal";
          }
        }
      }

      setGridState(tempGridState);
    }
  };

  const revealCellWithoutEmpty = (row: number, col: number) => {
    if (row < 0 || row >= grid.row || col < 0 || col >= grid.col) return;
    if (gridState[row][col].action !== "default") return;
    if (gridState[row][col].near === 0) return;

    const tempGridState = [...gridState];
    tempGridState[row][col].action = "reveal";

    if (tempGridState[row][col].type === "safe") setGridState(tempGridState);
  };

  const revealNearCell = (row: number, col: number) => {
    if (row < 0 || col < 0 || row >= grid.row || col >= grid.col) return;
    if (gridState[row][col].action !== "default") return;

    if (gridState[row][col].near == 0) {
      revealCellClick(row, col);
    }
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

  useEffect(() => {
    const time = setInterval(() => {
      if (status === "playing") {
        setTimer((timer * 100 + 1) / 100);
      }
    }, 10);

    return () => {
      clearInterval(time);
    };
  }, [timer]);

  useEffect(() => {
    // Check win
    if (status === "playing") {
      let count = 0;
      let mines = 0;

      gridState.forEach((e) =>
        e
          .filter((v) => v.action === "reveal" && v.type === "safe")
          .forEach((v) => count++)
      );
      gridState.forEach((e) => {
        e.filter((v) => v.type === "mine").forEach((v) => mines++);
      });

      if (count === grid.row * grid.col - mines) {
        setStatus("win");
      }
    }
  }, [gridState]);

  return (
    <>
      <Head>
        <title>Auto MineSweeper</title>
      </Head>
      <GridInput
        grid={grid}
        setGrid={setGrid}
        initGrid={initGrid}
        leftMines={Math.floor(grid.row * grid.col * 0.15)}
        status={status}
        timer={timer}
      />

      <MineGrid
        col={grid.col}
        row={grid.row}
        gridState={gridState}
        revealCell={revealCellClick}
        toggleFlag={toggleFlag}
      />
    </>
  );
};

export default Bfs;
