const { parse } = require("node-html-parser");

import { HTMLElement } from "node-html-parser";

import { RepoChunkTypeEnum } from "../enums/RepoChunkTypeEnum";

import { RepoChunkInterface } from "../interfaces/dataChunk/repoChunkInterface";

export const processingData = {
  parseRepoNames: (data: string): string[] => {
    return parse(data)
      .querySelectorAll(".repo")
      .map((item: HTMLElement) => item.innerText);
  },
  parseRepoContent: (
    data: string,
    parentId: number,
    actualLink: string[],
    withBranch: boolean = false
  ): {
    parsedFolders: RepoChunkInterface[];
    parsedFiles: RepoChunkInterface[];
    parsedBranch?: string;
  } => {
    const parsedFiles: RepoChunkInterface[] = [];
    const parsedFolders: RepoChunkInterface[] = [];

    let parsedBranch: string = "";

    const parsed = parse(data);

    let chunksInfo: { type: string; name: string }[] = parsed
      .querySelectorAll(".Box-row")
      .map((item: HTMLElement) => {
        const type: string = item
          .querySelector(".octicon")
          ?.classList.value.includes("octicon-file")
          ? RepoChunkTypeEnum.FILE
          : RepoChunkTypeEnum.FOLDER;

        const name: string | undefined = item
          .querySelector(".js-navigation-open")
          ?.innerText.trim();

        return {
          type,
          name,
        };
      });

    chunksInfo = chunksInfo.filter((item) => !item.name.match(/[.]\s[.]/));

    if (withBranch) {
      parsedBranch = parsed
        .querySelector(".Layout-main")
        .querySelector(".css-truncate-target").innerText;
    }

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
          _actualLink: withBranch
            ? [...actualLink, "tree", parsedBranch, chunksInfo[i].name]
            : [...actualLink, chunksInfo[i].name],
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
          _actualLink: withBranch
            ? [...actualLink, "tree", parsedBranch, chunksInfo[i].name]
            : [...actualLink, chunksInfo[i].name],
          _folderLinks: [],
        });
      }
    }

    return withBranch
      ? { parsedFolders, parsedFiles, parsedBranch }
      : { parsedFolders, parsedFiles };
  },
};
