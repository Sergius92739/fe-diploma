import { inputPlaceholderColor } from '6_shared';
import { ChangeEvent, FocusEvent } from 'react';

export const setInputErrorPlaceholder = (
  e: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>,
  errorPlaceholder: string
) => {
  const basePlaceholder = e.target.placeholder;
  e.target.placeholder = errorPlaceholder;
  e.target.classList.add(inputPlaceholderColor.ERROR);
  setTimeout(() => {
    e.target.placeholder = basePlaceholder;
    e.target.classList.remove(inputPlaceholderColor.ERROR);
  }, 3000);
};
