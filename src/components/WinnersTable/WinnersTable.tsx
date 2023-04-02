import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { useAppSelector } from '../../hooks/redux';

import { ItemTable } from './ItemTable';
import { TitleTable } from './TitleTable';
import { IWinner } from '../../types/types';
import { baseTheme } from '../../styles/theme';
import { BorderWithShadow } from '../../styles/fragments/BorderWithShadow';

const Wrapper = styled.section`
  padding: 15px;
  background-color: ${baseTheme.colors.bgPrimery};
  ${BorderWithShadow};
`;

const Title = styled.h1`
  margin: 0 0 20px 0;
  text-align: center;
  @media (${baseTheme.brakePoint.sm}) {
    font-size: 1.5rem;
  }
`;

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
    <Wrapper variantBorder="big-outside">
      {winners.length === 0 && <NoWinners>No saved results...</NoWinners>}
      {winners.length > 0 && (
        <>
          <Title>Best results</Title>
          <Table>
            <TitleTable />
            {winnersSort.map((winner, index) => (
              <ItemTable key={winner.id} winner={winner} index={index + 1} />
            ))}
          </Table>
        </>
      )}
    </Wrapper>
  );
}

export { WinnersTable };
