import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface ICountriesImages {
  photos: {
    id: number;
    alt: string;
    src: { portrait: string; small: string; large2x: string };
  }[];
}

export interface ICountryName {
  name: {
    common: string;
  };
  cca2: string;
}

export interface ICountryDetails {
  flags: {
    png: string;
  };
  altSpellings: string;
  name: { common: string };
  latlng: number[];
  capital: string;
  cca2: string;
  currencies: {
    symbol: string;
  };
  translations: {
    deu: {
      common: string;
      official: string;
    };
    jpn: {
      common: string;
      official: string;
    };
    ara: {
      common: string;
      official: string;
    };
    fra: {
      common: string;
      official: string;
    };
    rus: {
      common: string;
      official: string;
    };
    spa: {
      common: string;
      official: string;
    };
  };
}

export interface ICountryDetailsData {
  data: [ICountryDetails[], ICountriesImages];
}

export interface IOpenWeatherToday {
  main: {
    feels_like: number;
    temp: number;
  };
  sys: {
    sunrise: number;
    sunset: number;
  };
  weather: {
    0: {
      main: string;
      description: string;
      icon: string;
    };
  };
  wind: {
    deg: number;
    speed: number;
    gust: number;
  };
}

export interface IOpenWeatherForecastList {
  list: [];
}

export interface IOpenWeatherForecast {
  dt: number;
  main: {
    temp_max: number;
    temp_min: number;
  };

  weather: {
    icon: string;
    main: string;
  }[];
}
[];

export interface IAirQualityData {
  data: {
    city: string;
    current: {
      pollution: {
        aqius: number;
      };
    };
  };
}

export interface IPollutionInfo {
  color: string;
  icon: IconProp;
  level: string;
  desc: string;
}

export interface IHolidaysData {
  response: {
    holidays: {
      id: number;
      name: string;
      description: string;
      date: {
        iso: string;
      };
    }[];
  };
}

export interface IExchangeRates {
  [key: string]: {
    [key: string]: number;
  };
}
