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
  margin: 0 0 20px 0;
`;

function WinnersPage() {
  return (
    <Main>
      <Container>
        <>
          <Title>Best results</Title>
          <WinnersTable />
        </>
      </Container>
    </Main>
  );
}

export { WinnersPage };
