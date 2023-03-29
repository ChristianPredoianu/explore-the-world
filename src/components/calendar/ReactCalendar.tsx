import { useState } from 'react';
import { useFetch } from '@/hooks/useFetch';
import Calendar from 'react-calendar';
import { baseCalendarificUrl } from '@/utils/urls';
import { IHolidaysData } from '@/types/apiTypes.interface';
import '@/components/calendar/ReactCalendar.scss';

interface CalendarProps {
  countryCode: string;
}

export default function ReactCalendar({ countryCode }: CalendarProps) {
  const holidayYear = '2023';

  const calendarificUrl = `${baseCalendarificUrl}&api_key=${
    import.meta.env.VITE_CALENDARIFIC_API_KEY
  }&country=${countryCode}&year=${holidayYear}`;

  const [value, setValue] = useState(new Date());

  const [holidaysData] = useFetch<IHolidaysData>(calendarificUrl);

  function onChange(date: Date | Date[]) {
    if (date instanceof Date) {
      setValue(date);
      console.log(date);
    }
  }

  return (
    <>
      <Calendar onChange={onChange} value={value} />
    </>
  );
}
