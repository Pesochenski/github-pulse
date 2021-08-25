const axios = require("axios");

module.exports = {
  getHTML: (userName: string) => {
    return axios.get(`https://github.com/${userName}`).catch((err: Error) => err);
  },
  getRepo: (userName: string, repoName: string) => {
    return axios
      .get(`https://api.github.com/repos/${userName}/${repoName}`)
      .catch((err: Error) => err);
  },
};
