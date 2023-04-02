import styled from 'styled-components';

import { WinnersTable } from '../../components/WinnersTable';
import { Walpapper } from '../../styles/fragments/Walpapper';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 40px 0 20px 0;
`;

function WinnersPage() {
  return (
    <Main>
      <Walpapper />
      <WinnersTable />
    </Main>
  );
}

export { WinnersPage };
