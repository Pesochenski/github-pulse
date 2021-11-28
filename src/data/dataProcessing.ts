import { RepoChunkTypeEnum } from "../enums/RepoChunkTypeEnum";

import { RepoChunkInterface } from "../interfaces/dataChunk/repoChunkInterface";
import { HTMLElement } from "node-html-parser";

const { parse } = require("node-html-parser");

export const processingData = {
  createRepoNames: (data: string): string[] => {
    const repoNames: string[] = parse(data)
      .querySelectorAll(".repo")
      .map((item: HTMLElement) => item.innerText);

    return repoNames;
  },
  createRepoContent: (
    data: string,
    parentId: number,
    actualLink: string[]
  ): {
    parsedFolders: RepoChunkInterface[];
    parsedFiles: RepoChunkInterface[];
  } => {
    const parsedFiles: RepoChunkInterface[] = [];
    const parsedFolders: RepoChunkInterface[] = [];

    const parsed = parse(data);

    const chunksInfo: { type: string; name: string }[] = parsed
      .querySelectorAll(".Box-row")
      .map((item: HTMLElement) => {
        const type: string = item.querySelector(".octicon").classList.value.includes("octicon-file")
          ? RepoChunkTypeEnum.FILE
          : RepoChunkTypeEnum.FOLDER;

        const name: string = item.querySelector(".js-navigation-open").innerText;

        return {
          type,
          name,
        };
      });

    for (let i: number = 0; i < chunksInfo.length; i++) {
      if (chunksInfo[i].type === RepoChunkTypeEnum.FOLDER) {
        parsedFolders.push({
          id: Number(Date.now()),
          parentId: parentId,
          type: chunksInfo[i].type,
          name: chunksInfo[i].name,
          inner: {
            files: [],
            folders: [],
          },
          _actualLink: [...actualLink, chunksInfo[i].name],
          _folderLinks: [],
        });
      } else {
        parsedFiles.push({
          id: Number(Date.now()),
          parentId: parentId,
          type: chunksInfo[i].type,
          name: chunksInfo[i].name,
          inner: {
            files: [],
            folders: [],
          },
          _actualLink: [...actualLink, chunksInfo[i].name],
          _folderLinks: [],
        });
      }
    }

    return { parsedFolders, parsedFiles };
  },
};
