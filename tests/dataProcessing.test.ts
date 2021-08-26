import { processingData } from "../src/data/dataProcessing";

describe("data tests", () => {
  test("should get names from html", () => {
    expect(
      processingData.createRepoNames(
        '<ol class="list-for-test"><li class="list-item-for-test"><div><div><div>' +
          '<a class="item-link"><span class="repo">first-name</span></a></div></div></div></li></ol>'
      )
    ).toStrictEqual(["first-name"]);
  });
});
