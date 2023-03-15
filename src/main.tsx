import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Home, { fetchData } from '@/pages/Home';
import ErrorPage from '@/pages/error-page/ErrorPage';
import CountryDetails, { fetchCountryDetails } from '@/pages/CountryDetails';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab, faFacebook } from '@fortawesome/free-brands-svg-icons';
import {
  faAngleLeft,
  faAngleRight,
  faMagnifyingGlass,
  faWind,
} from '@fortawesome/free-solid-svg-icons';
import '@/sass/main.scss';

library.add(
  fab,
  faFacebook,
  faAngleLeft,
  faAngleRight,
  faMagnifyingGlass,
  faWind
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path='/'
        loader={fetchData}
        element={<Home />}
        errorElement={<ErrorPage />}
      />
      <Route
        path='country/:countryId'
        element={<CountryDetails />}
        loader={fetchCountryDetails}
        errorElement={<ErrorPage />}
      />
    </>
  )
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
