import { useFetch } from '@/hooks/useFetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { baseAirVisualUrl } from '@/utils/urls';
import { IAirQualityData, IPollutionInfo } from '@/types/apiTypes.interface';
import { getPolutionInfo } from '@/utils/airQuality';
import classes from '@/components/cards/air-quality/AirQualityCard.module.scss';

interface AirQualityCardProps {
  coords: number[];
  country: string;
}

export default function AirQualityCard({ coords, country }: AirQualityCardProps) {
  const airVisualUrl = `${baseAirVisualUrl}lat=${coords[0]}&lon=${coords[1]}&key=${
    import.meta.env.VITE_AIRVISUAL_API_KEY
  }`;

  const [airQualityData, error] = useFetch<IAirQualityData>(airVisualUrl);

  let pollutionInfo: IPollutionInfo | undefined;

  if (airQualityData) {
    const airQualityValue = airQualityData.data.current.pollution.aqius;
    pollutionInfo = getPolutionInfo(airQualityValue);
  }

  let airQualityError;

  if (error) {
    airQualityError = (
      <p className={classes.error}>
        {`There is no air quality data available for ${country}`}
      </p>
    );
  }

  let airQualityCard;

  if (airQualityData && pollutionInfo) {
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
