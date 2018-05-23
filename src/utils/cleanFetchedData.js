import { format, isSameYear, startOfDay, endOfDay } from "date-fns/esm";
import {
  averageMissingValues,
  flatten,
  dailyToHourlyDatesLST,
  dailyToHourlyDates
} from "./utils";

export default (acisData, params) => {
  // tzo
  const tzo = acisData.get("tzo");

  // current station
  const currentStn = acisData.get("currentStn");

  // dates has date of interest +5 days
  let dates = currentStn.map(arr => arr[0]);

  const currentStnValues = averageMissingValues(
    flatten(currentStn.map(arr => arr[1]))
  );

  // sister station
  const sisterStn = acisData.get("sisterStn");
  const sisterStnValues = flatten(sisterStn.map(arr => arr[1]));

  // replace current station values with sister station's
  let replaced = currentStnValues.map(
    (t, i) => (t === "M" ? sisterStnValues[i] : t)
  );

  // if date of interest is in current year
  if (isSameYear(new Date(), new Date(params.dateOfInterest))) {
    const forecast = acisData.get("forecast");
    // dates = forecast.map(arr => arr[0]);

    const forecastValues = flatten(forecast.map(arr => arr[1]));
    const onlyForecastDays = forecastValues.slice(-120).map(t => t.toString());

    // replace missing values with forecast data
    replaced = replaced.map(
      (t, i) => (t === "M" ? forecastValues[i].toString() : t)
    );

    // adding the 5 days forecast data
    replaced = [...replaced, ...onlyForecastDays];
  }

  ///////////////////////////////////////////////////////////////////////////////////////
  // shifting data and transforming it to local time
  // ////////////////////////////////////////////////////////////////////////////////////

  // values go from yyyy-01-01 00:00 to dateOfInterest current hour
  const values = [replaced[23], ...replaced.slice(24, -1)];

  // dates go from yyyy-01-01 to dateOfInterest (yyyy-mm-dd)
  dates = dates.slice(1); // from Jan 1st

  // hourlyDates go from yyyy-01-01 00:00 to dateOfInterest (yyyy-mm-dd 23:00)
  const hourlyDates = dates
    .map(date => dailyToHourlyDates(date))
    .reduce((acc, results) => [...acc, ...results], []);

  // array of indeces where the hour must be shifted
  const arrOFIndeces = hourlyDates.map((hour, i) => {
    const tzoFromDate = parseInt(format(new Date(hour), "Z"), 10);
    return tzoFromDate !== tzo ? i : null;
  });

  // removing null values
  const indices = arrOFIndeces.filter(d => d);

  // the valuesShifted array has the hour shifted
  const valuesShifted = values.map(
    (v, i) => (v in indices ? values[i - 1] : v)
  );

  // generating the array of objects
  const isModelBasedOnHourlyData = false;
  let results = [];
  if (isModelBasedOnHourlyData) {
    hourlyDates.forEach((hour, i) => {
      let p = {};
      p["date"] = new Date(hour);
      p["temp"] = valuesShifted[i];
      results.push(p);
    });
  } else {
    let left = 0;
    let right = 0;
    dates.forEach((date, i) => {
      const numOfHours = dailyToHourlyDatesLST(startOfDay(date), endOfDay(date))
        .length;

      right = left + numOfHours;

      let p = {};
      p["date"] = date;
      p["temps"] = valuesShifted.slice(left, right);

      left += numOfHours;
      results.push(p);
    });
  }
  // console.log(results);
  return results;
};
