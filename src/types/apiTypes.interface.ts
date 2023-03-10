export interface ICountriesPhotos {
  photos: [{ id: number; alt: string; src: { portrait: string } }];
}

export interface ICountryName {
  name: {
    common: string;
  };
}
