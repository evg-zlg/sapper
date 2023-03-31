import styled from 'styled-components';
import { IWinner } from '../../types/types';

const Item = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 2fr 3fr;
`;

const ItemElement = styled.p`
  font-size: 18px;
  font-weight: 400;
  text-align: center;
  padding: 5px 0;
  border-bottom: 1px solid gray;
`;

interface IItemTable {
  winner: IWinner;
  index: number;
}

function ItemTable({ winner, index }: IItemTable) {
  return (
    <Item>
      <ItemElement>{index}</ItemElement>
      <ItemElement>
        {`${winner.boardParams.col} x ${winner.boardParams.row}`}
      </ItemElement>
      <ItemElement>{winner.boardParams.bombs}</ItemElement>
      <ItemElement>{winner.timeLeft}</ItemElement>
    </Item>
  );
}

export { ItemTable };
