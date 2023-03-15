import { useState, useRef, useEffect } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { CSSTransition } from 'react-transition-group';
import TodaysWeather from '@/components/weather/TodaysWeather';
import WeeksWeather from '@/components/weather/WeeksWeather';
import {
  IOpenWeatherToday,
  IOpenWeatherForecast,
  IOpenWeatherForecastList,
} from '@/types/apiTypes.interface';
import classNames from 'classnames';
import classes from '@/components/weather/Weather.module.scss';
import '@/components/weather/Test.scss';

interface WeatherProps {
  latlng: {
    0: number;
    1: number;
  };
}

export function Weather({ latlng }: WeatherProps) {
  const [activeId, setActiveId] = useState(1);
  const [showWeatherComponent, setShowWeatherComponent] = useState(true);

  const openWeatherTodayUrl = `https://api.openweathermap.org/data/2.5/weather?&units=metric&lat=${
    latlng[0]
  }&lon=${latlng[1]}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`;

  const openWeatherForecastUrl = `https://api.openweathermap.org/data/2.5/forecast?&units=metric&lat=${
    latlng[0]
  }&lon=${latlng[1]}&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`;

  const [todayWeatherData] = useFetch<IOpenWeatherToday>(openWeatherTodayUrl);

  const [forecastData] = useFetch<IOpenWeatherForecastList[]>(
    openWeatherForecastUrl
  );

  const nodeRef = useRef(null);

  const fiveDaysForecast = getFiveDaysForecast();

  const components = [
    {
      id: 1,
      label: 'Todays Weather',
      component: TodaysWeather,
      data: todayWeatherData,
    },
    {
      id: 2,
      label: 'Weeks Weather',
      component: WeeksWeather,
      data: fiveDaysForecast,
    },
  ];

  function changeComponent(id: number) {
    setActiveId(id);
  }

  function getFiveDaysForecast() {
    let forecastDataFiveDays: IOpenWeatherForecast[] = [];

    if (forecastData) {
      for (var i = 0; i < forecastData.list.length; i += 8) {
        forecastDataFiveDays.push(forecastData.list[i]);
      }
    }

    return forecastDataFiveDays;
  }

  const weatherComponent = components.map((component) =>
    component.id === activeId
      ? component.data && (
          <component.component
            key={component.id}
            data={component.data}
            ref={nodeRef}
            /* onClose={() => setShowWeatherComponent(false)} */
          />
        )
      : null
  );

  useEffect(() => {
    setShowWeatherComponent(false);
    setTimeout(() => {
      setShowWeatherComponent(true);
    }, 500);

    console.log(activeId);
    console.log(showWeatherComponent);
  }, [activeId]);

  return (
    <>
      <ul className={classes.weatherList}>
        {components.map((component) => (
          <li
            key={component.id}
            onClick={() => changeComponent(component.id)}
            className={classNames(classes.weatherListItem, {
              [classes.active]: activeId === component.id,
            })}
          >
            {component.label}
          </li>
        ))}
      </ul>
      <CSSTransition
        in={showWeatherComponent}
        nodeRef={nodeRef}
        timeout={300}
        classNames='alert'
        unmountOnExit
        /*    onEnter={() => setShowWeatherComponent(true)}
        onExited={() => setShowWeatherComponent(false)} */
      >
        <div className={classes.cards} ref={nodeRef}>
          {weatherComponent}
        </div>
      </CSSTransition>
    </>
  );
}
