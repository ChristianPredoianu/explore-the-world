import { useState } from 'react';
import { useFetch } from '@/hooks/useFetch';
import TodaysWeather from '@/components/weather/TodaysWeather';
import WeeksWeather from '@/components/weather/WeeksWeather';
import { IOpenWeatherToday } from '@/types/apiTypes.interface';
import classNames from 'classnames';
import classes from '@/components/weather/Weather.module.scss';

interface WeatherProps {
  latlng: {
    0: number;
    1: number;
  };
}

export function Weather({ latlng }: WeatherProps) {
  const [activeId, setActiveId] = useState(1);

  const openWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&lat=${
    latlng[0]
  }&lon=${latlng[1]}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`;

  const [todayWeatherData, isLoading] =
    useFetch<IOpenWeatherToday[]>(openWeatherUrl);

  const components = [
    {
      id: 1,
      label: 'Todays Weather',
      component: TodaysWeather,
      data: todayWeatherData,
    },
    { id: 2, label: 'Weeks Weather', component: WeeksWeather, data: null },
  ];

  function handleClick(id: number) {
    setActiveId(id);
  }

  const weatherComponent = components.map((component) =>
    component.id === activeId
      ? todayWeatherData && (
          <component.component key={component.id} data={component.data} />
        )
      : null
  );

  return (
    <>
      <ul className={classes.weatherList}>
        {components.map((component) => (
          <li
            key={component.id}
            onClick={() => handleClick(component.id)}
            className={classNames(classes.weatherListItem, {
              [classes.active]: activeId === component.id,
            })}
          >
            {component.label}
          </li>
        ))}
      </ul>
      {weatherComponent}
    </>
  );
}
