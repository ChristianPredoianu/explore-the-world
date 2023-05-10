import classes from '@/components/ui/air-quality-table/AirQualityTable.module.scss';

export default function AirQualityTable() {
  return (
    <div className={classes.tableWrapper}>
      <table className={classes.table}>
        <thead>
          <tr className={classes.tableRow}>
            <th className={classes.tableHeader}>Category</th>
            <th className={classes.tableHeader}>AQI Range</th>
            <th className={classes.tableHeader}>Health Effects</th>
          </tr>
        </thead>
        <tbody>
          <tr className={classes.tableRow}>
            <td className={classes.tableData}>Good</td>
            <td className={classes.tableData}>0-50</td>
            <td className={classes.tableData}>
              Air quality is considered satisfactory, and air pollution poses little or no
              risk.
            </td>
          </tr>
          <tr className={classes.tableRow}>
            <td className={classes.tableData}>Moderate</td>
            <td className={classes.tableData}>51-100</td>
            <td className={classes.tableData}>
              Air quality is acceptable; however, for some pollutants, there may be a
              moderate health concern for a very small number of people who are unusually
              sensitive to air pollution.
            </td>
          </tr>
          <tr className={classes.tableRow}>
            <td className={classes.tableData}>Unhealthy for Sensitive Groups</td>
            <td className={classes.tableData}>101-150</td>
            <td className={classes.tableData}>
              Members of sensitive groups may experience health effects. The general
              public is less likely to be affected.
            </td>
          </tr>
          <tr className={classes.tableRow}>
            <td className={classes.tableData}>Unhealthy</td>
            <td className={classes.tableData}>151-200</td>
            <td className={classes.tableData}>
              Everyone may begin to experience health effects; members of sensitive groups
              may experience more serious health effects.
            </td>
          </tr>
          <tr className={classes.tableRow}>
            <td className={classes.tableData}>Very Unhealthy</td>
            <td className={classes.tableData}>201-300</td>
            <td className={classes.tableData}>
              Health warnings of emergency conditions. The entire population is more
              likely to be affected.
            </td>
          </tr>
          <tr className={classes.tableRow}>
            <td className={classes.tableData}>Hazardous</td>
            <td className={classes.tableData}>301-500</td>
            <td className={classes.tableData}>
              Health alert: everyone may experience more serious health effects.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
