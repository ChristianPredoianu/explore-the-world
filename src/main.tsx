import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Layout from '@/components/Layout';
const Home = React.lazy(() => import('@/pages/Home'));
const CountryDetails = React.lazy(() => import('@/pages/CountryDetails'));
import { fetchData } from '@/pages/Home';
import LoadingSpinner from '@/components/ui/loading-spinner/LoadingSpinner';
import ErrorPage from '@/pages/error-page/ErrorPage';
import { fetchCountryDetails } from '@/pages/CountryDetails';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab, faFacebook } from '@fortawesome/free-brands-svg-icons';
import {
  faAngleLeft,
  faAngleRight,
  faFaceMeh,
  faFaceSadTear,
  faFaceSmile,
  faMagnifyingGlass,
  faWind,
  faRepeat,
  faChevronDown,
  faChevronUp,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import '@/sass/main.scss';

library.add(
  fab,
  faFacebook,
  faAngleLeft,
  faAngleRight,
  faMagnifyingGlass,
  faWind,
  faFaceMeh,
  faFaceSadTear,
  faFaceSmile,
  faRepeat,
  faChevronDown,
  faChevronUp,
  faXmark
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />} errorElement={<ErrorPage />}>
      <Route
        path='/'
        loader={async () => {
          const { fetchData } = await import('@/pages/Home');
          return fetchData();
        }}
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        }
      />
      <Route
        path='country/:countryId'
        loader={async (args) => {
          const { fetchCountryDetails } = await import('@/pages/CountryDetails');
          return fetchCountryDetails(args.params.countryId!);
        }}
        element={
          <Suspense fallback={<LoadingSpinner />}>
            <CountryDetails />
          </Suspense>
        }
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')! as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
