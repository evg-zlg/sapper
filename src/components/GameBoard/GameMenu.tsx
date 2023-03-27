import styled from "styled-components";

const Menu = styled.menu`
  margin: 0 auto 10px;
  width: fit-content;
  display: flex;
  gap: 20px;
`;

const Button = styled.button`
  padding: 5px 10px;
  cursor: pointer;
`;

function GameMenu() {
  return (
    <Menu>
      <Button type="button">easy</Button>
      <Button type="button">normal</Button>
      <Button type="button">hard</Button>
    </Menu>
  )
}

export { GameMenu };
