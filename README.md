This is a react app which use [Hacker News API](https://github.com/HackerNews/API) to implement a single page Hacker News Client.

* Clone [react-babel-webpack-boilerplate](https://github.com/ruanyf/react-babel-webpack-boilerplate) as a starting point.
* Inspired by [insin/react-hn](https://github.com/insin/react-hn).

## Why a new react hacker news client?

There is plenty HackerNews client implemented by React in Github, why we need a new one? The reason is straightforward, this is not a Product, but a demo for best practice on how to use React to develop a web app.

The existing HackerNews implemented by React has some issues:

* The code is obsolete
* Do not have unit test

That's why a new react hacker news is needed.

## What features does this react hacker news have?

As state above, this is not a product, but a best practice demo for using React to develop a web app. The feature is not about what the product have, but about what technology we are using to build this simple product.

* Use ES6 for all most all the code, including React Component related code
* Use `eslint-config-airbnb` as eslint baseline
* Use webpack as build tools, with develop/production separated configs
* Use Mocha/Enzyme/chai as unit test toolset
* Use `sinon` as mock
* Use `ghooks` to make sure git commit message is well formated according to [AngularJS's commit message convention](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines)
* Use `loglevel` to implement a well-designed/modules app log system
* Script to deploy React web app to project github pages in a nutshell
* Script to generate change log with single command

## License

MIT
