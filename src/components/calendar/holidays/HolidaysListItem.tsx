import classes from '@/components/calendar/holidays/HolidaysListItem.module.scss';

interface HolidaysListItemProps {
  holiday: {
    name: string;
    description: string;
    date: {
      iso: string;
    };
  };

  handleHolidayItemClick: (date: string, desctription: string) => void;
}

export default function HolidaysListItem({
  holiday,
  handleHolidayItemClick,
}: HolidaysListItemProps) {
  return (
    <li
      className={classes.holidayListItem}
      onClick={() => handleHolidayItemClick(holiday.date.iso, holiday.description)}
    >
      {holiday.name}
    </li>
  );
}
