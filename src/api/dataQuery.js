const axios = require("axios");

module.exports = {
  getHTML: async (userName) => {
    return await axios.get(`https://github.com/${userName}`).catch((err) => err);
  },
  getRepo: async (userName, repoName) => {
    return await axios
      .get(`https://api.github.com/repos/${userName}/${repoName}`)
      .catch((err) => err);
  },
};
