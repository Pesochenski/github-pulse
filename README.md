# Github additional opportunities

[![Node](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en/)
![CODE SIZE](https://img.shields.io/github/languages/code-size/Pesochenski/github-pulse?style=for-the-badge)

## Description

This is simple to use NPM package for Node.js, which give you some more possibilities for work with GitHub

## Docs

Installation:

```
npm i gh-pinned
```

Testing:

```
npm run test
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

**Async function**, returns an object with two string arrays: innerFolders and innerFiles

First example:

```JavaScript
const { getRepoContent } = require("github-pulse");

async function bar(username, reponame) {
  const repoContent = await getRepoContent(username, reponame);
  console.log(repoContent);
};

bar("octocat", "linguist");

// {
//   innerFolders: [...],
//   innerFiles: [...],
// }
```

Second example:

```JavaScript
const { getRepoContent } = require("github-pulse");

getRepoContent("octocat", "linguist")
  .then((repoContent) => console.log(repoContent));

// {
//   innerFolders: [...],
//   innerFiles: [...],
// }
```

## License

This package is under the MIT license.

## Support

If you want to help and you found any error or you know, how you can make code better, please, create an `issue` here or your own branch after `git clone` and then make a `pull request`. I will be very thankfull.
