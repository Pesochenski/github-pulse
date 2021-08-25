import { RepoInterface } from "./interfaces/repoInterface";

const getData = require("./api/dataQuery");
const processingData = require("./data/dataProcessing");

/**
 * Async function
 * @param {string} userName Github username
 */
export async function getPinned(userName: string): Promise<RepoInterface[] | Error> {
  const pinned: RepoInterface[] = [];

  if (userName === "") {
    throw new Error("No any username");
  }

  const res = await getData.getHTML(userName);

  if (res.status === 200) {
    const repoNames: string[] = processingData.createRepoNames(res.data);

    for (let i = 0; i < repoNames.length; i++) {
      const { data } = await getData.getRepo(userName, repoNames[i]);
      pinned.push(data);
    }
  } else {
    throw new Error("Connection error");
  }

  return pinned;
}

// getPinned("octocat").then((pinned) => console.log(pinned));
