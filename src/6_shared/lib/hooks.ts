/* eslint-disable @typescript-eslint/no-explicit-any */
import { TAppDispatch, TRootState } from '1_app/store';
import { btnNames, hiddenCalssNames } from '6_shared/config/enums';
import {
  Dispatch,
  MutableRefObject,
  useEffect,
  useState,
  // MouseEvent,
  TouchEvent,
  ReactNode,
  ReactComponentElement,
  RefObject,
  EventHandler
} from 'react';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<TAppDispatch>();

export const useAppSelector: TypedUseSelectorHook<TRootState> = useSelector;

export const useForm = <FormData>(inputValues: FormData) => {
  const [values, setValues] = useState<FormData>(inputValues);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };
  return { values, handleChange, setValues };
};

type TUseOnClickOutside = (
  ref: RefObject<HTMLDivElement>,
  handler: () => void
) => void;

export const useOutsideClick: TUseOnClickOutside = (ref, handler): void => {
  useEffect(() => {
    const listener = (e: Event) => {
      const element = ref.current;
      if (!element || element.contains(e.target as Node)) {
        return;
      }
      handler();
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [handler, ref]);
};
