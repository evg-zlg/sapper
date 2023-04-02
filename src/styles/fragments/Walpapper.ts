import styled from 'styled-components';
import { baseTheme } from '../theme';

import bgImg from '../../assets/bg-game-image.jpg';

export const Walpapper = styled.div`
  position: fixed;
  top: 0px;
  bottom: 0px;
  left: 0;
  right: 0;
  z-index: -1;
  background-image: url(${bgImg});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center bottom;

  @media (${baseTheme.brakePoint.xl}), (max-height: 918px) {
    background-size: cover;
    background-position: left bottom;
  }
`;
