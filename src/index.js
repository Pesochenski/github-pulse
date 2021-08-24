const getData = require("./api/dataQuery");
const processingData = require("./data/dataProcessing");

/**
 * Async function
 * @param {string} userName Github username
 */
module.exports = async function getPinned(userName) {
  const pinned = [];

  const res = await getData.getHTML(userName);

  if (res.status === 200) {
    const repoNames = processingData.createRepoNames(res.data);

    for (let i = 0; i < repoNames.length; i++) {
      await getData.getRepo(userName, repoNames[i]).then((item) => pinned.push(item.data));
    }
  } else {
    return new Error("Connection error");
  }

  return pinned;
};
