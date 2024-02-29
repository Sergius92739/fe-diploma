import { btnCSS } from '6_shared';
import type { FC } from 'react';

export const DirectionInputTooltip: FC = () => {
  return (
    <div
      className={`py-3 px-4 ${btnCSS.XL_WIDTH} bg-white text-base rounded-[3px] mt-1 absolute z-10`}
    >
      Введите название города
    </div>
  );
};
