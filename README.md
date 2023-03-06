# Wanderlust

## Overview

Wanderlust - The backpacking trip sharing web application for adventurers seeking the very best experiences from around the world.

I this document you will find:

- Run instructions for development

<br/>

---

## Run instructions

_Running the application commands require you to navigate into the "./backpack" directory first._

Before doing anything be sure to run:

    npm install

To run the application locally use:

    npm run dev

_All changes made in ./src are replicated to the running application_

Before running tests be sure to install firebase tools:

    npm install -g firebase-tools

To run all tests once use:

    npm run simpletest

If you would rather run all tests immediately after updates are done to files in ./src use:

    npm run test

In order to obtain a test coverage report use:

    npm run coverage
