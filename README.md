# Activity Suggestion Exercise

This repo contains a sample application that supplies a list of suggestions for activities for one or more participants in various categories.

## Prerequisites

- Node 8.x or higher

## Installing

Run the following in the root of the project:

```
npm install
```

## Starting up the app

Run the following to start the app in dev mode, which uses `nodemon` and `webpack-dev-server` to hot-reload both frontend and backend changes as you develop.

```
npm start
```

:warning: NOTE: If you use CTRL + C to send a SIGINT to kill the process, you may need to do it twice for both processes to be killed. `npm-run-all` does not always pass the signal along to all parallel processes.

## Running the tests

Run the following to run the tests via `jest`:

```
npm test
```

You can also start `jest` in watch mode with the following:

```
npm run test:watch
```

[![Run on Repl.it](https://repl.it/badge/github/Chris0lsen/debugging-challenge)](https://repl.it/github/Chris0lsen/debugging-challenge)