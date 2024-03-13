import { btnNames, inputNames } from '6_shared';
import { FC, MouseEventHandler, ReactNode } from 'react';

type T_IconBtnProps = {
  icon: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export const IconBtn: FC<T_IconBtnProps> = ({ icon, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-[60px] h-[60px] flex justify-center items-center"
      type="button"
    >
      {icon}
    </button>
  );
};
