import { FC } from 'react';

type T_ButtonProps = {
  content: string;
  color: string;
  bgColor: string;
  width: string;
  height: string;
};

export const Button: FC<T_ButtonProps> = ({
  content,
  color,
  bgColor,
  width,
  height
}) => {
  return (
    <button
      className={`text-2xl ${color} ${bgColor} ${height} ${width} rounded-[5px] font-bold uppercase `}
      type="submit"
    >
      {content}
    </button>
  );
};
