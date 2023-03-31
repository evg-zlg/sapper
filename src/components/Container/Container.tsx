import { ReactElement } from 'react';
import styled from 'styled-components';

export const ContainerStyled = styled.div`
  width: 100%;
  height: 100%;
  min-width: 320px;
  margin: 0 auto;
`;

interface IContainer {
  children: ReactElement;
}

function Container({ children }: IContainer) {
  return <ContainerStyled>{children}</ContainerStyled>;
}

export { Container };
