import { SwapIcon } from '6_shared';
import { FC, MouseEventHandler } from 'react';

type T_SwapBtnProps = {
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const SwapBtn: FC<T_SwapBtnProps> = ({ onClick }) => {
  return (
    <div className="flex justify-center items-center">
      <button
        onClick={onClick}
        className="w-[40px] h-[40px] flex justify-center items-center left-[47.6%] top-[4.8rem]"
        type="button"
      >
        <SwapIcon />
      </button>
    </div>
  );
};
