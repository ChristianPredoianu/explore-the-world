import { IOpenWeatherToday } from '@/types/apiTypes.interface';

import Card from '@/components/cards/TodaysWeatherCard';
import classes from '@/components/weather/TodaysWeather.module.scss';

interface TodaysWeatherProps {
  data: IOpenWeatherToday;
}

function toTimeString(totalSeconds: number) {
  const totalMs = totalSeconds * 1000;
  const result = new Date(totalMs).toISOString().slice(11, 19);

  return result;
}

export default function TodaysWeather({ data }: TodaysWeatherProps) {
  return (
    <>
      <Card
        cardHeading='Weather'
        descriptionOne='Temperature'
        valueOne={`${data.main.temp.toFixed()} \xBAC`}
        cardIcon={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
        descriptionTwo='Feels like'
        valueTwo={`${data.main.feels_like.toFixed()} \xBAC`}
      >
        <p className={classes.cardChild}>{data.weather[0].main}</p>
      </Card>
      <Card
        cardHeading='Sunrise - Sunset'
        descriptionOne='Sunrise'
        valueOne={toTimeString(data.sys.sunrise)}
        cardIcon='https://openweathermap.org/img/wn/01d@2x.png'
        descriptionTwo='Sunset'
        valueTwo={toTimeString(data.sys.sunset)}
      />
      <Card
        cardHeading='Wind'
        descriptionOne='Wind speed'
        valueOne={`${data.wind.speed.toFixed()} m/s`}
        cardIcon='https://openweathermap.org/img/wn/50d@2x.png'
        descriptionTwo='gust'
        valueTwo={data.wind.gust.toFixed()}
      />
    </>
  );
}
