import classes from '@/components/cards/TodaysWeatherCard.module.scss';

interface TodaysWeatherCardProps {
  cardHeading: string;
  descriptionOne: string;
  valueOne: string | number;
  cardIcon: string;
  descriptionTwo: string;
  valueTwo?: string | number | null;
  children?: React.ReactNode;
}

export default function TodaysWeatherCard({
  cardHeading,
  descriptionOne,
  valueOne,
  cardIcon,
  descriptionTwo,
  valueTwo,
  children,
}: TodaysWeatherCardProps) {
  return (
    <article className={classes.card}>
      <h5 className={classes.cardHeading}>{cardHeading}</h5>
      {children}
      <img src={cardIcon} alt='weather icon' />
      <div>
        <h6 className={classes.cardDescription}>{descriptionOne}</h6>
        <p className={classes.cardValue}>{valueOne}</p>
        <h6 className={classes.cardDescription}>{descriptionTwo}</h6>
        <p className={classes.cardValue}>{valueTwo}</p>
      </div>
    </article>
  );
}
