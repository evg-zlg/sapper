import { ReactElement } from 'react';
import styled, { css } from 'styled-components';
import { TFrameType } from '../../types/types';

interface IFrameStyled {
  type: TFrameType;
}

const insideStyled = css`
  border-top-color: var(--border-secondary-color);
  border-left-color: var(--border-secondary-color);
  border-right-color: var(--border-primery-color);
  border-bottom-color: var(--border-primery-color);
`;
const outsideStyled = css`
  border-top-color: var(--border-primery-color);
  border-left-color: var(--border-primery-color);
  border-right-color: var(--border-secondary-color);
  border-bottom-color: var(--border-secondary-color);
`;

const noneBorder = css`
  border: none;
`;

const FrameStyled = styled.div<IFrameStyled>`
  width: fit-content;
  height: fit-content;
  /* margin: auto auto; */
  border-radius: 2px;
  border-width: 4px;
  border-style: solid;
  ${(props) => (props.type === 'inside' ? insideStyled : '')}
  ${(props) => (props.type === 'outside' ? outsideStyled : '')}
  ${(props) => (props.type === 'none' ? noneBorder : '')}
`;

interface IFrame {
  type: TFrameType;
  children: ReactElement;
}

function Frame({ type, children }: IFrame) {
  return <FrameStyled type={type}>{children}</FrameStyled>;
}

export { Frame };
