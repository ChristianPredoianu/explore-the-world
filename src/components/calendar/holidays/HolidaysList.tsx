import HolidaysListItem from '@/components/calendar/holidays/HolidaysListItem';
import classses from '@/components/calendar/holidays/HolidaysList.module.scss';

interface HolidaysListProps {
  holidaysData: {
    holidays: {
      name: string;
      description: string;
      id: number;
      date: {
        iso: string;
      };
    }[];
  };

  handleHolidayItemClick: (date: string, description: string) => void;
}

export default function HolidaysList({
  holidaysData,
  handleHolidayItemClick,
}: HolidaysListProps) {
  function addIdToHolidaysData() {
    const holidaysDataWithIds = holidaysData.holidays.map((holiday, i) => {
      return {
        ...holiday,
        id: i + 1,
      };
    });

    return holidaysDataWithIds;
  }

  const holidaysListItems = addIdToHolidaysData().map((holiday) => (
    <HolidaysListItem
      key={holiday.id}
      holiday={holiday}
      handleHolidayItemClick={handleHolidayItemClick}
    />
  ));
  return <ul className={classses.holidaysList}>{holidaysListItems}</ul>;
}
