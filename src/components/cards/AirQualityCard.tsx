import { useFetch } from '@/hooks/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { baseAirVisualUrl } from '@/utils/urls';
import { IAirQualityData, IPollutionInfo } from '@/types/apiTypes.interface';
import classes from '@/components/cards/AirQualityCard.module.scss';

interface AirQualityCardProps {
  coords: number[];
  country: string;
}

export default function AirQualityCard({ coords, country }: AirQualityCardProps) {
  const airVisualUrl = `${baseAirVisualUrl}lat=${coords[0]}&lon=${coords[1]}&key=${
    import.meta.env.VITE_AIRVISUAL_API_KEY
  }`;

  const [airQualityData, error] = useFetch<IAirQualityData>(airVisualUrl);

  let pollutionInfo!: IPollutionInfo;

  if (airQualityData) {
    const airQualityValue: number = airQualityData.data.current.pollution.aqius;

    switch (true) {
      case airQualityValue <= 50:
        pollutionInfo = {
          color: 'hsl(127, 100%, 42%)',
          icon: ['fas', 'smile'],
          level: 'Good',
          desc: 'Air quality is satisfactory, and air pollution poses little or no risk.',
        };
        break;
      case airQualityValue > 50 && airQualityValue <= 100:
        pollutionInfo = {
          color: 'hsl(46, 100%, 50%)',
          icon: ['fas', 'meh'],
          level: 'Moderate',
          desc: 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.',
        };
        break;
      case airQualityValue > 100 && airQualityValue <= 150:
        pollutionInfo = {
          color: 'hsl(41, 89%, 44%)',
          icon: ['fas', 'sad-tear'],
          level: 'Unhealthy for Sensitive Groups',
          desc: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.',
        };
        break;
      case airQualityValue > 150 && airQualityValue <= 200:
        pollutionInfo = {
          color: 'hsl(4, 100%, 42%)',
          icon: ['fas', 'sad-tear'],
          level: 'Unhealthy',
          desc: 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.',
        };
        break;
      case airQualityValue > 200 && airQualityValue <= 300:
        pollutionInfo = {
          color: 'hsl(274, 100%, 42%)',
          icon: ['fas', 'sad-tear'],
          level: 'Very Unhealthy',
          desc: 'Health alert: The risk of health effects is increased for everyone.',
        };
        break;
      case airQualityValue < 300:
        pollutionInfo = {
          color: 'hsl(353, 62%, 56%)',
          icon: ['fas', 'sad-tear'],
          level: 'Hazardous',
          desc: 'Health warning of emergency conditions: everyone is more likely to be affected.',
        };
        break;
    }
  }

  let airQualityError;

  if (error)
    airQualityError = (
      <p className={classes.error}>
        {`There is no air quality data avaliable for ${country}`}
      </p>
    );

  let airQualityCard;

  if (airQualityData) {
    airQualityCard = (
      <article className={classes.card}>
        <div
          style={{ backgroundColor: pollutionInfo.color }}
          className={classes.cardHeadingsWrapper}
        >
          <FontAwesomeIcon icon={pollutionInfo.icon} className={classes.icon} />
          <div className={classes.headings}>
            <h5 className={classes.cardHeading}>{airQualityData.data.city}</h5>
            <h6 className={classes.cardSubheading}>{pollutionInfo.level}</h6>
          </div>
        </div>
        <div className={classes.cardMain}>
          <h6 className={classes.cardMainHeading}>Air Quality</h6>
          <div className={classes.valuesWrapper}>
            <div className={classes.value}>
              <span
                style={{ backgroundColor: pollutionInfo.color }}
                className={classes.dot}
              ></span>
              <p className={classes.qualityValue}>
                {airQualityData.data.current.pollution.aqius}
              </p>
            </div>
            <p className={classes.qualityDescription}>{pollutionInfo.desc}</p>
          </div>
        </div>
      </article>
    );
  }

  return (
    <>
      {airQualityError}
      {!error && airQualityCard}
    </>
  );
}
