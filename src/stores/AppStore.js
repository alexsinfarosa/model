import ParamsStore from "./ParamsStore";

export default class AppStore {
  fetch;
  constructor(fetcher) {
    this.fetch = fetcher;
    this.paramsStore = new ParamsStore();
  }
}
