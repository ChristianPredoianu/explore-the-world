import SocialMediaIcons from '@/components/ui/SocialMediaIcons';
import classes from '@/components/nav/MainNav.module.scss';
import classNames from 'classnames';

export default function MainNav() {
  return (
    <>
      <header className={classNames('container', classes.header)}>
        <nav className={classes.nav}>
          <p className={classes.navLogo}>Explorer</p>
          <SocialMediaIcons />
        </nav>
      </header>
    </>
  );
}
