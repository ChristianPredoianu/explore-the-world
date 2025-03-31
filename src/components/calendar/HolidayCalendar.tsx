import { useState } from 'react';
import { useFetch } from '@/hooks/useFetch';
import Calendar from 'react-calendar';
import HolidaysList from '@/components/calendar/holidays/HolidaysList';
import { baseCalendarificUrl } from '@/utils/urls';
import { IHolidaysData } from '@/types/apiTypes.interface';
import '@/components/calendar/HolidayCalendar.scss';

interface CalendarProps {
  countryCode: string;
}

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

export default function HolidayCalendar({ countryCode }: CalendarProps) {
  const holidayYear = new Date().getFullYear().toString();

  const calendarificUrl = `${baseCalendarificUrl}&api_key=${
    import.meta.env.VITE_CALENDARIFIC_API_KEY
  }&country=${countryCode}&year=${holidayYear}&type=national`;

  const [date, setDate] = useState<Value>(new Date());
  const [holidayDescription, setHolidayDescription] = useState('');

  const [holidaysData, isLoading, error] = useFetch<IHolidaysData>(calendarificUrl);

  function handleHolidayItemClick(date: string, description: string) {
    setCalendarDate(date);
    setHolidayDescription(description);
  }

  function setCalendarDate(date: string) {
    setDate(new Date(date));
  }

  function onActiveStartDateChange({ activeStartDate }: any) {
    setCalendarDate(activeStartDate);
  }

  const holidaysContent = isLoading ? (
    <div className='loading-indicator'>Loading holidays...</div>
  ) : error ? (
    <div className='error-indicator'>
      Failed to load holidays. Please try again later.
    </div>
  ) : holidaysData?.response ? (
    <HolidaysList
      holidaysData={holidaysData.response}
      onHolidayClick={handleHolidayItemClick}
    />
  ) : (
    <div className='no-data-indicator'>No holidays available</div>
  );

  return (
    <>
      <div className='holidays-wrapper'>
        <div className='calendar-wrapper'>
          <Calendar
            value={date}
            activeStartDate={date instanceof Date ? date : undefined}
            onActiveStartDateChange={onActiveStartDateChange}
            onChange={() => setDate(date)}
          />
        </div>
        <div className='holidays-list-wrapper'>{holidaysContent}</div>
      </div>
      <p className='calendar-description'>{holidayDescription}</p>
    </>
  );
}
