import classes from '@/components/nav/CountryDetailsNav.module.scss';

interface CountryDetailsProps {
  flag: string;
  altSpelling: string;
}

export default function CountryDetailsNav({
  flag,
  altSpelling,
}: CountryDetailsProps) {
  return (
    <header className='container'>
      <nav className={classes.nav}>
        <div className={classes.country}>
          <img src={flag} alt='country flag' className={classes.navFlag} />
          <p className={classes.countryName}>{`${altSpelling} Trip`}</p>
        </div>
      </nav>
    </header>
  );
}
