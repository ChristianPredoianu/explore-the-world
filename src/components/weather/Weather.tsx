import { useState, useRef, useEffect } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { CSSTransition } from 'react-transition-group';
import TodaysWeather from '@/components/weather/TodaysWeather';
import WeeksWeather from '@/components/weather/WeeksWeather';
import { baseOpenWeatherUrl, baseOpenWeatherForecastUrl } from '@/utils/urls';
import {
  IOpenWeatherToday,
  IOpenWeatherForecast,
  IOpenWeatherForecastList,
} from '@/types/apiTypes.interface';
import classNames from 'classnames';
import classes from '@/components/weather/Weather.module.scss';
import '@/components/weather/CssTransitions.scss';

interface WeatherProps {
  latlng: number[];
}

export function Weather({ latlng }: WeatherProps) {
  const [activeWeatherComponent, setActiveWeatherComponent] = useState(1);
  const [showWeatherComponent, setShowWeatherComponent] = useState(true);

  const openWeatherTodayUrl = `${baseOpenWeatherUrl}&lat=${latlng[0]}&lon=${
    latlng[1]
  }&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`;

  const openWeatherForecastUrl = `${baseOpenWeatherForecastUrl}&lat=${latlng[0]}&lon=${
    latlng[1]
  }&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`;

  const [todayWeatherData] = useFetch<IOpenWeatherToday>(openWeatherTodayUrl);
  const [forecastData] = useFetch<IOpenWeatherForecastList>(openWeatherForecastUrl);

  const nodeRef = useRef(null);

  function changeComponent(id: number) {
    setActiveWeatherComponent(id);
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

  let weatherComponent;

  const fiveDaysForecast = getFiveDaysForecast();

  if (todayWeatherData && fiveDaysForecast) {
    if (activeWeatherComponent === 1) {
      weatherComponent = <TodaysWeather data={todayWeatherData} />;
    } else {
      weatherComponent = <WeeksWeather data={fiveDaysForecast} />;
    }
  }

  const weatherBtns = [
    { id: 1, label: 'Todays Weather' },
    { id: 2, label: '5-days Forecast' },
  ];

  const weatherCta = weatherBtns.map((weatherBtn) => (
    <button
      key={weatherBtn.id}
      className={classNames(classes.weatherBtn, {
        [classes.active]: activeWeatherComponent === weatherBtn.id,
      })}
      onClick={() => changeComponent(weatherBtn.id)}
    >
      {weatherBtn.label}
    </button>
  ));

  useEffect(() => {
    setShowWeatherComponent(false);

    setTimeout(() => {
      setShowWeatherComponent(true);
    }, 100);
  }, [activeWeatherComponent]);

  return (
    <>
      <div className={classes.weatherBtns}>{weatherCta}</div>
      <CSSTransition
        in={showWeatherComponent}
        nodeRef={nodeRef}
        timeout={300}
        classNames='slide'
        unmountOnExit
      >
        <div className={classes.cards} ref={nodeRef}>
          {weatherComponent}
        </div>
      </CSSTransition>
    </>
  );
}
