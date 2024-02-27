import type { FC, FormEvent, FormEventHandler } from 'react';
import { ChangeEvent, useRef, useCallback, useReducer } from 'react';
import {
  CalendarIcon,
  inputNames,
  isValidDate,
  getTailwindClasses,
  btnCSS,
  headerTitlesCSS,
  LocationIcon,
  useOutsideClick,
  ticketsSearchAttributes,
  setErrorPlaceholder,
  useAppDispatch
} from '6_shared';
import {
  DateSelectInput,
  useCitySearch,
  CitiesTooltip,
  TCityObj,
  IconBtn,
  SwapBtn,
  DirectionSelectInput,
  TicketSearchFormBtn
} from '4_features';
import {
  setSelectedStartCityObject,
  setSelectedEndCityObject,
  setSelectedDepartureDate,
  setSelectedArrivalDate
} from '../model/ticketSearchSlice';
import { DatePicker } from '4_features/datePicker/ui';
import { SelectSingleEventHandler } from 'react-day-picker';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { selectTicketSearch } from '../model/ticketSearchSlice';
import { formReducer } from '../model/formReducer';
import { initialFormState } from '../model/useReducerFormState';
import { formReducerActions } from '6_shared/config/enums';
import { ActionCreator, PayloadAction } from '@reduxjs/toolkit';

export const TicketSearchForm: FC = () => {
  const appDispatch = useAppDispatch();
  const [formState, formDispatch] = useReducer(formReducer, initialFormState);
  const departureDatePickerRef = useRef<HTMLDivElement>(null);
  const arrivalDatePickerRef = useRef<HTMLDivElement>(null);
  const {
    startCityInputValue,
    endCityInputValue,
    departureDateInputValue,
    arrivalDateInputValue,
    selectedDayPickerDeparture,
    selectedDayPickerArrival
  } = formState;

  const {
    searchResults: searchStartResult,
    loading: startLoading,
    error: startError,
    setSearchResults: setStartSearchResult
  } = useCitySearch(inputNames.FROM_CITY);

  const {
    searchResults: searchEndResult,
    loading: endLoading,
    error: endError,
    setSearchResults: setEndSearchResult
  } = useCitySearch(inputNames.TO_CITY);

  const {
    selectedStartCityObject,
    selectedEndCityObject,
    selectedDepartureDate,
    selectedArrivalDate
  } = useSelector(selectTicketSearch);

  const [isDepartureDatePickerVisible, setDepartureDatePickerVisible] =
    useReducer((v) => !v, false);
  const [isArrivalDatePickerVisible, setArrivalDatePickerVisible] = useReducer(
    (v) => !v,
    false
  );

  useOutsideClick(
    departureDatePickerRef,
    () => isDepartureDatePickerVisible && setDepartureDatePickerVisible()
  );

  useOutsideClick(
    arrivalDatePickerRef,
    () => isArrivalDatePickerVisible && setArrivalDatePickerVisible()
  );

  const checkArrayOfEnteredDigits = (
    digitsArray: string[],
    e: ChangeEvent<HTMLInputElement>
  ) => {
    if (digitsArray.length === 8) {
      const day = +digitsArray.slice(0, 2).join('');
      const month = +digitsArray.slice(2, 4).join('');
      const year = +digitsArray.slice(4, 8).join('');
      if (!isValidDate(year, month, day)) {
        if (e.target.name === inputNames.DATE_FROM_CITY) {
          formDispatch({
            type: formReducerActions.SET_DEPARTURE_DATE_INPUT_VALUE,
            value: ''
          });
        }
        if (e.target.name === inputNames.DATE_TO_CITY) {
          formDispatch({
            type: formReducerActions.SET_ARRIVAL_DATE_INPUT_VALUE,
            value: ''
          });
        }
        setErrorPlaceholder(e, 'Невалидная дата');
        return;
      }
    }
  };

  const setDateToGlobalStore = (
    action: ActionCreator<PayloadAction<string>>,
    digitsArray: string[]
  ) => {
    if (digitsArray.length === 10) {
      const day = +digitsArray.slice(0, 2).join('');
      let month = +digitsArray.slice(3, 5).join('');
      const year = +digitsArray.slice(6, 10).join('');
      if (isValidDate(year, month, day)) {
        const date = new Date(year, --month, day);
        const dateToString = format(date, 'y-MM-dd');
        appDispatch(action(dateToString));
      }
    }
  };

  const handleDirectionInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (e.target.name === inputNames.FROM_CITY) {
        formDispatch({
          type: formReducerActions.SET_START_CITY_INPUT_VALUE,
          value
        });
        if (!e.target.value) {
          setStartSearchResult([]);
        }
      }
      if (e.target.name === inputNames.TO_CITY) {
        formDispatch({
          type: formReducerActions.SET_END_CITY_INPUT_VALUE,
          value
        });
        if (!e.target.value) {
          setEndSearchResult([]);
        }
      }
    },
    []
  );

  const handleDateInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const digitsArray = e.target.value.replace(/[^\d]/g, '').split('', 8);
      checkArrayOfEnteredDigits(digitsArray, e);
      if (digitsArray.length > 4) {
        digitsArray.splice(4, 0, '.');
      }
      if (digitsArray.length > 2) {
        digitsArray.splice(2, 0, '.');
      }
      if (e.target.name === inputNames.DATE_FROM_CITY) {
        formDispatch({
          type: formReducerActions.SET_DEPARTURE_DATE_INPUT_VALUE,
          value: digitsArray.join('')
        });
        setDateToGlobalStore(setSelectedDepartureDate, digitsArray);
      }
      if (e.target.name === inputNames.DATE_TO_CITY) {
        formDispatch({
          type: formReducerActions.SET_ARRIVAL_DATE_INPUT_VALUE,
          value: digitsArray.join('')
        });
        setDateToGlobalStore(setSelectedArrivalDate, digitsArray);
      }
    },
    []
  );

  const handleStartCitySelection = useCallback((city: TCityObj) => {
    appDispatch(setSelectedStartCityObject(city));
    formDispatch({
      type: formReducerActions.SET_START_CITY_INPUT_VALUE,
      value: city.name
    });
    setStartSearchResult([]);
  }, []);

  const handleEndCitySelection = useCallback((city: TCityObj) => {
    appDispatch(setSelectedEndCityObject(city));
    formDispatch({
      type: formReducerActions.SET_END_CITY_INPUT_VALUE,
      value: city.name
    });
    setEndSearchResult([]);
  }, []);

  const handleDepartureDaySelect: SelectSingleEventHandler = useCallback(
    (date) => {
      formDispatch({
        type: formReducerActions.SET_SELECTED_DAY_PICKER_DEPARTURE,
        value: date
      });
      if (date) {
        appDispatch(setSelectedDepartureDate(format(date, 'y-MM-dd')));
        formDispatch({
          type: formReducerActions.SET_DEPARTURE_DATE_INPUT_VALUE,
          value: format(date, 'dd.MM.y')
        });
      } else {
        formDispatch({
          type: formReducerActions.SET_DEPARTURE_DATE_INPUT_VALUE,
          value: ''
        });
      }
    },
    []
  );

  const handleArrivalDaySelect: SelectSingleEventHandler = useCallback(
    (date) => {
      formDispatch({
        type: formReducerActions.SET_SELECTED_DAY_PICKER_ARRIVAL,
        value: date
      });
      if (date) {
        appDispatch(setSelectedArrivalDate(format(date, 'y-MM-dd')));
        formDispatch({
          type: formReducerActions.SET_ARRIVAL_DATE_INPUT_VALUE,
          value: format(date, 'dd.MM.y')
        });
      } else {
        formDispatch({
          type: formReducerActions.SET_ARRIVAL_DATE_INPUT_VALUE,
          value: ''
        });
      }
    },
    []
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback((e) => {
    e.preventDefault();
    console.log({
      selectedStartCityObject,
      selectedEndCityObject,
      selectedDepartureDate,
      selectedArrivalDate
    });
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className=" bg-[rgba(41,41,41,0.65)] px-5 py-[3.75rem] min-w-80 max-w-[45.625rem] relative"
    >
      <fieldset className="max-w-[43.125rem]">
        <legend className={`px-2 py-3 ${getTailwindClasses(headerTitlesCSS)}`}>
          направление
        </legend>
        <div className="flex justify-between">
          <div
            data-id={ticketsSearchAttributes.DIRECTION_SELECT_START}
            className="relative"
          >
            <div className={`flex rounded-[3px] bg-white ${btnCSS.XL_WIDTH}`}>
              <DirectionSelectInput
                typeAttr="text"
                nameAttr={inputNames.FROM_CITY}
                handleChange={handleDirectionInputChange}
                inputValue={startCityInputValue}
                requiredAttr={true}
              />
              <IconBtn icon={<LocationIcon />} />
            </div>
            <CitiesTooltip
              cities={searchStartResult}
              handleCitySelection={handleStartCitySelection}
              loading={startLoading}
              error={startError}
            />
          </div>
          <SwapBtn />
          <div
            data-id={ticketsSearchAttributes.DIRECTION_SELECT_END}
            className="relative"
          >
            <div className={`flex rounded-[3px] bg-white ${btnCSS.XL_WIDTH}`}>
              <DirectionSelectInput
                typeAttr="text"
                nameAttr={inputNames.TO_CITY}
                handleChange={handleDirectionInputChange}
                inputValue={endCityInputValue}
                requiredAttr={true}
              />
              <IconBtn icon={<LocationIcon />} />
            </div>
            <CitiesTooltip
              cities={searchEndResult}
              handleCitySelection={handleEndCitySelection}
              loading={endLoading}
              error={endError}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="max-w-[43.125rem]">
        <legend className={`px-2 py-3 ${getTailwindClasses(headerTitlesCSS)}`}>
          дата
        </legend>
        <div className="flex justify-between">
          <div
            data-id={ticketsSearchAttributes.DATE_SELECT_START}
            className="relative"
          >
            <div className={`flex rounded-[3px] bg-white ${btnCSS.XL_WIDTH}`}>
              <DateSelectInput
                nameAttr={inputNames.DATE_FROM_CITY}
                handleChange={handleDateInputChange}
                inputValue={departureDateInputValue}
                typeAttr="text"
                requiredAttr={true}
              />
              <IconBtn
                icon={<CalendarIcon />}
                onClick={setDepartureDatePickerVisible}
                name={ticketsSearchAttributes.ICON_BTN_CALENDAR}
              />
            </div>
            <DatePicker
              isVisible={isDepartureDatePickerVisible}
              reference={departureDatePickerRef}
              selected={selectedDayPickerDeparture}
              onSelect={handleDepartureDaySelect}
            />
          </div>
          <div
            data-id={ticketsSearchAttributes.DATE_SELECT_END}
            className="relative"
          >
            <div className={`flex rounded-[3px] bg-white ${btnCSS.XL_WIDTH}`}>
              <DateSelectInput
                nameAttr={inputNames.DATE_TO_CITY}
                handleChange={handleDateInputChange}
                inputValue={arrivalDateInputValue}
                typeAttr="text"
                // requiredAttr={true}
              />
              <IconBtn
                icon={<CalendarIcon name="" />}
                onClick={setArrivalDatePickerVisible}
                name={ticketsSearchAttributes.ICON_BTN_CALENDAR}
              />
            </div>
            <DatePicker
              isVisible={isArrivalDatePickerVisible}
              reference={arrivalDatePickerRef}
              selected={selectedDayPickerArrival}
              onSelect={handleArrivalDaySelect}
            />
          </div>
        </div>
      </fieldset>

      <div className="flex justify-end mt-[92px]">
        <TicketSearchFormBtn />
      </div>
    </form>
  );
};
