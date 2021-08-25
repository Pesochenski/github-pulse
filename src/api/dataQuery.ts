const axios = require("axios");

module.exports = {
  getHTML: async (userName: string) => {
    return await axios.get(`https://github.com/${userName}`).catch((err: Error) => err);
  },
  getRepo: async (userName: string, repoName: string) => {
    return await axios
      .get(`https://api.github.com/repos/${userName}/${repoName}`)
      .catch((err: Error) => err);
  },
};
