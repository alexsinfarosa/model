import { decorate, computed } from "mobx";
import { baskervilleEmin } from "../utils/utils";
import { format } from "date-fns/esm";

export default class CurrentModel {
  paramsStore;
  constructor(appStore) {
    this.paramsStore = appStore.paramsStore;
  }

  // data from paramsStore -------------------------------------------------------
  get data() {
    return this.paramsStore.data;
  }

  // current model ---------------------------------------------------------------
  get modelData() {
    const base = 50;
    let cdd = 0;
    let missingDays = [];
    return this.data.map(obj => {
      const { date, temps } = obj;
      const countMissingValues = temps.filter(t => t === "M").length;
      // console.log(date, temps, countMissingValues);
      let p = {};

      if (countMissingValues < 5) {
        const tempsFiltered = temps.filter(t => t !== "M");
        const min = Math.min(...tempsFiltered);
        const max = Math.max(...tempsFiltered);
        const avg = (min + max) / 2;

        // calculate degree day
        const dd = baskervilleEmin(min, max, base);

        // cumulative degree day
        cdd += dd;

        p["date"] = date;
        p["min"] = min.toFixed(1);
        p["max"] = max.toFixed(1);
        p["avg"] = avg.toFixed(1);
        p["dd"] = dd.toFixed(1);
        p["cdd"] = cdd.toFixed(1);
      } else {
        missingDays.push(date);
        p["date"] = date;
        p["min"] = "N/A";
        p["max"] = "N/A";
        p["avg"] = "N/A";
        p["dd"] = "N/A";
        p["cdd"] = "N/A";
      }
      // console.log(p);
      return { p, missingDays };
    });
  }

  get dataForTable() {
    const dateOfInterest = format(
      this.paramsStore.params.dateOfInterest,
      "YYYY-MM-DD"
    );
    const dates = this.modelData.map(d => d.p.date);
    const dateOfInterestIdx = dates.indexOf(dateOfInterest);

    // this.modelData.map(d => console.log(d));
    return this.modelData
      .slice(dateOfInterestIdx - 2, dateOfInterestIdx + 6)
      .map(d => d.p);
  }

  get missingDays() {
    return this.modelData[0].missingDays;
  }
}

decorate(CurrentModel, {
  data: computed,
  modelData: computed,
  dataForTable: computed,
  missingDays: computed
});
