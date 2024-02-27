import type { FC } from 'react';
import { TCityObj } from '../model/types';

type T_TooltipCitiesProps = {
  cityObj: TCityObj;
  onClick: (cityObj: TCityObj) => void;
};

export const TooltipCitiesItem: FC<T_TooltipCitiesProps> = ({
  cityObj,
  onClick
}) => {
  return (
    <li
      onClick={() => onClick(cityObj)}
      className="px-5 py-1 hover:bg-slate-300 cursor-pointer"
      tabIndex={0}
    >
      {cityObj.name}
    </li>
  );
};
