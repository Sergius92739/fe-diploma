import { inputPlaceholderColor } from '6_shared';
import type { ChangeEvent, ChangeEventHandler, FocusEvent, FC } from 'react';

type T_InputProps = {
  placeholder?: string;
  width: string;
  nameAttr: string;
  value?: string;
  typeAttr: 'text' | 'date' | 'email';
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement>) => void;
  requiredAttr?: boolean;
};

export const Input: FC<T_InputProps> = ({
  placeholder,
  width,
  nameAttr,
  value,
  typeAttr,
  onChange,
  requiredAttr,
  onBlur,
  onFocus
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
          onBlur={onBlur}
          onFocus={onFocus}
        />
      </div>
    </>
  );
};
