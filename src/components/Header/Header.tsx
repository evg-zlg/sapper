import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { baseTheme } from '../../styles/theme';
import { APPRoute } from '../../const/const';
import { Container } from '../Container';

const HeaderStyled = styled.header`
  padding: 0 5px;
  height: 80px;
  @media (max-height: 855px) {
    height: 60px;
  }
  @media (max-height: 796px) {
    height: 40px;
  }
`;

const Nav = styled.nav`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const Ul = styled.ul`
  display: flex;
  gap: 10px;
`;

const Li = styled.li`
  list-style-type: none;

  a {
    text-decoration: none;
    font-size: 1.75rem;
    color: inherit;
    padding: 5px 10px;
    border-radius: 3px;
    transition: all 0.3s ease 0s;
    &:hover {
      background-color: ${baseTheme.colors.accentPrimary};
      color: ${baseTheme.colors.lightPrimary};
    }

    @media (${baseTheme.brakePoint.sm}) {
      font-size: 1.25rem;
    }
  }
`;

function Header() {
  return (
    <HeaderStyled>
      <Container>
        <Nav>
          <Ul>
            <Li>
              <Link to={APPRoute.main}>Game</Link>
            </Li>
            <Li>
              <Link to={APPRoute.winners}>Winners</Link>
            </Li>
          </Ul>
        </Nav>
      </Container>
    </HeaderStyled>
  );
}

export { Header };
