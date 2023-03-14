import { useState } from 'react';
import TodaysWeather from '@/components/weather/TodaysWeather';
import WeeksWeather from '@/components/weather/WeeksWeather';
import classNames from 'classnames';
import classes from '@/components/weather/Weather.module.scss';

export function Weather() {
  const [component, setComponent] = useState(<TodaysWeather />);
  const [isActive, setIsActive] = useState(true);

  function test(component) {
    setComponent(component);
  }

  return (
    <>
      <ul className={classes.weatherList}>
        <li
          onClick={() => test(<TodaysWeather />)}
          className={classNames(classes.weatherListItem, {
            [classes.active]: isActive,
          })}
        >
          Todays Weather
        </li>
        <li
          onClick={() => test(<WeeksWeather />)}
          className={classes.weatherListItem}
        >
          Weeks Weather
        </li>
      </ul>
      {component}
    </>
  );
}
