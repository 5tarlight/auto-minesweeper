import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import GridInput, { Grid } from "../components/GridInput";

const Home: NextPage = () => {
  const [grid, setGrid] = useState<Grid>({ row: 0, col: 0 });

  return (
    <>
      <Head>
        <title>Auto MineSweeper</title>
      </Head>
      <GridInput grid={grid} setGrid={setGrid} />
    </>
  );
};

export default Home;
