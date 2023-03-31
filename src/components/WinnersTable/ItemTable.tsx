import styled from 'styled-components';

import { baseTheme } from '../../styles/theme';
import { IWinner } from '../../types/types';

const Item = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr 2fr 3fr;
`;

const ItemElement = styled.p`
  font-size: 18px;
  font-weight: 400;
  text-align: center;
  padding: 5px 0;
  border-bottom: 1px solid ${baseTheme.colors.borderSecondary};
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
