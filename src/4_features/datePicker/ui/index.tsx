import 'react-day-picker/dist/style.css';
import '../../../1_app/styles/date-picker.css';
import type { FC, MutableRefObject, RefObject } from 'react';
import { createRef, useEffect, useRef, useState } from 'react';
import { format, addMonths, addDays } from 'date-fns';
import { CaptionProps, DayPicker } from 'react-day-picker';
import { is, ru } from 'date-fns/locale';
import { DatePickerCaption } from './datePickerCaption';
import { hiddenCalssNames, inputNames, useOutsideClick } from '6_shared';

type TDatePickerProps = {
  isVisible: boolean;
  reference: RefObject<HTMLDivElement>;
};

export const DatePicker: FC<TDatePickerProps> = ({ isVisible, reference }) => {
  const [selected, setSelected] = useState<Date>();
  const today = new Date();

  return (
    <div
      ref={reference}
      className={`${isVisible ? '' : hiddenCalssNames.VISUALY_HIDDEN}`}
    >
      <DayPicker
        mode="single"
        required
        selected={selected}
        onSelect={setSelected}
        locale={ru}
        showOutsideDays
        fixedWeeks
        fromDate={
          new Date(today.getFullYear(), today.getMonth(), today.getDate())
        }
        toMonth={new Date(today.getFullYear(), 11)}
        components={{
          Caption: (props: CaptionProps) => <DatePickerCaption {...props} />,
          HeadRow: () => null
        }}
      />
    </div>
  );
};
