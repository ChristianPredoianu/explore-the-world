import SocialMediaIcons from '@/components/ui/social-media-icons/SocialMediaIcons';
import classNames from 'classnames';
import classes from '@/components/footer/Footer.module.scss';

export default function Footer() {
  const pexelsLink = (
    <a
      href='https://www.pexels.com'
      rel='noopener noreferrer nofollow'
      target='_blank'
      className={classes.creditLink}
    >
      <img
        src='https://images.pexels.com/lib/api/pexels-white.png'
        className={classes.creditImg}
      />
    </a>
  );

  const calendarificLink = (
    <a
      href='https://calendarific.com/'
      rel='noopener noreferrer nofollow'
      target='_blank'
      className={classes.creditLink}
    >
      Calendarific
    </a>
  );
  return (
    <footer className={classes.footer}>
      <div className={classNames('container', classes.footerWrapper)}>
        <div className={classes.credits}>
          <p className={classes.description}>Credits</p>
          <div className={classes.credit}>{pexelsLink}</div>
          <div className={classes.credit}>{calendarificLink}</div>
        </div>
        <div className={classes.socials}>
          <SocialMediaIcons />
        </div>
      </div>
    </footer>
  );
}
