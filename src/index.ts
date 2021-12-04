import { RepoInterface } from "./interfaces/apiRepoInterface/repoInterface";
import { RepoCustomChunkInterface } from "./interfaces/customChunkInterface/repoCustomChunkInterface";
import { RepoLightChunkInterface } from "./interfaces/apiChunkInterface/repoLightChunkInterface";

import { RepoChunkTypeEnum } from "./enums/RepoChunkTypeEnum";
import { FetchTypeEnum } from "./enums/FetchTypeEnum";

import { universalFetch } from "./api/dataQuery";
import { parsingData } from "./data/dataParsing";

/**
 * Async function
 *
 * Uses parsing method to return pinned only repositories
 * @param {string} userName Github account name
 */
export async function getPinned(userName: string): Promise<RepoInterface[] | Error> {
  if (!userName.length) throw new Error("No any account name");

  const pinned: RepoInterface[] = [];

  const res = await universalFetch(FetchTypeEnum.BROWSER, userName);

  if (res.status === 200) {
    const repoNames: string[] = parsingData.parseRepoNames(res.data);

    for (let i = 0; i < repoNames.length; i++) {
      const { data } = await universalFetch(
        FetchTypeEnum.API,
        ["repos", userName, repoNames[i]].join("/")
      );
      pinned.push(data);
    }
  } else {
    throw new Error("Connection error");
  }

  return pinned;
}

/**
 * Async function
 *
 * Uses parsing method to return repository structure
 * @param {string} userName Github account name
 * @param {string} userRepo Github repository name
 */
export async function getRepoStructureCustom(
  userName: string,
  userRepo: string
): Promise<RepoCustomChunkInterface[] | Error> {
  if (!userName.length) throw new Error("No any account name");
  if (!userRepo.length) throw new Error("No any repo name");

  const scrapingLink: string[] = [userName, userRepo];
  const repoContent: RepoCustomChunkInterface[] = [
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

  const repo = await universalFetch(FetchTypeEnum.BROWSER, scrapingLink.join("/"));

  if (repo.status === 200) {
    const { parsedFolders, parsedFiles, parsedBranch } = parsingData.parseRepoContent(
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

    const getChunksRecursive = async (folders: RepoCustomChunkInterface[]): Promise<void> => {
      for (let i: number = 0; i < folders.length; i++) {
        const { data } = await universalFetch(
          FetchTypeEnum.BROWSER,
          folders[i]._actualLink.join("/")
        );

        const { parsedFolders, parsedFiles } = parsingData.parseRepoContent(
          data,
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

/**
 * Async function
 *
 * Uses github api to return repository structure
 * @param {string} userName GitHub account name
 * @param {string} userRepo GitHub repository name
 */
export async function getRepoStructureLight(
  userName: string,
  userRepo: string
): Promise<RepoLightChunkInterface[]> {
  if (!userName.length) throw new Error("No any account name");
  if (!userRepo.length) throw new Error("No any repo name");

  const link: string[] = ["repos", userName, userRepo, "contents"];

  const getLightChunkRecursive = async (link: string): Promise<RepoLightChunkInterface[]> => {
    const { data } = await universalFetch(FetchTypeEnum.API, link);

    for (let i: number = 0; i < data.length; i += 1) {
      const actualLink = [link, data[i].name];

      data[i].type = data[i].type.toUpperCase();
      data[i].child_arr = [];

      if (data[i].type === RepoChunkTypeEnum.DIR) {
        data[i].child_arr = await getLightChunkRecursive(actualLink.join("/"));
      }
    }

    return data;
  };

  return await getLightChunkRecursive(link.join("/"));
}

// ===================================================================================================
// testing export functions

// getPinned("Pesochenski").then((pinned) => console.log("done", pinned));

// const test = async () => {
//   // const start: number = Date.now();
//   // const tree = await getPinned("Pesochenski");
//   // console.log("done", tree);
//
//   // const tree1 = await getRepoStructureCustom("Pesochenski", "Image_collection");
//   // console.log("done 2", tree1);
//
//   const tree2 = await getRepoStructureLight("Pesochenski", "Image_collection");
//   console.log("done 3", tree2);
//
//   // const finish = Date.now() - start;
//   // console.log(finish, "ms ", finish / 1000, "s ");
// };
//
// test();

// ===================================================================================================
