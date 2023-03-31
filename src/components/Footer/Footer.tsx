import styled from 'styled-components';
import { baseTheme } from '../../styles/theme';

import ghIcon from './icons/github-icon.svg';
import quizIcon from './icons/quiz-icon.png';

import { Container } from '../Container';

const FooterStyled = styled.footer`
  height: 80px;
  border-top: 1px solid ${baseTheme.colors.accentPrimary};
  > div {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 50px;
  }
`;

const LinkFooter = styled.a`
  font-size: 0;
  display: block;
  width: 50px;
  height: 50px;
  background-size: 50px 50px;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const GitHubLogo = styled(LinkFooter)`
  background-image: url(${ghIcon});
`;

const AnotherGame = styled(LinkFooter)`
  background-image: url(${quizIcon});
  width: 80px;
  background-size: contain;
`;

const Copyright = styled.p`
  font-size: 18;
  font-weight: 600;
`;

function Footer() {
  return (
    <FooterStyled>
      <Container>
        <>
          <GitHubLogo
            href="https://github.com/evg-zlg/sapper"
            target="_blank"
            rel="noreferrer"
          >
            github evg-zlg
          </GitHubLogo>
          <Copyright>&copy; 2023</Copyright>

          <AnotherGame
            href="https://evg-zlg.github.io/sound-quiz/songbird/dist/"
            target="_blank"
            rel="noreferrer"
          >
            play sound quiz
          </AnotherGame>
        </>
      </Container>
    </FooterStyled>
  );
}

export { Footer };
