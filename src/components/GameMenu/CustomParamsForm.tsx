import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import styled from 'styled-components';

import { useAppDispatch } from '../../hooks/redux';
import { changeLevel } from '../../store/reducers/gameSlice';

import { baseTheme } from '../../styles/theme';
import { IBoardParams, TLevelType } from '../../types/types';
import { minMaxFormValues } from '../../const/const';
import { checkMinMaxValid } from './utils';
import { BorderWithShadow } from '../../styles/fragments/BorderWithShadow';

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
  background-color: ${baseTheme.colors.bgModal};
`;

const CustomParamsFormStyled = styled.form`
  width: 352px;
  padding: 10px;
  position: relative;
  background-color: ${baseTheme.colors.bgPrimery};
  display: flex;
  flex-direction: column;
  gap: 10px;
  ${BorderWithShadow}
`;

const TitleForm = styled.h2`
  text-align: center;
  border-bottom: 1px solid ${baseTheme.colors.accentPrimary};
`;

const GridTemplate = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 3fr;
  gap: 10px;
  grid-template-rows: 1fr 1fr 1fr;
  padding: 0 0 10px 0;
  border-bottom: 1px solid ${baseTheme.colors.accentPrimary};
`;

const Label = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-size: 18px;
`;

interface IInput {
  valid: boolean;
}

const Input = styled.input<IInput>`
  width: 100%;
  padding: 5px 5px;
  outline: none;
  border: 2px solid transparent;
  border-color: ${(props) =>
    props.valid ? 'transparent' : `${baseTheme.colors.digitPrimery}`};
`;

const Control = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Button = styled.input`
  border: none;
  padding: 5px 10px;
  background-color: ${baseTheme.colors.bgPrimery};
  cursor: pointer;
  ${BorderWithShadow}
`;

const LabelError = styled.p`
  font-size: 20px;
  font-weight: 600;
  color: ${baseTheme.colors.digitPrimery};
  position: absolute;
  right: 25px;
`;

interface ICustomParamsForm {
  setShowCustomParamsForm: Dispatch<SetStateAction<boolean>>;
}

function CustomParamsForm({ setShowCustomParamsForm }: ICustomParamsForm) {
  const dispatch = useAppDispatch();

  const [showValidError, setShowValidError] = useState(false);

  const [colValue, setColValue] = useState('');
  const [colValid, setColValid] = useState(true);

  const [rowValue, setRowValue] = useState('');
  const [rowValid, setRowValid] = useState(true);

  const [bombValue, setBombValue] = useState('');
  const [bombMax, setBombMax] = useState<number>(0);
  const [bombValid, setBombValid] = useState(true);

  const submitFormHandler = (e: FormEvent) => {
    e.preventDefault();

    if (
      colValid &&
      rowValid &&
      bombValid &&
      colValue !== '' &&
      rowValue !== '' &&
      bombValue !== ''
    ) {
      const boardParams: IBoardParams = {
        bombs: Number(bombValue),
        col: Number(colValue),
        row: Number(rowValue),
      };
      const currentLevel: TLevelType = 'custom';
      dispatch(changeLevel({ currentLevel, boardParams }));
      setShowCustomParamsForm(false);
    } else {
      setShowValidError(true);
    }
  };

  const resetFormHandler = () => {
    setShowCustomParamsForm(false);
  };

  const colInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!Number(e.target.value) && e.target.value !== '') {
      return;
    }

    setColValid(
      checkMinMaxValid(
        minMaxFormValues.colMin,
        minMaxFormValues.colMax,
        e.target.value,
      ),
    );

    setBombValid(true);
    setShowValidError(false);
    setColValue(e.target.value);
  };

  const rowInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!Number(e.target.value) && e.target.value !== '') {
      return;
    }

    setRowValid(
      checkMinMaxValid(
        minMaxFormValues.rowMin,
        minMaxFormValues.rowMax,
        e.target.value,
      ),
    );

    setBombValid(true);
    setShowValidError(false);
    setRowValue(e.target.value);
  };
  const bombInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (!Number(e.target.value) && e.target.value !== '') {
      return;
    }

    setBombValid(
      checkMinMaxValid(minMaxFormValues.bombMin, bombMax, e.target.value),
    );

    setShowValidError(false);
    setBombValue(e.target.value);
  };

  const keyDownFormHandler = (e: KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Escape') {
      setShowCustomParamsForm(false);
    }
  };

  useEffect(() => {
    // additinal valid bombs count (20% from count cells)
    const countCells = Number(colValue) * Number(rowValue);
    const newBombMax = Math.trunc(countCells * 0.2);
    if (newBombMax > minMaxFormValues.bombMax || newBombMax < 1) {
      setBombMax(minMaxFormValues.bombMax);
      return;
    }
    setBombMax(newBombMax);
  }, [colValue, rowValue]);

  return (
    <CustomParamsModal>
      <OutClickZone onClick={() => setShowCustomParamsForm(false)} />
      <CustomParamsFormStyled
        variantBorder="small-outside"
        onSubmit={submitFormHandler}
        onReset={resetFormHandler}
        onKeyDown={keyDownFormHandler}
      >
        <TitleForm>Game options</TitleForm>
        <GridTemplate>
          <Label htmlFor="input-row">Width:</Label>
          <Input
            valid={rowValid}
            type="text"
            id="input-row"
            value={rowValue}
            onChange={rowInputHandler}
            autoFocus
          />
          <Label>{`(min - ${minMaxFormValues.rowMin}, max - ${minMaxFormValues.rowMax})`}</Label>

          <Label htmlFor="input-col">Height:</Label>
          <Input
            valid={colValid}
            type="text"
            id="input-col"
            value={colValue}
            onChange={colInputHandler}
          />
          <Label>{`(min - ${minMaxFormValues.colMin}, max - ${minMaxFormValues.colMax})`}</Label>

          <Label htmlFor="input-bomb">Bombs:</Label>
          <Input
            valid={bombValid}
            type="text"
            id="input-bomb"
            value={bombValue}
            onChange={bombInputHandler}
          />
          <Label>{`(min - ${minMaxFormValues.bombMin}, max - ${bombMax})`}</Label>
        </GridTemplate>

        <Control>
          <Button
            variantBorder="small-outside"
            type="submit"
            value="New game"
          />

          <Button variantBorder="small-outside" type="reset" value="Cancel" />
          {showValidError && <LabelError>Check values</LabelError>}
        </Control>
      </CustomParamsFormStyled>
    </CustomParamsModal>
  );
}

export { CustomParamsForm };
