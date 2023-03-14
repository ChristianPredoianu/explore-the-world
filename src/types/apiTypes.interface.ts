export interface ICountriesImages {
  photos: [{ id: number; alt: string; src: { portrait: string } }];
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
  data: [ICountryDetails[], ICountriesImages[]];
}
