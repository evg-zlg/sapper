import styled from 'styled-components';
import { Container } from '../../components/Container';
import { GameBoard } from '../../components/GameBoard';
import { GameMenu } from '../../components/GameMenu';
import { Walpapper } from '../../styles/components/Walpapper';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  padding: 60px 0 20px 0;
`;



function GamePage() {
  return (
    <Main>
      <Container>
        <>
          <Walpapper />
          <GameMenu />
          <GameBoard />
        </>
      </Container>
    </Main>
  );
}

export { GamePage };
