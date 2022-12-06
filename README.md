# This repo provides an example for how to use Playwright as a price scrapper

There are multiple steps to get started, and you can check the final results in `final` directory.

To get started you need to install:

- [VSCode](https://code.visualstudio.com/) (or a code editor you like)

The repo provide a devcontainer containing all dependencies needed to run the project. You need to have [Remote Development
](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack) extension installed.

The container will install a `noVNC` instance, available on [`http://localhost:6080`](http://localhost:6080) (password is `vscode`).

Then run:

```bash
npm install
```

Then, you can run the scripts:

```bash
npm run step-1
npm run step-2
npm run step-3
```

- If there is an error, a screenshot will be saved in `screenshots` folder
- You can enable debug mode by setting environment variable `PWDEBUG=1`

You can open the slides by running

```bash
npm run slides
```