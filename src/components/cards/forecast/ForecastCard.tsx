import { IOpenWeatherForecast } from '@/types/apiTypes.interface';
import classes from '@/components/cards/forecast/ForecastCard.module.scss';

interface ForecastCardProps {
  data: IOpenWeatherForecast;
}

const WEEKDAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

export default function ForecastCard({ data }: ForecastCardProps) {
  function getDayOfWeek() {
    const dayNum = new Date(data.dt * 1000).getDay();
    return WEEKDAYS[dayNum];
  }

  return (
    <article className={classes.card}>
      <h5 className={classes.cardHeading}>{getDayOfWeek()}</h5>
      <img
        src={` https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        alt={'Weather icon'}
        loading='lazy'
      />
      <div className={classes.temperature}>
        <p className={classes.tempMax}>{`${data.main.temp_max.toFixed()} \xBAC`}</p>
        <p className={classes.tempMin}>
          {data.weather[0].main /* `${data.main.temp_min.toFixed()} \xBAC` */}
        </p>
      </div>
    </article>
  );
}
