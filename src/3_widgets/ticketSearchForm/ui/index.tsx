import type { ChangeEventHandler, FC, FormEventHandler } from 'react';
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
  setDateInputErrorPlaceholder,
  useAppDispatch,
  upperCaseFirst
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
import { initialFormState } from '../model/formState';
import { formReducerActions, navigationMap } from '6_shared/config/enums';
import { ActionCreator, PayloadAction } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';

export const TicketSearchForm: FC = () => {
  const appDispatch = useAppDispatch();
  const [formState, formDispatch] = useReducer(formReducer, initialFormState);
  const departureDatePickerRef = useRef<HTMLDivElement>(null);
  const arrivalDatePickerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
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

  const isValidDateInputValue = (digitsArray: string[]) => {
    if (digitsArray.length === 10) {
      const day = +digitsArray.slice(0, 2).join('');
      const month = +digitsArray.slice(3, 5).join('');
      const year = +digitsArray.slice(6, 9).join('');
      return isValidDate(year, month, day);
    }
  };

  const setDateToGlobalState = (
    action: ActionCreator<PayloadAction<string>>,
    digitsArray: string[]
  ) => {
    if (digitsArray.length === 10) {
      const day = +digitsArray.slice(0, 2).join('');
      let month = +digitsArray.slice(3, 5).join('');
      const year = +digitsArray.slice(6, 9).join('');
      if (isValidDate(year, month, day)) {
        const date = new Date(year, --month, day);
        const dateToString = format(date, 'y-MM-dd');
        appDispatch(action(dateToString));
      }
    }
  };

  const handleDirectionInputChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement>,
      action:
        | formReducerActions.SET_START_CITY_INPUT_VALUE
        | formReducerActions.SET_END_CITY_INPUT_VALUE
    ) => {
      const value = upperCaseFirst(e.target.value);
      formDispatch({
        type: action,
        value
      });
      if (!e.target.value) {
        setStartSearchResult([]);
      }
    },
    [startCityInputValue, endCityInputValue]
  );

  const handleDateInputChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement>,
      action:
        | formReducerActions.SET_DEPARTURE_DATE_INPUT_VALUE
        | formReducerActions.SET_ARRIVAL_DATE_INPUT_VALUE
    ) => {
      const digitsArray = e.target.value.replace(/[^\d]/g, '').split('', 8);
      if (digitsArray.length > 4) {
        digitsArray.splice(4, 0, '.');
      }
      if (digitsArray.length > 2) {
        digitsArray.splice(2, 0, '.');
      }
      formDispatch({
        type: action,
        value: digitsArray.join('')
      });
      if (digitsArray.length === 10) {
        if (!isValidDateInputValue(digitsArray)) {
          formDispatch({
            type: action,
            value: ''
          });
          setDateInputErrorPlaceholder(e, 'Невалидная дата');
          return;
        }
      }
    },
    [departureDateInputValue, arrivalDateInputValue]
  );

  const handleCitySelection = useCallback(
    (
      city: TCityObj,
      action:
        | formReducerActions.SET_START_CITY_INPUT_VALUE
        | formReducerActions.SET_END_CITY_INPUT_VALUE
    ) => {
      appDispatch(setSelectedStartCityObject(city));
      formDispatch({
        type: action,
        value: city.name
      });
      setStartSearchResult([]);
      setEndSearchResult([]);
    },
    []
  );

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

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      navigate(navigationMap.TRAIN);
      console.log({
        selectedStartCityObject,
        selectedEndCityObject,
        selectedDepartureDate,
        selectedArrivalDate
      });
    },
    [
      selectedStartCityObject,
      selectedEndCityObject,
      selectedDepartureDate,
      selectedArrivalDate
    ]
  );

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
                handleChange={(e) =>
                  handleDirectionInputChange(
                    e,
                    formReducerActions.SET_START_CITY_INPUT_VALUE
                  )
                }
                inputValue={startCityInputValue}
                requiredAttr={true}
              />
              <IconBtn icon={<LocationIcon />} />
            </div>
            <CitiesTooltip
              cities={searchStartResult}
              handleCitySelection={(el) =>
                handleCitySelection(
                  el,
                  formReducerActions.SET_START_CITY_INPUT_VALUE
                )
              }
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
                handleChange={(e) =>
                  handleDirectionInputChange(
                    e,
                    formReducerActions.SET_END_CITY_INPUT_VALUE
                  )
                }
                inputValue={endCityInputValue}
                requiredAttr={true}
              />
              <IconBtn icon={<LocationIcon />} />
            </div>
            <CitiesTooltip
              cities={searchEndResult}
              handleCitySelection={(el) =>
                handleCitySelection(
                  el,
                  formReducerActions.SET_END_CITY_INPUT_VALUE
                )
              }
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
                handleChange={(e) =>
                  handleDateInputChange(
                    e,
                    formReducerActions.SET_DEPARTURE_DATE_INPUT_VALUE
                  )
                }
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
                handleChange={(e) =>
                  handleDateInputChange(
                    e,
                    formReducerActions.SET_ARRIVAL_DATE_INPUT_VALUE
                  )
                }
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
