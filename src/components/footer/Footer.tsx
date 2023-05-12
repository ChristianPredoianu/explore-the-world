import classes from '@/components/footer/Footer.module.scss';

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className='container'>
        <div className={classes.socials}></div>
        <div className={classes.credits}></div>
      </div>
    </footer>
  );
}
