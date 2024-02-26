import { inputPlaceholderColor } from '6_shared';
import type { ChangeEvent, ChangeEventHandler, FC } from 'react';

type T_InputProps = {
  placeholder?: string;
  width: string;
  nameAttr: string;
  value?: string;
  typeAttr: 'text' | 'date' | 'email';
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  // | ((event: ChangeEvent<HTMLInputElement>) => void)
  // | ((date: Date) => void);
  requiredAttr?: boolean;
};

export const Input: FC<T_InputProps> = ({
  placeholder,
  width,
  nameAttr,
  value,
  typeAttr,
  onChange,
  requiredAttr
}) => {
  return (
    <>
      <div>
        <input
          type={typeAttr}
          placeholder={placeholder}
          className={`${inputPlaceholderColor.BASE} rounded-l-[3px] text-lg h-[3.75rem] ${width} pl-4`}
          name={nameAttr}
          value={value}
          onChange={onChange as ChangeEventHandler<HTMLInputElement>}
          required={requiredAttr}
        />
      </div>
    </>
  );
};
