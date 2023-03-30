import { useState } from 'react';
import { useFetch } from '@/hooks/useFetch';
import Calendar from 'react-calendar';
import HolidaysList from '@/components/calendar/holidays/HolidaysList';
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
  }&country=${countryCode}&year=${holidayYear}&type=national`;

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [holidayDescription, setHolidayDescription] = useState('');

  const [holidaysData] = useFetch<IHolidaysData>(calendarificUrl);

  function onChange(date: Date | Date[]) {
    if (date instanceof Date) {
      setDate(date);
    }
  }

  function handleHolidayItemClick(date: string, description: string) {
    setCalendarDate(date);
    setHolidayDescription(description);
  }

  function setCalendarDate(date: string) {
    setDate(new Date(date));
  }
  console.log(holidaysData);

  function onActiveStartDateChange({ activeStartDate }: any) {
    setCalendarDate(activeStartDate);
  }

  return (
    <>
      <div className='holidays-wrapper'>
        <div className='calendar-wrapper'>
          <Calendar
            value={date}
            activeStartDate={date}
            onActiveStartDateChange={onActiveStartDateChange}
            onChange={onChange}
          />
        </div>
        <div className='holidays-list-wrapper'>
          {holidaysData && (
            <HolidaysList
              holidaysData={holidaysData.response}
              handleHolidayItemClick={handleHolidayItemClick}
            />
          )}
        </div>
      </div>
      <p className='calendar-description'>{holidayDescription}</p>
    </>
  );
}
