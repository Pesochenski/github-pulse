# Github pinned repositories

## Description

This is simple to use NPM package, which can help you to get only pinned repositories of any Github account.

## Docs

Installation:

    npm i gh-pinned

This package has **Async function**, named `getPinned`, which returns an **array of objects** with full information about each pinned repo, like on [Github API](https://docs.github.com/en/rest/reference/repos#get-a-repository), or **Connection error**, if you input non existing username or have no internet connection, so there are examples, how you have to use it.

Simple example for ES5+:

```JavaScript
    const getPinned = require("gh-pinned");

    async function foo(username) {
      const pinned = await getPinned(username);
      console.log(pinned);
    };

    foo("octocat");
```

Another method to get result:

```JavaScript
    const getPinned = require("gh-pinned");

    getPinned("octocat")
      .then((pinned) => console.log(pinned)); // [...]
```

## License

This package is under the MIT license.

## Support

If you want to help and you found any error or you know, how you can make code better, please, create an `issue` here or your own branch after `git clone` and then make a `pull request`. I will be very thankfull.
