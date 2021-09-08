import { RepoInterface } from "./interfaces/repoInterface";

import { getData } from "./api/dataQuery";
import { processingData } from "./data/dataProcessing";

/**
 * Async function
 * @param {string} userName Github account username
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

/**
 * Returns repository structure in object
 * @param {string} userName Github account userName
 * @param {string} userRepo Github repository name
 */
export async function getRepoStructure(userName: string, userRepo: string): Promise<object> {
  const repoStructure: any = {};
  const scrapingLink: string = `${userName}/${userRepo}`;

  if (userName === "") {
    throw new Error("No any username");
  } else if (userRepo === "") {
    throw new Error("No any repo name");
  }

  const res = await getData.getHTML(scrapingLink);

  if (res.status === 200) {
    const { parsedFolders, parsedFiles } = processingData.createRepoContent(res.data);

    repoStructure.innerFolders = {};
    repoStructure.innerFiles = parsedFiles;

    for (const item of parsedFolders) {
      repoStructure.innerFolders[item] = {};
    }

    // while (parsedFolders.length >= 1) {

    // }
  } else {
    throw new Error("Connection error");
  }

  return repoStructure;
}

// getPinned("Pesochenski").then((pinned) => console.log(pinned));
// getRepoStructure("Pesochenski", "gh-pinned").then((output) => console.log(output));

// {
//   innerFolders: {
//     src: {
//       innerFolders: {
//         expFolder: {
//           innerFiles: ['finishExp'],
//         }
//       },
//       innerFiles: ['3exp', '4exp'],
//     },
//     tests: {
//     innerFolders: {},
//       innerFiles: ['5exp', '6exp'],
//     },
//   },
//   innerFiles: ['1exp', '2exp'],
// }
