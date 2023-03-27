import { useEffect, useState } from "react";
import styled from "styled-components";
import { boardSize } from "../../const/const";
import { createGrid } from "./utils";

interface IBoardProps {
  col: number;
  row: number;
}
const Board = styled.section<IBoardProps>`
  border-radius: 5px;
  border: 1px solid var(--primary-dark-color);
`;

function GameBoard() {
  const [size] = useState(boardSize[0]);
  const [gameGrid] = useState(() => createGrid(size));

  useEffect( () => {
    console.log(gameGrid);
  }, [size]);

  return (
    <>
      <header>time, button for restart, and someone else</header>
      <Board col={size.col} row={size.row} />
    </>
  );
}

export { GameBoard };
