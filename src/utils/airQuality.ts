import { IPollutionInfo } from '@/types/apiTypes.interface';

export function getPolutionInfo(airQualityValue: number): IPollutionInfo {
  if (airQualityValue <= 50) {
    return {
      color: 'hsl(127, 100%, 42%)',
      icon: ['fas', 'smile'],
      level: 'Good',
      desc: 'Air quality is satisfactory, and air pollution poses little or no risk.',
    };
  }
  if (airQualityValue <= 100) {
    return {
      color: 'hsl(46, 100%, 50%)',
      icon: ['fas', 'meh'],
      level: 'Moderate',
      desc: 'Air quality is acceptable. However, there may be a risk for some people, particularly those who are unusually sensitive to air pollution.',
    };
  }
  if (airQualityValue <= 150) {
    return {
      color: 'hsl(41, 89%, 44%)',
      icon: ['fas', 'sad-tear'],
      level: 'Unhealthy for Sensitive Groups',
      desc: 'Members of sensitive groups may experience health effects. The general public is less likely to be affected.',
    };
  }
  if (airQualityValue <= 200) {
    return {
      color: 'hsl(4, 100%, 42%)',
      icon: ['fas', 'sad-tear'],
      level: 'Unhealthy',
      desc: 'Some members of the general public may experience health effects; members of sensitive groups may experience more serious health effects.',
    };
  }
  if (airQualityValue <= 300) {
    return {
      color: 'hsl(274, 100%, 42%)',
      icon: ['fas', 'sad-tear'],
      level: 'Very Unhealthy',
      desc: 'Health alert: The risk of health effects is increased for everyone.',
    };
  }
  return {
    color: 'hsl(353, 62%, 56%)',
    icon: ['fas', 'sad-tear'],
    level: 'Hazardous',
    desc: 'Health warning of emergency conditions: everyone is more likely to be affected.',
  };
}
