import { Container } from '../../components/Container';
import { GameBoard } from '../../components/GameBoard';

function GamePage() {
  return (
    <Container>
      <main>
        <h1>Find all the bombs</h1>
        <GameBoard />
      </main>
    </Container>
  );
}

export { GamePage };
