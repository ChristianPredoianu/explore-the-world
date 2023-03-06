import MainNav from '@/components/nav/MainNav';
import classes from '@/pages/Home.module.scss';

export default function Home() {
  return (
    <>
      <MainNav />
      <main className={classes.main}>
        <div className={classes.overlay}></div>
      </main>
    </>
  );
}
