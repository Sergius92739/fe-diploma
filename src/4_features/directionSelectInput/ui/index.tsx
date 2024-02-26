import { inputSizeCSS } from '6_shared';
import { Input } from '6_shared';
import { ChangeEvent, ChangeEventHandler, FC } from 'react';
import { inputNames } from '6_shared';

export type TDirectionSelectInputProps = {
  nameAttr: inputNames.FROM_CITY | inputNames.TO_CITY;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  typeAttr: 'text' | 'date' | 'email';
  requiredAttr?: boolean;
};

export const DirectionSelectInput: FC<TDirectionSelectInputProps> = ({
  nameAttr,
  handleChange,
  inputValue,
  typeAttr,
  requiredAttr
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
    />
  );
};
