import { btnNames, inputNames, ticketsSearchAttributes } from '6_shared';
import { FC, MouseEventHandler, ReactNode } from 'react';

type T_IconBtnProps = {
  icon: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  name?:
    | ticketsSearchAttributes.ICON_BTN_CALENDAR
    | ticketsSearchAttributes.ICON_BTN_DIRECTION;
};

export const IconBtn: FC<T_IconBtnProps> = ({ icon, onClick, name }) => {
  return (
    <button
      name={name}
      onClick={onClick}
      className="w-[60px] h-[60px] flex justify-center items-center"
      type="button"
    >
      {icon}
    </button>
  );
};
