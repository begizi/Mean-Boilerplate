# MEAN Stack Boilerplate 

## Prerequisites
* Node.js - Download and Install [Node.js](http://www.nodejs.org/download/). You can also follow [this gist](https://gist.github.com/isaacs/579814) for a quick and easy way to install Node.js and npm
* MongoDB - Download and Install [MongoDB](http://www.mongodb.org/downloads) - Make sure it's running on the default port (27017).
* Grunt - Download and Install [Grunt](http://gruntjs.com).

### Optional (Requirements for Grunt)
* Ruby - Download and Install [Ruby](http://www.ruby-lang.org/).
* Ruby Gems - Download and Install [Ruby Gems](http://rubygems.org).

## Additional Packages
* Express - Defined as npm module in the [package.json](package.json) file.
* Mongoose - Defined as npm module in the [package.json](package.json) file.
* Passport - Defined as npm module in the [package.json](package.json) file.
* AngularJS - Defined as bower module in the [bower.json](bower.json) file.
* Twitter Bootstrap - Defined as bower module in the [bower.json](bower.json) file.

## Quick Install

 The quickest way to get started with MEAN is to clone the project and utilize it like this:

  Install dependencies:

    $ npm install

  We use [Grunt](https://github.com/gruntjs/grunt-cli) to start the server:

    $ grunt

  Then open a browser and go to:
    
    http://localhost:3000


### Environmental Settings

There are three environments provided by default, __development__, __test__, and __production__. Each of these environments has the following configuration options:
* db - This is the name of the MongoDB database to use, and is set by default to __mean-dev__ for the development environment.
* root - This is determined automatically at the start of this file, but can be overridden here.
* app.name - This is the name of your app or website, and can be different for each environment. You can tell which environment you are running by looking at the TITLE attribute that your app generates.

> NOTE: Running Node.js applications in the __production__ environment enables caching, which is disabled by default in all other environments.