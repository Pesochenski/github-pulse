const getData = require("./api/dataQuery");
const processingData = require("./data/dataProcessing");

/**
 * Async function
 * @param {string} userName Github username
 */
module.exports = async function getPinned(userName) {
  const pinned = [];

  const { data } = await getData.getHTML(userName);
  const repoNames = processingData.createRepoNames(data);

  for (let i = 0; i < repoNames.length; i++) {
    await getData.getRepo(userName, repoNames[i]).then((item) => pinned.push(item.data));
  }

  return pinned;
};
