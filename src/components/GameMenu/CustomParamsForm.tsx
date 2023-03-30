import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from 'react';
import styled from 'styled-components';
import { Frame } from '../Frame';

import { useAppDispatch } from '../../hooks/redux';
import { changeLevel } from '../../store/reducers/gameSlice';
import { IBoardParams, TLevelType } from '../../types/types';

const CustomParamsModal = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  z-index: 10;
`;

const OutClickZone = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--bg-modal-color);
`;

const CustomParamsFormStyled = styled.form`
  width: 352px;
  padding: 10px;
  position: relative;
  background-color: var(--bg-primery-color);
  display: flex;
  flex-direction: column;
  gap: 10px;
  
`;

const TitleForm = styled.h2`
  text-align: center;
  border-bottom: 1px solid var(--primary-accent-color);
`;

const GridTemplate = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 3fr;
  gap: 10px;
  grid-template-rows: 1fr 1fr 1fr;
  padding: 0 0 10px 0;
  border-bottom: 1px solid var(--primary-accent-color);

`;

const Label = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
`;

const Input = styled.input`
  height: 30px;
  width: 100%;
  outline: none;
`;

const Control = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.input`
  border: none;
  padding: 5px 10px;
  background-color: var(--bg-primery-color);
  cursor: pointer;
`;

interface ICustomParamsForm {
  setShowCustomParamsForm: Dispatch<SetStateAction<boolean>>;
}

function CustomParamsForm({ setShowCustomParamsForm }: ICustomParamsForm) {
  const dispatch = useAppDispatch();

  const [colValue, setColValue] = useState('');
  const [rowValue, setRowValue] = useState('');
  const [bombValue, setBombValue] = useState('');
  const [allValid] = useState(true);

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();
    if (allValid) {
      const boardParams: IBoardParams = {
        bombs: Number(bombValue),
        col: Number(colValue),
        row: Number(rowValue),
      };
      const currentLevel: TLevelType = 'custom';
      dispatch(changeLevel({ currentLevel, boardParams }));
      setShowCustomParamsForm(false);
    }
  };

  const resetFormHandler = () => {
    setShowCustomParamsForm(false);
  };

  const colInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!Number(e.target.value)) {
      return;
    }
    setColValue(e.target.value);
  };

  const rowInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!Number(e.target.value)) {
      return;
    }
    setRowValue(e.target.value);
  };
  const bombInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!Number(e.target.value)) {
      return;
    }
    setBombValue(e.target.value);
  };

  return (
    <CustomParamsModal>
      <OutClickZone onClick={() => setShowCustomParamsForm(false)} />
      <Frame variant="form-outside">
        <CustomParamsFormStyled
          onSubmit={submitFormHandler}
          onReset={resetFormHandler}
        >
          <TitleForm>Game options </TitleForm>
          <GridTemplate>
            <Label htmlFor="input-col">Width:</Label>
            <Input
              type="text"
              id="input-row"
              value={rowValue}
              onChange={rowInputHandler}
            />
            <Label>(min - 10, max - 50)</Label>

            <Label htmlFor="input-col">Height:</Label>
            <Input
              type="text"
              id="input-col"
              value={colValue}
              onChange={colInputHandler}
            />
            <Label>(min - 10, max - 25)</Label>

            <Label htmlFor="input-bomb">Bombs:</Label>
            <Input
              type="text"
              id="input-bomb"
              value={bombValue}
              onChange={bombInputHandler}
            />
            <Label>(min - 1, max - 999)</Label>
          </GridTemplate>

          <Control>
            <Frame variant="form-outside">
              <Button type="submit" value="New game" />
            </Frame>
            <Frame variant="form-outside">
              <Button type="reset" value="Cancel" />
            </Frame>
          </Control>
        </CustomParamsFormStyled>
      </Frame>
    </CustomParamsModal>
  );
}

export { CustomParamsForm };
