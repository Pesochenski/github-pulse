const axios = require("axios");

import { FetchTypeEnum } from "../enums/FetchTypeEnum";

const browserLink: string = "https://github.com";
const apiLink: string = "https://api.github.com";

const baseLink = {
  [FetchTypeEnum.BROWSER]: browserLink,
  [FetchTypeEnum.API]: apiLink,
};

export const universalFetch = (fetchType: FetchTypeEnum, link: string) => {
  return axios.get([baseLink[fetchType], link].join("/")).catch((err: Error) => err);
};
