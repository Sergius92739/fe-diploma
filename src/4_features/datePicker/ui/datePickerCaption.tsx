import type { FC } from 'react';
import { useNavigation, CaptionProps } from 'react-day-picker';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const DatePickerCaption: FC<CaptionProps> = ({ displayMonth }) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  return (
    <header className="header-caption h-[62px] relative border-b-2 py-3">
      <button
        className="rdp-nav_button_previous absolute left-[25px] top-[13px] w-[36px] h-[36px] flex justify-center items-center"
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
        type="button"
      />
      <h3 className="first-letter:uppercase text-3xl text-center top-[14px]">
        {format(displayMonth, 'LLLL', { locale: ru })}
      </h3>
      <button
        className="rdp-nav_button_next absolute right-[25px] top-[13px] w-[36px] h-[36px] flex justify-center items-center"
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
        type="button"
      />
    </header>
  );
};
