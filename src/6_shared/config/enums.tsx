export enum inputSizeCSS {
  BASE = 'w-[16.5625rem]',
  LARGE = 'w-[27.9375rem]'
}

export enum inputPlaceholderColor {
  BASE = 'placeholder-[#E5E5E5]',
  ERROR = 'placeholder-[red]'
}

export enum btnCSS {
  SM_WIDTH = 'w-[13.875rem]',
  LG_WIDTH = 'w-[14.5625rem]',
  XL_WIDTH = 'w-[20.3125rem]',
  SM_HEIGHT = 'h-[2.4375rem]',
  LG_HEIGHT = 'h-[3.25rem]',
  XL_HEIGHT = 'h-[3.75rem]',
  INACTIVE_CLR = 'bg-[#918F94]',
  BASE_CLR = 'bg-[#FFA800]',
  ACTIVE_CLR = 'bg-[#FFFFFF]',
  TEXT_DARK = 'text-[#292929]',
  TEXT_WHITE = 'text-[#FFFFFF]'
}

export enum headerTitlesCSS {
  FONT_SIZE = 'text-3xl',
  FONT_WEIGHT = 'font-light',
  LINE_HEIGHT = 'leading-[2.1975rem]',
  TEXT_COLOR = 'text-white',
  FIRST_LETTER = 'first-letter:uppercase'
}

export enum navigationMap {
  HOME = '/',
  TRAIN = '/train',
  PLACE = '/place',
  PASSENGERS = '/passengers',
  PAYMENT = '/payment',
  ORDER_CONFIRM = '/order-confirm',
  SUCCESSFUL_ORDER = '/successful-order'
}

export enum apiMap {
  CITIES = '/routes/cities'
}

export enum inputNames {
  FROM_CITY = 'from-city',
  TO_CITY = 'to-city',
  DATE_FROM_CITY = 'date-from-city',
  DATE_TO_CITY = 'date-to-city'
}

export enum btnNames {
  CITIES_INPUT_ICON_BTN = 'cities-icon-btn',
  DATE_INPUT_ICON_BTN = 'date-icon-btn'
}

export enum hiddenCalssNames {
  VISUALY_HIDDEN = 'visually_hidden',
  DISPLAY_NONE = 'd_none'
}

export enum ticketSearchFormAction {
  SET_START_CITY_INPUT_VALUE = 'ticketSearch/setStartCityInputValue',
  SET_END_CITY_INPUT_VALUE = 'ticketSearch/setEndCityInputValue',
  SET_DEPARTURE_DATE_INPUT_VALUE = 'ticketSearch/setDepartureDateInputValue',
  SET_ARRIVAL_DATE_INPUT_VALUE = 'ticketSearch/setArrivalDateInputValue'
}
