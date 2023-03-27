import { useState } from 'react';
import { baseLevelsOptions } from '../const/const';
import { IBoardParams } from '../types/types';

interface IUseLevelProps {
  initialValue?: IBoardParams;
}



export const useLevelOptions = ({ initialValue }: Partial<IUseLevelProps> = {}) => {
  const [levelOptions, setLevelOptions] = useState<IBoardParams>(initialValue || baseLevelsOptions[0]);
  
  return [levelOptions, setLevelOptions]
};
