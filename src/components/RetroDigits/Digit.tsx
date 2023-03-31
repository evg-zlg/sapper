import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import { baseTheme } from '../../styles/theme';

//      0
//     ---
//  5 |   | 1
//    | 6 |
//     ---
//  4 | 7 | 2
//    | 3 |
//     ---

const DigitStyled = styled.div`
  width: 30px;
  height: 54px;
  background-color: ${baseTheme.colors.darkPrimary};
  position: relative;
`;

const Variant0 = css`
  top: 3px;
  left: 4px;
  transform: rotate();
`;
const Variant1 = css`
  top: 13px;
  right: -6px;
  transform: rotate(90deg);
`;

const Variant2 = css`
  top: 36px;
  right: -6px;
  transform: rotate(90deg);
`;

const Variant3 = css`
  bottom: 3px;
  left: 4px;
  transform: rotate(180deg);
`;
const Variant4 = css`
  top: 36px;
  left: -6px;
  transform: rotate(-90deg);
`;
const Variant5 = css`
  top: 13px;
  left: -6px;
  transform: rotate(-90deg);
`;

const Variant6 = css`
  top: 24px;
  left: 4.5px;
  transform: rotate(180deg);
  border-top-width: 3.5px;
`;
const Variant7 = css`
  top: 27px;
  left: 4.5px;
  transform: rotate(0deg);
  border-top-width: 3.5px;
`;

interface IDigitElement {
  variant: number;
}

const DigitElement = styled.div<IDigitElement>` 
  border-top: 6px solid red;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  height: 0;
  width: 22px;
  position: absolute;
  ${(props) => props.variant === 0 ? Variant0 : ''}
  ${(props) => props.variant === 1 ? Variant1 : ''}
  ${(props) => props.variant === 2 ? Variant2 : ''}
  ${(props) => props.variant === 3 ? Variant3 : ''}
  ${(props) => props.variant === 4 ? Variant4 : ''}
  ${(props) => props.variant === 5 ? Variant5 : ''}
  ${(props) => props.variant === 6 ? Variant6 : ''}
  ${(props) => props.variant === 7 ? Variant7 : ''}

`;

interface IDigit {
  value: number;
}

function Digit({ value }: IDigit) {
  const [activeElements, setActiveElements] = useState<number[]>([]);
  const opacity = 0.2;

  useEffect(() => {
    if (value === 0) setActiveElements([0, 1, 2, 3, 4, 5]);
    if (value === 1) setActiveElements([1, 2]);
    if (value === 2) setActiveElements([0, 1, 6, 7, 4, 3]);
    if (value === 3) setActiveElements([0, 1, 2, 3, 6, 7]);
    if (value === 4) setActiveElements([5, 6, 7, 1, 2]);
    if (value === 5) setActiveElements([0, 5, 6, 7, 2, 3]);
    if (value === 6) setActiveElements([0, 5, 6, 7, 4, 3, 2]);
    if (value === 7) setActiveElements([0, 1, 2]);
    if (value === 8) setActiveElements([0, 1, 2, 3, 4, 5, 6, 7]);
    if (value === 9) setActiveElements([0, 1, 2, 3, 5, 6, 7]);
  },[value]);
  
  return (
    <DigitStyled>
      <DigitElement variant={0} style={{opacity: activeElements.includes(0) ? 1 : opacity}}/>
      <DigitElement variant={1} style={{opacity: activeElements.includes(1) ? 1 : opacity}}/>
      <DigitElement variant={2} style={{opacity: activeElements.includes(2) ? 1 : opacity}}/>
      <DigitElement variant={3} style={{opacity: activeElements.includes(3) ? 1 : opacity}}/>
      <DigitElement variant={4} style={{opacity: activeElements.includes(4) ? 1 : opacity}}/>
      <DigitElement variant={5} style={{opacity: activeElements.includes(5) ? 1 : opacity}}/>
      <DigitElement variant={6} style={{opacity: activeElements.includes(6) ? 1 : opacity}}/>
      <DigitElement variant={7} style={{opacity: activeElements.includes(7) ? 1 : opacity}}/>
    </DigitStyled>
  );
}

export { Digit };
