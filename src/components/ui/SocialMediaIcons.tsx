import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classes from '@/components/ui/SocialMediaIcons.module.scss';

export default function SocialMediaIcons() {
  return (
    <div className={classes.socialMediaIcons}>
      <FontAwesomeIcon icon={['fab', 'facebook']} className={classes.icon} />
      <FontAwesomeIcon icon={['fab', 'instagram']} className={classes.icon} />
      <FontAwesomeIcon icon={['fab', 'youtube']} className={classes.icon} />
    </div>
  );
}
