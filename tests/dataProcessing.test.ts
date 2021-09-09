import { processingData } from "../src/data/dataProcessing";

describe("data tests", () => {
  test("should return names from html", () => {
    expect(
      processingData.createRepoNames(
        '<ol class="list-for-test"><li class="list-item-for-test"><div><div><div>' +
          '<a class="item-link"><span class="repo">first-name</span></a></div></div></div></li></ol>'
      )
    ).toStrictEqual(["first-name"]);
  });

  test("should return object with Array<string> of file names", () => {
    expect(
      processingData.createRepoContent(
        '<main><div><svg class="octicon octicon-additional"/><svg class="octicon octicon-file-directory"/>' +
          '<svg class="octicon octicon-file-directory"/><svg class="octicon oction-file"/><svg class="octicon octicon-file"/></div>' +
          '<div><a class="js-navigation-open js-navigation-open-1">folder1</a><a class="js-navigation-open js-navigation-open-1">folder2</a>' +
          '<a class="js-navigation-open js-navigation-open-1">file1</a><a class="js-navigation-open js-navigation-open-1">file2</a></div></main>'
      )
    ).toStrictEqual({ parsedFolders: ["folder1", "folder2"], parsedFiles: ["file1", "file2"] });
  });
});
