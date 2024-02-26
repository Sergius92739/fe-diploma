import type { FC } from 'react';
import { ChangeEvent, useState, MouseEvent, useRef } from 'react';
import {
  CalendarIcon,
  inputNames,
  isValidDate,
  getTailwindClasses,
  btnCSS,
  headerTitlesCSS,
  LocationIcon,
  useOutsideClick,
  btnNames,
  ticketsSearchAttributes,
  setErrorPlaceholder
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
import { DatePicker } from '4_features/datePicker/ui';
import { DatePickerCaption } from '4_features/datePicker/ui/datePickerCaption';

export const TicketSearchForm: FC = () => {
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

  const [startCityInputValue, setStartCityInputValue] = useState('');
  const [endCityInputValue, setEndCityInputValue] = useState('');
  const [startDateInputValue, setStartDateInputValue] = useState('');
  const [endDateInputValue, setEndDateInputValue] = useState('');
  const [isStartDatePickerVisible, setStartDatePickerVisible] =
    useState<boolean>(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] =
    useState<boolean>(false);
  const startDatePickerRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    startDatePickerRef,
    () => isStartDatePickerVisible && setStartDatePickerVisible(false)
  );
  const endDatePickerRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    endDatePickerRef,
    () => isEndDatePickerVisible && setEndDatePickerVisible(false)
  );

  const handleDirectionInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (e.target.name === inputNames.FROM_CITY) {
      setStartCityInputValue(value);
      if (!e.target.value) {
        setStartSearchResult([]);
      }
    } else {
      setEndCityInputValue(value);
      if (!e.target.value) {
        setEndSearchResult([]);
      }
    }
  };

  const handleDateInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const digitsArray = e.target.value.replace(/[^\d]/g, '').split('', 8);
    if (digitsArray.length === 8) {
      const day = +digitsArray.slice(0, 2).join('');
      const month = +digitsArray.slice(2, 4).join('');
      const year = +digitsArray.slice(4, 8).join('');
      if (!isValidDate(year, month, day)) {
        if (e.target.name === inputNames.DATE_FROM_CITY) {
          setStartDateInputValue('');
        }
        if (e.target.name === inputNames.DATE_TO_CITY) {
          setEndDateInputValue('');
        }
        setErrorPlaceholder(e, 'Невалидная дата');
        return;
      }
    }
    if (digitsArray.length > 4) {
      digitsArray.splice(4, 0, '.');
    }
    if (digitsArray.length > 2) {
      digitsArray.splice(2, 0, '.');
    }
    if (e.target.name === inputNames.DATE_FROM_CITY) {
      setStartDateInputValue(digitsArray.join(''));
    }
    if (e.target.name === inputNames.DATE_TO_CITY) {
      setEndDateInputValue(digitsArray.join(''));
    }
  };

  const handleStartCitySelection = (city: TCityObj) => {
    setStartCityInputValue(city.name);
    setStartSearchResult([]);
  };

  const handleEndCitySelection = (city: TCityObj) => {
    setEndCityInputValue(city.name);
    setEndSearchResult([]);
  };

  const handleStartCalendarIconBtnClick = (
    e: MouseEvent<HTMLButtonElement>
  ) => {
    setStartDatePickerVisible(!isStartDatePickerVisible);
  };

  const handleEndCalendarIconBtnClick = (e: MouseEvent<HTMLButtonElement>) => {
    setEndDatePickerVisible(!isEndDatePickerVisible);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

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
                inputValue={startDateInputValue}
                typeAttr="text"
                requiredAttr={true}
              />
              <IconBtn
                icon={<CalendarIcon />}
                onClick={handleStartCalendarIconBtnClick}
                name={ticketsSearchAttributes.ICON_BTN_CALENDAR}
              />
            </div>
            <DatePicker
              isVisible={isStartDatePickerVisible}
              reference={startDatePickerRef}
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
                inputValue={endDateInputValue}
                typeAttr="text"
                // requiredAttr={true}
              />
              <IconBtn
                icon={<CalendarIcon name="" />}
                onClick={handleEndCalendarIconBtnClick}
                name={ticketsSearchAttributes.ICON_BTN_CALENDAR}
              />
            </div>
            <DatePicker
              isVisible={isEndDatePickerVisible}
              reference={endDatePickerRef}
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
