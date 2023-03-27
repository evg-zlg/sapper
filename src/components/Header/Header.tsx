import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { APPRoute } from '../../const/const';
import { Container } from '../Container';

const HeaderStyled = styled.header`
  margin: 0 0 10px 0;
  padding: 0 5px;
  height: 80px;
  border-bottom: 1px solid var(--primary-accent-color);
`;

const Nav = styled.nav`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;

  @media (max-width: 725px) {
    justify-content: space-between;
  }
`;

const Ul = styled.ul`
  display: flex;
  gap: 10px;
`;

const Li = styled.li`
  list-style-type: none;

  a {
    text-decoration: none;
    font-size: 1.5rem;
    color: inherit;
    padding: 5px 10px;
    border-radius: 3px;
    transition: all 0.2s ease 0s;
    &:hover {
      background-color: var(--bg-link-color);
    }

    @media (max-width: 425px) {
      font-size: 1rem;
    }
  }
`;

const Button = styled.button`
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 3px;
  border: none;
  background-color: var(--primary-accent-color);
  color: var(--primary-light-color);
  font-size: 1.25rem;
  transition: all 0.1s ease 0s;
  &:hover {
    box-shadow: 2px -2px 5px var(--shadow-light-color),
      0px 2px 5px var(--shadow-light-color),
      -2px 0px 5px var(--shadow-light-color);
  }

  @media (max-width: 425px) {
    font-size: 1rem;
  }
`;

function Header() {
  return (
    <Container>
      <HeaderStyled>
        <Nav>
          <Ul>
            <Li>
              <Link to={APPRoute.main}>Game</Link>
            </Li>
            <Li>
              <Link to={APPRoute.winners}>Winners</Link>
            </Li>
          </Ul>
          <Button type="button">Options and restart</Button>
        </Nav>
      </HeaderStyled>
    </Container>
  );
}

export { Header };
