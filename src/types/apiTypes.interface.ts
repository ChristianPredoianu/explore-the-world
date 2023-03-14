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
  name: {
    common: string;
  };
  capital: string;
}

export interface ICountryDetailsData {
  data: [ICountryDetails[], ICountriesImages[]];
}
