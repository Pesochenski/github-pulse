import { RepoInterface } from "./interfaces/repoInterface";
import { RepoChunkInterface } from "./interfaces/dataChunk/repoChunkInterface";

import { RepoChunkTypeEnum } from "./enums/RepoChunkTypeEnum";

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
    const repoNames: string[] = processingData.parseRepoNames(res.data);

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
 * Returns repository files and folders in object
 * @param {string} userName Github account userName
 * @param {string} userRepo Github repository name
 */
export async function getRepoContent(
  userName: string,
  userRepo: string
): Promise<RepoChunkInterface[]> {
  const scrapingLink: string[] = [userName, userRepo];
  const repoContent: RepoChunkInterface[] = [
    {
      id: 0,
      parentId: null,
      type: RepoChunkTypeEnum.REPO,
      name: userRepo,
      inner: {
        folders: [],
        files: [],
      },
      _actualLink: [...scrapingLink],
      _folderLinks: [],
    },
  ];

  if (userName === "") {
    throw new Error("No any name");
  } else if (userRepo === "") {
    throw new Error("No any repo name");
  }

  const repo = await getData.getHTML(scrapingLink.join("/"));

  if (repo.status === 200) {
    const { parsedFolders, parsedFiles, parsedBranch } = processingData.parseRepoContent(
      repo.data,
      repoContent[0].id,
      repoContent[0]._actualLink,
      true
    );

    repoContent[0].inner.folders = parsedFolders;
    repoContent[0].inner.files = parsedFiles;
    repoContent[0]._folderLinks = [];
    if (parsedBranch) repoContent[0]._actualLink.push("tree", parsedBranch);

    for (let i: number = 0; i < repoContent[0].inner.folders.length; i++) {
      repoContent[0]._folderLinks.push(repoContent[0].inner.folders[i].name);
    }

    const getChunksRecursive = async (folders: RepoChunkInterface[]): Promise<void> => {
      for (let i: number = 0; i < folders.length; i++) {
        const response = await getData.getHTML(folders[i]._actualLink.join("/"));

        const { parsedFolders, parsedFiles } = processingData.parseRepoContent(
          response.data,
          folders[i].id,
          folders[i]._actualLink
        );

        folders[i].inner.folders = parsedFolders;
        folders[i].inner.files = parsedFiles;
        folders[i]._actualLink = [...folders[i]._actualLink];

        if (parsedFolders.length) {
          await getChunksRecursive(folders[i].inner.folders);
        }
      }
    };

    if (repoContent[0].inner.folders.length) {
      await getChunksRecursive(repoContent[0].inner.folders);
    }
  } else {
    throw new Error("Connection error");
  }

  return repoContent;
}

// ===================================================================================================
// testing export functions

// getPinned("Pesochenski").then((pinned) => console.log(pinned));

// const test = async () => {
//   const start: number = Date.now();
//
//   const tree = await getRepoContent("Piterden", "vue-crossword");
//   console.log(tree);
//
//   const finish = Date.now() - start;
//   console.log(finish, "ms ", finish / 1000, "s ");
// };
//
// test();

// ===================================================================================================
