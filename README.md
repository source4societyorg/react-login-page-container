# react-login-page-container

## Requirements

Please be sure you have the following in your package.json:

   "dependencies": {
     "babel-polyfill": "6.23.0",
     "immutable": "3.8.1",
     "intl": "1.2.5",
     "invariant": "2.2.2",
     "prop-types": "15.5.10",
     "react": "15.6.1",
     "react-dom": "15.6.1",
     "react-intl": "2.3.0",
     "react-loadable": "4.0.3",
     "react-redux": "5.0.5",
     "redux": "3.6.0",
     "redux-immutable": "4.0.0",
     "redux-saga": "0.15.3",
     "reselect": "3.0.1",
     "warning": "3.0.0"
   }

## Installation

Pleas be sure you have the requirements mentioned in the previous section installed.

We recommending forking this repository and using as a submodule. To use as a git submodule in your project, navigate to your containers directory and run:

    git submodule add git@github.com:source4societyorg/react-login-page-container.git

Replace the url with the url of your fork as needed.

For more information on how to use submodules, refer to the [git submodule reference](https://git-scm.com/docs/git-submodule) and this article from [TechJini](http://www.techjini.com/blog/working-with-git-submodules/)

## Example

This module assumes you have implement an API backend that will handle your login saga. This will be pulled in wth an import in your saga file that already exists:

  utils/apiInterface

So this must be defined. The saga will call the login method and pass in the action object. From there, it expects a json object with a minimum shape of:

    {
      result: true,
      results: {
        jwt: 'your.jwt.here'
      }
    }

If the login failed on the backend, the response should minimally look like:

  {
    result: false,
    error: <your error object here>,
  }

Upon successful login, the saga will PUT a loginPosted action object expected to be defined in App/actions so that your app logic can handle it.
