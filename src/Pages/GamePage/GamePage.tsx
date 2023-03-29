import { Container } from '../../components/Container';
import { GameBoard } from '../../components/GameBoard';

function GamePage() {
  return (
    <Container>
      <main>
        <GameBoard />
      </main>
    </Container>
  );
}

export { GamePage };
