import styled from 'styled-components';

const Item = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr 2fr 3fr;
`;

const ItemElement = styled.p`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
  padding: 5px 0;
  border-bottom: 1px solid brown;

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
