import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Digit } from './Digit';
import { getDigitsFromNUmber } from './utils';

const RetroDigitsStyled = styled.div`
  display: flex;
  width: fit-content;
`;

interface IRetroDigits {
  value: number;
}

function RetroDigits({ value }: IRetroDigits) {
  const [digits, setDigits] = useState<string[]>([]);

  useEffect(() => {
    const newDigits = getDigitsFromNUmber(value);
    setDigits(newDigits);
  }, [value]);

  return (
    <RetroDigitsStyled>
      <Digit value={Number(digits[0]) || 0} />
      <Digit value={Number(digits[1]) || 0} />
      <Digit value={Number(digits[2]) || 0} />
    </RetroDigitsStyled>
  );
}

export { RetroDigits };
