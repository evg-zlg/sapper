import { ReactElement } from 'react';
import styled, { css } from 'styled-components';

import { baseTheme } from '../../styles/theme';
import { TFrameType } from '../../types/types';

interface IFrameStyled {
  variant: TFrameType;
}

const insideStyled = css`
  border-top-color: ${baseTheme.colors.borderSecondary};
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

const cellStyled = css`
  ${outsideStyled}
  width: 100%;
  height: 100%;
`;

const formOutsideStyled = css`
  ${outsideStyled}
  border-width: 2px;
  transition: all 0.2s ease 0s;
  z-index: 1;
`;

const formInsideStyled = css`
  ${insideStyled}
  border-width: 2px;
  transition: all 0.2s ease 0s;
  z-index: 1;
`;

const noneBorder = css`
  border: none;
`;

const FrameStyled = styled.div<IFrameStyled>`
  width: fit-content;
  height: fit-content;
  border-radius: 2px;
  border-width: 3px;
  border-style: solid;
  ${(props) => (props.variant === 'inside' ? insideStyled : '')}
  ${(props) => (props.variant === 'outside' ? outsideStyled : '')}
  ${(props) => (props.variant === 'cell' ? cellStyled : '')}
  ${(props) => (props.variant === 'form-outside' ? formOutsideStyled : '')}
  ${(props) => (props.variant === 'form-inside' ? formInsideStyled : '')}
  ${(props) => (props.variant === 'none' ? noneBorder : '')}
`;

interface IFrame {
  variant: TFrameType;
  children: ReactElement | string | number;
}

function Frame({ variant, children }: IFrame) {
  return <FrameStyled variant={variant}>{children}</FrameStyled>;
}

export { Frame };
