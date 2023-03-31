import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useAppSelector } from '../../hooks/redux';

import { ItemTable } from './ItemTable';
import { TitleTable } from './TitleTable';
import { IWinner } from '../../types/types';

const Wrapper = styled.section``;

const NoWinners = styled.h2`
  text-align: center;
`;

const Table = styled.div`
  display: grid;
  grid-template-rows: auto;
  max-width: 500px;
`;

function WinnersTable() {
  const { winners } = useAppSelector((state) => state.winnersState);
  const [winnersSort, setWinnersSort] = useState<IWinner[]>([]);
  const countItems = 10;

  useEffect(() => {
    if (winners.length === 0) {
      return;
    }
    const newWinners = winners.slice();
    newWinners
      .sort((a, b) => (Number(a.timeLeft) > Number(b.timeLeft) ? 1 : -1))
      .splice(countItems);

    setWinnersSort(newWinners);
  }, [winners]);

  return (
    <Wrapper>
      {winners.length === 0 && <NoWinners>No saved results...</NoWinners>}
      {winners.length > 0 && (
        <Table>
          <TitleTable />
          {winnersSort.map((winner, index) => (
            <ItemTable key={winner.id} winner={winner} index={index + 1} />
          ))}
        </Table>
      )}
    </Wrapper>
  );
}

export { WinnersTable };
