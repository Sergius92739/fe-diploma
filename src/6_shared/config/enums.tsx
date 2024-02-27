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
  TEXT_DARK = 'text-[#292929]'
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

export enum ticketsSearchAttributes {
  DIRECTION_SELECT_START = 'direction-select-start',
  DIRECTION_SELECT_END = 'direction-select-end',
  DATE_SELECT_START = 'date-select-start',
  DATE_SELECT_END = 'date-select-end',
  ICON_BTN_CALENDAR = 'icon-btn-calendar',
  ICON_BTN_DIRECTION = 'icon-btn-direction'
}

export enum hiddenCalssNames {
  VISUALY_HIDDEN = 'visually_hidden',
  DISPLAY_NONE = 'd_none'
}

export enum formReducerActions {
  SET_START_CITY_INPUT_VALUE = 'SET_START_CITY_INPUT_VALUE',
  SET_END_CITY_INPUT_VALUE = 'SET_END_CITY_INPUT_VALUE',
  SET_DEPARTURE_DATE_INPUT_VALUE = 'SET_DEPARTURE_DATE_INPUT_VALUE',
  SET_ARRIVAL_DATE_INPUT_VALUE = 'SET_ARRIVAL_DATE_INPUT_VALUE',
  TOGGLE_DEPARTURE_DATE_PICKER = 'TOGGLE_DEPARTURE_DATE_PICKER',
  TOGGLE_ARRIVAL_DATE_PICKER = 'TOGGLE_ARRIVAL_DATE_PICKER',
  SET_SELECTED_DAY_PICKER_DEPARTURE = 'SET_SELECTED_DAY_PICKER_DEPARTURE',
  SET_SELECTED_DAY_PICKER_ARRIVAL = 'SET_SELECTED_DAY_PICKER_ARRIVAL'
}
