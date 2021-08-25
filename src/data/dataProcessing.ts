const { parse } = require("node-html-parser");

module.exports = {
  createRepoNames: (data: string) => {
    const repoNames: string[] = parse(data)
      .querySelectorAll(".repo")
      .map((item: any) => item.childNodes[0]._rawText);

    return repoNames;
  },
};
