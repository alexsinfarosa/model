import { baskervilleEmin } from "./utils";

export default (cleanedData, asJson) => {
  const arr = [...cleanedData.entries()];
  const dates = arr.map(d => d[0]);
  const hrTemps = arr.map(d => d[1]);

  let results = [];
  const base = 50;
  let cdd = 0;
  let missingDays = [];
  hrTemps.forEach((arr, i) => {
    const countMissinValues = arr.filter(v => v === "M");

    let min, max, avg;
    let p = {};

    if (countMissinValues.length < 5) {
      const filtered = arr.filter(v => v !== "M");
      min = Math.min(...filtered);
      max = Math.max(...filtered);
      avg = (min + max) / 2;

      // calculate dd (degree day)
      // const dd = avg - base > 0 ? avg - base : 0;
      const dd = baskervilleEmin(min, max, base);

      // accumulation from Jannuary 1st
      cdd += dd;

      p.date = dates[i];
      p.dd = dd.toFixed(0);
      p.cdd = cdd.toFixed(0);
      p.min = min.toFixed(0);
      p.avg = avg.toFixed(0);
      p.max = max.toFixed(0);
    } else {
      missingDays.push(dates[i]);
      p.date = dates[i];
      p.dd = "N/A";
      p.cdd = "N/A";
      p.min = "N/A";
      p.avg = "N/A";
      p.max = "N/A";
    }
    results.push(p);
  });

  // console.log({ results, missingDays });
  return { results, missingDays };
};
