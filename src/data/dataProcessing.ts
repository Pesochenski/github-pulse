const { parse } = require("node-html-parser");

module.exports = {
  createRepoNames: (data: string) => {
    const repoNames: string[] = [];

    parse(data)
      .querySelectorAll(".repo")
      .forEach((item: any) => repoNames.push(item.childNodes[0]._rawText));

    return repoNames;
  },
};
