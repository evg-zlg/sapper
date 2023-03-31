import { css } from 'styled-components';

import { baseTheme } from '../theme';
import { TBorderShadowType } from '../../types/types';

const insideStyled = css`
  border-top-color: ${baseTheme.colors.borderSecondary};
  border-left-color: ${baseTheme.colors.borderSecondary};
  border-right-color: ${baseTheme.colors.borderPrimary};
  border-bottom-color: ${baseTheme.colors.borderPrimary};
`;
const outsideStyled = css`
  border-top-color: ${baseTheme.colors.borderPrimary};
  border-left-color: ${baseTheme.colors.borderPrimary};
  border-right-color: ${baseTheme.colors.borderSecondary};
  border-bottom-color: ${baseTheme.colors.borderSecondary};
`;

const cellStyled = css`
  border-width: 1px;
  border-radius: 0px;
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

interface IBorderWithShadow {
  variantBorder: TBorderShadowType;
}

const BorderWithShadow = ({
  variantBorder,
}: IBorderWithShadow) => css<IBorderWithShadow>`
  border-radius: 2px;
  border-width: 3px;
  border-style: solid;
  ${variantBorder === 'big-inside' ? insideStyled : ''}
  ${variantBorder === 'big-outside' ? outsideStyled : ''}
  ${variantBorder === 'cell' ? cellStyled : ''}
  ${variantBorder === 'small-outside' ? formOutsideStyled : ''}
  ${variantBorder === 'small-inside' ? formInsideStyled : ''}
  ${variantBorder === 'none' ? noneBorder : ''}
`;

export { BorderWithShadow };
