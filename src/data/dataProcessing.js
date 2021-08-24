const { parse } = require("node-html-parser");

module.exports = {
  createRepoNames: (data) => {
    const repoNames = [];

    parse(data)
      .querySelectorAll(".repo")
      .forEach((item) => repoNames.push(item.childNodes[0]._rawText));

    return repoNames;
  },
};
