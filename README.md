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

**Async function**

Returns full information only about pinned user's repositories in array

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

### getRepoStructureCustom

**Async function**

Returns a tree, where each file or folder is an object named chunk

First example:

```JavaScript
const { getRepoStructureCustom } = require("github-pulse");

// returns an array of 1 chunk with type "REPOSITORY"
async function bar(username, reponame) {
  return await getRepoStructureCustom(username, reponame);
};

console.log(bar("octocat", "linguist")[0]); // [...]
```

Second example:

```JavaScript
const { getRepoStructureCustom } = require("github-pulse");

getRepoStructureCustom("octocat", "linguist")
  .then((tree) => console.log(tree[0])); // [...]
```

Chunk: 

```TypeScript
interface chunk {
  id: number; // unique
  parentId: number | null; // null if type = "REPOSITORY"
  type: string; // "REPOSITORY" | "FILE" | "DIR"
  name: string; 
  inner: {
    files: chunk[]; // empty if type = "FILE"
    folders: chunk[]; // empty if type = "FILE"
  };
  _actualLink: string[];
  _folderLinks: string[]; // empty if type = "FILE"
}
```

### getRepoStructureLight

**Async function**

Similar with "getRepoStructureCustom", but a bit another response structure

Example: 

```JavaScript
const { getRepoStructureLight } = require("github-pulse");

// returns an array of chunks
async function bar(username, reponame) {
  return await getRepoStructureLight(username, reponame);
};

console.log(bar("octocat", "linguist")); // [...]
```

Chunk:

```TypeScript
interface chunk {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: string;
  type: string; // "FILE" | "DIR"
  _links: {
    self: string;
    git: string;
    html: string;
  };
  child_arr: chunk[]; // empty if type = "FILE"
}
```

## License

This package is under the MIT license.

## Support

Pull requests or issues are welcomed
