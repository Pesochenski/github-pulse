const { parse } = require("node-html-parser");

export const processingData = {
  createRepoNames: (data: string): string[] => {
    const repoNames: string[] = parse(data)
      .querySelectorAll(".repo")
      .map((item: HTMLElement) => item.innerText);

    return repoNames;
  },
  createRepoContent: (data: string): { parsedFolders: string[]; parsedFiles: string[] } => {
    const parsedFiles: string[] = [];
    const parsedFolders: string[] = [];

    const parsed = parse(data);

    const typings: string[] = parsed
      .querySelectorAll(".octicon")
      .filter(
        (item: HTMLElement) =>
          item.classList.value.includes("octicon-file") ||
          item.classList.value.includes("octicon-file-directory")
      )
      .map((item: HTMLElement) => {
        return item.classList.value.includes("octicon-file") ? "file" : "folder";
      });

    const names: string[] = parsed
      .querySelectorAll(".js-navigation-open")
      .filter((item: HTMLElement) => item.classList.value.length === 2)
      .map((item: HTMLElement) => item.innerText);

    for (let i: number = 0; i < names.length; i++) {
      if (typings[i] === "folder") {
        parsedFolders.push(names[i]);
      } else {
        parsedFiles.push(names[i]);
      }
    }

    return { parsedFolders, parsedFiles };
  },
};
