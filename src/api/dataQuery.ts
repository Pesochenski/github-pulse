const axios = require("axios");

export const getData = {
  getHTML: (link: string) => {
    return axios.get(`https://github.com/${link}`).catch((err: Error) => err);
  },
  getRepo: (userName: string, repoName: string) => {
    return axios
      .get(`https://api.github.com/repos/${userName}/${repoName}`)
      .catch((err: Error) => err);
  },
};
