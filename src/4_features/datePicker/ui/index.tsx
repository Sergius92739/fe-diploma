import 'react-day-picker/dist/style.css';
import '../../../1_app/styles/date-picker.css';
import type { FC, RefObject } from 'react';
import {
  CaptionProps,
  DayPicker,
  SelectSingleEventHandler
} from 'react-day-picker';
import { ru } from 'date-fns/locale';
import { DatePickerCaption } from './datePickerCaption';
import { hiddenCalssNames } from '6_shared';

type TDatePickerProps = {
  isVisible: boolean;
  reference: RefObject<HTMLDivElement>;
  selected: Date | undefined;
  onSelect: SelectSingleEventHandler | undefined;
};

export const DatePicker: FC<TDatePickerProps> = ({
  isVisible,
  reference,
  selected,
  onSelect
}) => {
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
        onSelect={onSelect}
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
