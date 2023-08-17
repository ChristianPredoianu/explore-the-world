import { Outlet, useLocation } from 'react-router-dom';
import Footer from './footer/Footer';

export default function Layout() {
  const location = useLocation();

  return (
    <>
      <Outlet />
      {location.pathname !== '/' && <Footer />}
    </>
  );
}
