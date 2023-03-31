import styled from 'styled-components';
import { Container } from '../../components/Container';
import { WinnersTable } from '../../components/WinnersTable';

const Title = styled.h1`
  text-align: center;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

function WinnersPage() {
  return (
    <Container>
      <Main>
        <Title>Best results</Title>
        <WinnersTable />
      </Main>
    </Container>
  );
}

export { WinnersPage };
