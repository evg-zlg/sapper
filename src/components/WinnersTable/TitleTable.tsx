import styled from 'styled-components';

import { baseTheme } from '../../styles/theme';

const Item = styled.div`
  display: grid;
  grid-template-columns: 2fr 4fr 2fr 3fr;
`;

const ItemElement = styled.p`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  padding: 5px 0;
  border-bottom: 2px solid ${baseTheme.colors.accentPrimary};
  border-top: 2px solid ${baseTheme.colors.accentPrimary};

`;

function TitleTable() {
  return (
    <Item>
      <ItemElement>№</ItemElement>
      <ItemElement>Size</ItemElement>
      <ItemElement>Bombs</ItemElement>
      <ItemElement>Time</ItemElement>
    </Item>
  );
}

export { TitleTable };
