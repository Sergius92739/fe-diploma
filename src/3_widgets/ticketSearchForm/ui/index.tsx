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
  setSelectedArrivalDate
} from '../model/ticketSearchSlice';
import { DatePicker } from '4_features/datePicker/ui';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';
import { selectTicketSearch } from '../model/ticketSearchSlice';
import { formReducer } from '../model/formReducer';
import { initialFormState } from '../model/formState';
import { formReducerActions, navigationMap } from '6_shared/config/enums';
import { useNavigate } from 'react-router-dom';
import { DirectionInputTooltip } from '4_features/directionInputTooltip/ui';

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
        | formReducerActions.SET_START_CITY_INPUT_VALUE
        | formReducerActions.SET_END_CITY_INPUT_VALUE
    ) => {
      const { value } = e.target;
      if (value && !e.relatedTarget?.closest('ul')?.querySelector('li')) {
        formDispatch({
          type: action,
          value: ''
        });
        setInputErrorPlaceholder(e, 'Выберите город из списка');
        if (action === formReducerActions.SET_START_CITY_INPUT_VALUE) {
          setStartSearchResult([]);
        }
        if (action === formReducerActions.SET_END_CITY_INPUT_VALUE) {
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
        | formReducerActions.SET_DEPARTURE_DATE_INPUT_VALUE
        | formReducerActions.SET_ARRIVAL_DATE_INPUT_VALUE
    ) => {
      const { value } = e.target;
      if (value && value.length !== 10) {
        formDispatch({
          type: action,
          value: ''
        });
        setInputErrorPlaceholder(e, 'Введите день, месяц и год');
      }
      if (value && value.length === 10) {
        if (!isValidDateInputValue(value)) {
          formDispatch({
            type: action,
            value: ''
          });
          setInputErrorPlaceholder(e, 'Невалидная дата');
          return;
        } else {
          if (action === formReducerActions.SET_DEPARTURE_DATE_INPUT_VALUE) {
            appDispatch(setSelectedDepartureDate(formatDate(value)));
          }
          if (action === formReducerActions.SET_ARRIVAL_DATE_INPUT_VALUE) {
            appDispatch(setSelectedArrivalDate(formatDate(value)));
          }
        }
      }
    },
    []
  );

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
        if (!isValidDateInputValue(e.target.value)) {
          formDispatch({
            type: action,
            value: ''
          });
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
        | formReducerActions.SET_START_CITY_INPUT_VALUE
        | formReducerActions.SET_END_CITY_INPUT_VALUE
    ) => {
      if (action === formReducerActions.SET_START_CITY_INPUT_VALUE) {
        appDispatch(setSelectedStartCityObject(city));
      }
      if (action === formReducerActions.SET_END_CITY_INPUT_VALUE) {
        appDispatch(setSelectedEndCityObject(city));
      }
      formDispatch({
        type: action,
        value: city.name
      });
      setStartSearchResult([]);
      setEndSearchResult([]);
    },
    []
  );

  const handleDaySelecttion = useCallback(
    (
      date: Date | undefined,
      inputAction:
        | formReducerActions.SET_DEPARTURE_DATE_INPUT_VALUE
        | formReducerActions.SET_ARRIVAL_DATE_INPUT_VALUE,
      dayPickerAction:
        | formReducerActions.SET_SELECTED_DAY_PICKER_DEPARTURE
        | formReducerActions.SET_SELECTED_DAY_PICKER_ARRIVAL
    ) => {
      formDispatch({
        type: dayPickerAction,
        value: date
      });
      if (date) {
        if (inputAction === formReducerActions.SET_DEPARTURE_DATE_INPUT_VALUE) {
          appDispatch(setSelectedDepartureDate(format(date, 'y-MM-dd')));
        }
        if (inputAction === formReducerActions.SET_ARRIVAL_DATE_INPUT_VALUE) {
          appDispatch(setSelectedArrivalDate(format(date, 'y-MM-dd')));
        }
        formDispatch({
          type: inputAction,
          value: format(date, 'dd.MM.y')
        });
      } else {
        formDispatch({
          type: inputAction,
          value: ''
        });
      }
    },
    []
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (e) => {
      e.preventDefault();
      console.log({
        selectedStartCityObject,
        selectedEndCityObject,
        selectedDepartureDate,
        selectedArrivalDate
      });
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
                  handleDirectionInputChange(
                    e,
                    formReducerActions.SET_START_CITY_INPUT_VALUE
                  )
                }
                onBlur={(e) =>
                  handleDirectonInputBlur(
                    e,
                    formReducerActions.SET_START_CITY_INPUT_VALUE
                  )
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
                onBlur={(e) =>
                  handleDirectonInputBlur(
                    e,
                    formReducerActions.SET_END_CITY_INPUT_VALUE
                  )
                }
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
                  handleDateInputChange(
                    e,
                    formReducerActions.SET_DEPARTURE_DATE_INPUT_VALUE
                  )
                }
                onBlur={(e) =>
                  handleDateInputBlur(
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
              onSelect={(date) =>
                handleDaySelecttion(
                  date,
                  formReducerActions.SET_DEPARTURE_DATE_INPUT_VALUE,
                  formReducerActions.SET_SELECTED_DAY_PICKER_DEPARTURE
                )
              }
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
                onBlur={(e) =>
                  handleDateInputBlur(
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
              onSelect={(date) =>
                handleDaySelecttion(
                  date,
                  formReducerActions.SET_ARRIVAL_DATE_INPUT_VALUE,
                  formReducerActions.SET_SELECTED_DAY_PICKER_ARRIVAL
                )
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
