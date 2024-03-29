import { inputNames } from '6_shared';
import { Input, inputSizeCSS } from '6_shared';
import { type FC, ChangeEvent, FocusEvent } from 'react';

type T_DateSelectInputProps = {
  nameAttr: inputNames.DATE_FROM_CITY | inputNames.DATE_TO_CITY;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  typeAttr: 'text' | 'date' | 'email';
  requiredAttr?: boolean;
  onBlur?: (event: FocusEvent<HTMLInputElement>) => void;
};

export const DateSelectInput: FC<T_DateSelectInputProps> = ({
  nameAttr,
  handleChange,
  inputValue,
  typeAttr,
  requiredAttr,
  onBlur
}) => {
  return (
    <Input
      placeholder="ДД/ММ/ГГГГ"
      width={inputSizeCSS.BASE}
      nameAttr={nameAttr}
      value={inputValue}
      onChange={handleChange}
      typeAttr={typeAttr}
      requiredAttr={requiredAttr}
      onBlur={onBlur}
    />
  );
};
