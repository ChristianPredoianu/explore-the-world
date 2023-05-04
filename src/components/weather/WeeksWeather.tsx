import ForecastCard from '@/components/cards/forecast/ForecastCard';
import { IOpenWeatherForecast } from '@/types/apiTypes.interface';

interface WeeksWeatherProps {
  data: IOpenWeatherForecast[];
}

export default function WeeksWeather({ data }: WeeksWeatherProps) {
  return (
    <>
      {data.map((day) => (
        <ForecastCard data={day} key={day.dt} />
      ))}
    </>
  );
}
