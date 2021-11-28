import { RepoInterface } from "./interfaces/repoInterface";
import { RepoChunkInterface } from "./interfaces/dataChunk/repoChunkInterface";

import { getData } from "./api/dataQuery";
import { processingData } from "./data/dataProcessing";
import { RepoChunkTypeEnum } from "./enums/RepoChunkTypeEnum";

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
      type: RepoChunkTypeEnum.REPO,
      name: userRepo,
      inner: {
        folders: [],
        files: [],
      },
      _folderLinks: [],
      _actualLink: [...scrapingLink],
    },
  ];
  const contentLink: string[] = [scrapingLink.join("/")];

  if (userName === "") {
    throw new Error("No any name");
  } else if (userRepo === "") {
    throw new Error("No any repo name");
  }

  const repo = await getData.getHTML(scrapingLink.join("/"));

  if (repo.status === 200) {
    const { parsedFolders, parsedFiles } = processingData.createRepoContent(repo.data, scrapingLink);

    // const innerQuery = async (chunks: RepoChunkInterface[]): Promise<void> => {
    //   for (let i: number = 0; i < chunks.length; i++) {
    //     try {
    //       // если папка только с файлами
    //       if (chunks[i].inner?.folders) {
    //         if (contentLink.length > 1) {
    //           if (i === 0) {
    //             contentLink.push(chunks[i].name);
    //           } else if (i > 0) {
    //             contentLink.pop();
    //             contentLink.push(chunks[i].name);
    //           }
    //         }
    //
    //         const response = await getData.getHTML(contentLink.join("/"));
    //         const { parsedFolders, parsedFiles } = processingData.createRepoContent(response.data);
    //
    //         chunks[i].inner.folders = parsedFolders;
    //         chunks[i].inner.files = parsedFiles;
    //
    //         for (let j: number = 0; j < chunks[i].inner.folders.length; j++) {
    //           chunks[i].inner._folderLinks.push(chunks[i].inner.folders[j].name);
    //         }
    //
    //         console.log(chunks[i].inner._folderLinks);
    //       } else {
    //         return;
    //       }
    //     } catch (err) {
    //       // await Promise.reject(err);
    //     }
    //   }
    // };

    repoContent[0].inner.folders = parsedFolders;
    repoContent[0].inner.files = parsedFiles;
    repoContent[0]._folderLinks = [];

    for (let i: number = 0; i < repoContent[0].inner.folders.length; i++) {
      repoContent[0]._folderLinks.push(repoContent[0].inner.folders[i].name);
    }

    // использовать контентЛинк и внутри него проверять на наличие фолдерЛинка чтобы понять надо ли возвращаться на левл выше или нет

    // if (repoContent.folders.length > 0) await innerQuery(repoContent);
  } else {
    throw new Error("Connection error");
  }

  return repoContent;
}

// getPinned("Pesochenski").then((pinned) => console.log(pinned));
const start: number = Date.now();

getRepoContent("octocat", "linguist").then((repoContent) => {
  const finish = Date.now() - start;
  console.log(repoContent, finish, "ms ", finish / 1000, "s ");
});

// async function testing(folders: RepoChunkInterface[]) {
//   // working with folders arr, where in folder object inner and links are empty
//   // {
//   //  type: "FOLDER",
//   //  name: "test",
//   //  inner: {
//   //    folders: [],
//   //    files: [],
//   //  },
//   //  _actualLink: [],
//   //  _folderLinks: [],
//   // }
//
//   if (!folders.length) {
//     await
//   }
//
//   for (let i = 0; i < folders.length; i++) {
//
//
//     if (elems[i].name === elems[elems.length - 1].name) {
//       await testing();
//     }
//   }
// }
