import { IOpenWeatherForecast } from '@/types/apiTypes.interface';
import classes from '@/components/cards/ForecastCard.module.scss';

interface ForecastCardProps {
  data: IOpenWeatherForecast;
}

const days = [
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
    const dayOfWeek = days[dayNum];
    return dayOfWeek;
  }

  return (
    <>
      <article className={classes.card}>
        <h5 className={classes.cardHeading}>{getDayOfWeek()}</h5>
        <img
          src={` https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt='weather icon'
        />
        <div className={classes.temperature}>
          <p className={classes.tempMax}>{`${data.main.temp_max.toFixed()} \xBAC`}</p>
          <p className={classes.tempMin}>{`${data.main.temp_min.toFixed()} \xBAC`}</p>
        </div>
      </article>
    </>
  );
}
