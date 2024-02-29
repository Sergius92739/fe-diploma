import type { FC, FormEventHandler, ChangeEvent, FocusEvent } from 'react';
import { useRef, useCallback, useReducer } from 'react';
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
  setInputErrorPlaceholder,
  useAppDispatch,
  upperCaseFirst,
  formatDate
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
  setSelectedArrivalDate,
  setStartCityInputValue,
  setEndCityInputValue,
  setDepartureDateInputValue,
  setArrivalDateInputValue
} from '../model/ticketSearchSlice';
import { DatePicker } from '4_features/datePicker/ui';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { selectTicketSearch } from '../model/ticketSearchSlice';
import { formReducerActions, navigationMap } from '6_shared/config/enums';
import { useNavigate } from 'react-router-dom';
import { DirectionInputTooltip } from '4_features/directionInputTooltip/ui';
import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

export const TicketSearchForm: FC = () => {
  const appDispatch = useAppDispatch();
  const departureDatePickerRef = useRef<HTMLDivElement>(null);
  const arrivalDatePickerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

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
    selectedArrivalDate,
    startCityInputValue,
    endCityInputValue,
    departureDateInputValue,
    arrivalDateInputValue
  } = useSelector(selectTicketSearch);

  const [isDepartureDatePickerVisible, setDepartureDatePickerVisible] =
    useReducer((v) => !v, false);

  const [isArrivalDatePickerVisible, setArrivalDatePickerVisible] = useReducer(
    (v) => !v,
    false
  );

  const [departureInputTooltipVisible, toggleDepartureInputTooltipVisible] =
    useReducer((v) => !v, false);

  const [arrivalInputTooltipVisible, toggleArrivalInputTooltipVisible] =
    useReducer((v) => !v, false);

  useOutsideClick(
    departureDatePickerRef,
    () => isDepartureDatePickerVisible && setDepartureDatePickerVisible()
  );

  useOutsideClick(
    arrivalDatePickerRef,
    () => isArrivalDatePickerVisible && setArrivalDatePickerVisible()
  );

  const isValidDateInputValue = (inputValue: string) => {
    if (inputValue.length !== 10) {
      return;
    }
    const arr = inputValue.split('.');
    const day = +arr[0];
    const month = +arr[1];
    const year = +arr[2];
    if (year < new Date().getFullYear()) {
      return false;
    }
    if (month < new Date().getMonth() + 1) {
      return false;
    }
    return isValidDate(year, month, day);
  };

  const handleDirectonInputBlur = useCallback(
    (
      e: FocusEvent<HTMLInputElement>,
      action:
        | ActionCreatorWithPayload<
            string,
            'ticketSearch/setStartCityInputValue'
          >
        | ActionCreatorWithPayload<string, 'ticketSearch/setEndCityInputValue'>
    ) => {
      const { value } = e.target;
      if (value && !e.relatedTarget?.closest('ul')?.querySelector('li')) {
        appDispatch(action(''));
        setInputErrorPlaceholder(e, 'Выберите город из списка');
        if (action.type === formReducerActions.SET_START_CITY_INPUT_VALUE) {
          setStartSearchResult([]);
        }
        if (action.type === formReducerActions.SET_END_CITY_INPUT_VALUE) {
          setEndSearchResult([]);
        }
      }
      if (e.target.name === inputNames.FROM_CITY) {
        toggleDepartureInputTooltipVisible();
      }
      if (e.target.name === inputNames.TO_CITY) {
        toggleArrivalInputTooltipVisible();
      }
    },
    []
  );

  const handleDateInputBlur = useCallback(
    (
      e: FocusEvent<HTMLInputElement>,
      action:
        | ActionCreatorWithPayload<
            string,
            'ticketSearch/setDepartureDateInputValue'
          >
        | ActionCreatorWithPayload<
            string,
            'ticketSearch/setArrivalDateInputValue'
          >
    ) => {
      const { value } = e.target;
      if (value && value.length !== 10) {
        appDispatch(action(''));
        setInputErrorPlaceholder(e, 'Введите день, месяц и год');
      }
      if (value && value.length === 10) {
        if (!isValidDateInputValue(value)) {
          appDispatch(action(''));
          setInputErrorPlaceholder(e, 'Невалидная дата');
          return;
        } else {
          if (
            action.type === formReducerActions.SET_DEPARTURE_DATE_INPUT_VALUE
          ) {
            appDispatch(setSelectedDepartureDate(formatDate(value)));
          }
          if (action.type === formReducerActions.SET_ARRIVAL_DATE_INPUT_VALUE) {
            appDispatch(setSelectedArrivalDate(formatDate(value)));
          }
        }
      }
    },
    [selectedDepartureDate, selectedArrivalDate]
  );

  const handleDirectionInputChange = useCallback(
    (
      e: ChangeEvent<HTMLInputElement>,
      action:
        | ActionCreatorWithPayload<
            string,
            'ticketSearch/setStartCityInputValue'
          >
        | ActionCreatorWithPayload<string, 'ticketSearch/setEndCityInputValue'>
    ) => {
      const value = upperCaseFirst(e.target.value);
      appDispatch(action(value));
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
        | ActionCreatorWithPayload<
            string,
            'ticketSearch/setDepartureDateInputValue'
          >
        | ActionCreatorWithPayload<
            string,
            'ticketSearch/setArrivalDateInputValue'
          >
    ) => {
      const digitsArray = e.target.value.replace(/[^\d]/g, '').split('', 8);
      if (digitsArray.length > 4) {
        digitsArray.splice(4, 0, '.');
      }
      if (digitsArray.length > 2) {
        digitsArray.splice(2, 0, '.');
      }
      appDispatch(action(digitsArray.join('')));

      if (digitsArray.length === 10) {
        if (!isValidDateInputValue(e.target.value)) {
          appDispatch(action(''));
          setInputErrorPlaceholder(e, 'Невалидная дата');
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
        | ActionCreatorWithPayload<
            string,
            'ticketSearch/setStartCityInputValue'
          >
        | ActionCreatorWithPayload<string, 'ticketSearch/setEndCityInputValue'>
    ) => {
      if (action.type === formReducerActions.SET_START_CITY_INPUT_VALUE) {
        appDispatch(setSelectedStartCityObject(city));
      }
      if (action.type === formReducerActions.SET_END_CITY_INPUT_VALUE) {
        appDispatch(setSelectedEndCityObject(city));
      }
      appDispatch(action(city.name));
      setStartSearchResult([]);
      setEndSearchResult([]);
    },
    []
  );

  const handleDaySelecttion = useCallback(
    (
      date: Date | undefined,
      inputAction:
        | ActionCreatorWithPayload<
            string,
            'ticketSearch/setDepartureDateInputValue'
          >
        | ActionCreatorWithPayload<
            string,
            'ticketSearch/setArrivalDateInputValue'
          >
    ) => {
      if (date) {
        if (
          inputAction.type === formReducerActions.SET_DEPARTURE_DATE_INPUT_VALUE
        ) {
          appDispatch(setSelectedDepartureDate(format(date, 'y-MM-dd')));
        }
        if (
          inputAction.type === formReducerActions.SET_ARRIVAL_DATE_INPUT_VALUE
        ) {
          appDispatch(setSelectedArrivalDate(format(date, 'y-MM-dd')));
        }
        appDispatch(inputAction(format(date, 'dd.MM.y')));
      } else {
        appDispatch(inputAction(''));
      }
    },
    []
  );

  const handleSwapBtnClick = useCallback(() => {
    if (selectedEndCityObject) {
      appDispatch(setSelectedStartCityObject(selectedEndCityObject));
    }
    appDispatch(setStartCityInputValue(endCityInputValue));
    if (selectedStartCityObject) {
      appDispatch(setSelectedEndCityObject(selectedStartCityObject));
    }
    appDispatch(setEndCityInputValue(startCityInputValue));
  }, [
    selectedStartCityObject,
    selectedEndCityObject,
    startCityInputValue,
    endCityInputValue
  ]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      if (selectedStartCityObject && selectedEndCityObject) {
        navigate(navigationMap.TRAIN);
      }
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
                  handleDirectionInputChange(e, setStartCityInputValue)
                }
                onBlur={(e) =>
                  handleDirectonInputBlur(e, setStartCityInputValue)
                }
                onFocus={toggleDepartureInputTooltipVisible}
                inputValue={startCityInputValue}
                requiredAttr={true}
              />
              <IconBtn icon={<LocationIcon />} />
            </div>
            {departureInputTooltipVisible && <DirectionInputTooltip />}
            <CitiesTooltip
              cities={searchStartResult}
              handleCitySelection={(el) =>
                handleCitySelection(el, setStartCityInputValue)
              }
              loading={startLoading}
              error={startError}
            />
          </div>
          <SwapBtn onClick={handleSwapBtnClick} />
          <div
            data-id={ticketsSearchAttributes.DIRECTION_SELECT_END}
            className="relative"
          >
            <div className={`flex rounded-[3px] bg-white ${btnCSS.XL_WIDTH}`}>
              <DirectionSelectInput
                typeAttr="text"
                nameAttr={inputNames.TO_CITY}
                handleChange={(e) =>
                  handleDirectionInputChange(e, setEndCityInputValue)
                }
                onBlur={(e) => handleDirectonInputBlur(e, setEndCityInputValue)}
                onFocus={toggleArrivalInputTooltipVisible}
                inputValue={endCityInputValue}
                requiredAttr={true}
              />
              <IconBtn icon={<LocationIcon />} />
            </div>
            {arrivalInputTooltipVisible && <DirectionInputTooltip />}
            <CitiesTooltip
              cities={searchEndResult}
              handleCitySelection={(el) =>
                handleCitySelection(el, setEndCityInputValue)
              }
              loading={endLoading}
              error={endError}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="max-w-[43.125rem] mt-[3.75rem]">
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
                  handleDateInputChange(e, setDepartureDateInputValue)
                }
                onBlur={(e) =>
                  handleDateInputBlur(e, setDepartureDateInputValue)
                }
                inputValue={departureDateInputValue}
                typeAttr="text"
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
              selected={new Date(selectedDepartureDate)}
              onSelect={(date) =>
                handleDaySelecttion(date, setDepartureDateInputValue)
              }
            />
          </div>
          <div
            data-id={ticketsSearchAttributes.DATE_SELECT_END}
            className="arrival-date relative flex"
          >
            <div className={`flex rounded-[3px] bg-white ${btnCSS.XL_WIDTH}`}>
              <DateSelectInput
                nameAttr={inputNames.DATE_TO_CITY}
                handleChange={(e) =>
                  handleDateInputChange(e, setArrivalDateInputValue)
                }
                onBlur={(e) => handleDateInputBlur(e, setArrivalDateInputValue)}
                inputValue={arrivalDateInputValue}
                typeAttr="text"
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
              selected={new Date(selectedArrivalDate)}
              onSelect={(date) =>
                handleDaySelecttion(date, setArrivalDateInputValue)
              }
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
