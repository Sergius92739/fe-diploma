import { inputSizeCSS } from '6_shared';
import { Input } from '6_shared';
import { ChangeEvent, FocusEvent, FC } from 'react';
import { inputNames } from '6_shared';

export type TDirectionSelectInputProps = {
  nameAttr: inputNames.FROM_CITY | inputNames.TO_CITY;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  typeAttr: 'text' | 'date' | 'email';
  requiredAttr?: boolean;
  onBlur?: (event: FocusEvent<HTMLInputElement, Element>) => void;
  onFocus?: (event: FocusEvent<HTMLInputElement, Element>) => void;
};

export const DirectionSelectInput: FC<TDirectionSelectInputProps> = ({
  nameAttr,
  handleChange,
  inputValue,
  typeAttr,
  requiredAttr,
  onBlur,
  onFocus
}) => {
  return (
    <Input
      placeholder={nameAttr === inputNames.FROM_CITY ? 'Откуда' : 'Куда'}
      width={inputSizeCSS.BASE}
      nameAttr={nameAttr}
      value={inputValue}
      onChange={handleChange}
      typeAttr={typeAttr}
      requiredAttr={requiredAttr}
      onBlur={onBlur}
      onFocus={onFocus}
    />
  );
};
