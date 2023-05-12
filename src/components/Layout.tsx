import { Outlet } from 'react-router-dom';
import Footer from './footer/Footer';

export default function Layout() {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
}