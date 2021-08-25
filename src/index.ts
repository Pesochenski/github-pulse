import { repoInterface } from "./interfaces/dataInterfaces/repoInterface";

const getData = require("./api/dataQuery");
const processingData = require("./data/dataProcessing");

/**
 * Async function
 * @param {string} userName Github username
 */
// module.exports = 
module.exports = async function getPinned(userName: string): Promise<repoInterface[] | Error> {
  const pinned: repoInterface[] = [];

  const res = await getData.getHTML(userName);

  if (res.status === 200) {
    const repoNames = processingData.createRepoNames(res.data);

    for (let i = 0; i < repoNames.length; i++) {
      await getData.getRepo(userName, repoNames[i]).then((item: any) => pinned.push(item.data));
    }
  } else {
    return new Error("Connection error");
  }

  return pinned;
};

// getPinned("Pesochenski").then((pinned) => console.log(pinned));
