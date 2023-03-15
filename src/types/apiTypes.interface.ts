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
}

export interface ICountryDetails {
  flags: {
    png: string;
  };
  altSpellings: string;
  name: { common: string };
  latlng: {
    0: number;
    1: number;
  };
  capital: string;

  translations: {
    deu: {
      common: string;
    };
    jpn: {
      common: string;
    };
    ara: {
      common: string;
    };
    fra: {
      common: string;
    };
    rus: {
      common: string;
    };
    spa: {
      common: string;
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
  }[];
}
[];
