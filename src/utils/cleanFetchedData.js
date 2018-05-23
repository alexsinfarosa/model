import { isSameYear, getHours, startOfDay, endOfDay } from "date-fns/esm";
import {
  averageMissingValues,
  flatten,
  unflatten,
  dailyToHourlyDates
} from "./utils";

export default (acisData, params) => {
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

  replaced = averageMissingValues(replaced);

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

  // Since data comes back as 1am-24am, we need to shift the arry [0,23] one hour forward
  const firstValue = replaced[23];
  // Replaced array starts from Jan 1st
  replaced = [firstValue, ...replaced.slice(24, -1)];
  dates = dates.slice(1); // from Jan 1st

  // split each day is an array of hourly dates. In local time
  const datesUnflattened = dates.map(date => {
    return dailyToHourlyDates(startOfDay(date), endOfDay(date));
  });

  // unflatted arrays of temp values
  const replacedUnflattened = unflatten(replaced);

  const isModelBasedOnHourlyData = false;
  let results = [];
  if (isModelBasedOnHourlyData) {
    // matches the hourly dates (local time) with the correct value in the arr
    datesUnflattened.forEach((dayArr, i) => {
      dayArr.forEach((h, j) => {
        const time = getHours(h);
        let p = {};
        p.date = h;
        p.temp = replacedUnflattened[i][time];
        // console.log(p);
        results.push(p);
      });
    });
  } else {
    dates.forEach((date, i) => {
      let temps = replacedUnflattened[i];
      const numOfHoursInADay = dailyToHourlyDates(
        startOfDay(date),
        endOfDay(date)
      );

      if (numOfHoursInADay.length !== 24) {
        temps = numOfHoursInADay.map(date => {
          const hour = getHours(date);
          return temps[hour];
        });
      }

      let p = {};
      p["date"] = date;
      p["temps"] = temps;

      // console.log(p);
      results.push(p);
    });
  }
  // console.log(results);
  return results;
};
