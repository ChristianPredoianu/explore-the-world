import SocialMediaIcons from '@/components/ui/SocialMediaIcons';
import classNames from 'classnames';
import classes from '@/components/nav/MainNav.module.scss';

export default function MainNav() {
  return (
    <>
      <header className={classNames('container', classes.header)}>
        <nav className={classes.nav}>
          <p className={classes.navLogo}>Wanderlust Adventures</p>
          <SocialMediaIcons />
        </nav>
      </header>
    </>
  );
}
