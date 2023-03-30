import styled from 'styled-components';
import { Container } from '../../components/Container';
import { GameBoard } from '../../components/GameBoard';
import { GameMenu } from '../../components/GameMenu';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

function GamePage() {
  return (
    <Container>
      <Main>
        <GameMenu />
        <GameBoard />
      </Main>
    </Container>
  );
}

export { GamePage };
