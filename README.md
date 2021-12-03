# Github additional opportunities

[![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
![CODE SIZE](https://img.shields.io/github/languages/code-size/Pesochenski/github-pulse?style=for-the-badge)

## Description

This is simple to use NPM package for Node.js, which give you some more possibilities for work with GitHub

## Docs

Installation:

```
npm i github-pulse
```

Building:

```
npm run build
```

### getPinned

**Async function**, returns full information only about pinned user's repositories in array

First example:

```JavaScript
const { getPinned } = require("github-pulse");

async function foo(username) {
  const pinned = await getPinned(username);
  console.log(pinned);
};

foo("octocat"); // [...]
```

Second example:

```JavaScript
const { getPinned } = require("github-pulse");

getPinned("octocat")
  .then((pinned) => console.log(pinned)); // [...]
```

### getRepoContent

**Async function**, returns a tree, where each file or folder is an object named chunk

First example:

```JavaScript
const { getRepoStructure } = require("github-pulse");

async function bar(username, reponame) {
  const tree = await getRepoStructure(username, reponame);

  // returns an array of 1 chunk with type "REPOSITORY"
  console.log(tree[0]);
};

bar("octocat", "linguist"); // [...]
```

Second example:

```JavaScript
const { getRepoStructure } = require("github-pulse");

getRepoContent("octocat", "linguist")
  .then((repoContent) => console.log(repoContent)); // [...]
```

Chunk: 

```TypeScript
interface chunk {
  id: number; // unique
  parentId: number | null; // null if type = "REPOSITORY"
  type: string; // "REPOSITORY" | "FILE" | "FOLDER"
  name: string; 
  inner: {
    files: chunk[]; // empty if type = "FILE"
    folders: chunk[]; // empty if type = "FILE"
  };
  _actualLink: string[];
  _folderLinks: string[]; // empty if type = "FILE"
}
```

## License

This package is under the MIT license.

## Support

Pull requests or issues are welcomed
