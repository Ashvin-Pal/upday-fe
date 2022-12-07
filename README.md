# Upday fe

## Setup

### Installation

1. Run `npm install` in the root directory.
2. Follow the steps in this => `https://github.com/upday/upday-fe-task` to run the backend.
3. Once you have completed step 1 and 2 successfully, run `npm run dev`.
4. Go to your browser and visit this url `http://127.0.0.1:5173/`.

### Production/Build

1. Run `npm build` in the root directory.
2. Follow the steps in this => `https://github.com/upday/upday-fe-task` to run the backend.
3. Once you have completed step 1 and 2 successfully, run `npm run preview`.
4. Go to your browser and visit this url `http://127.0.0.1:4173/`.

### Testing

1. Run `npm run test` in the root directory.

### Testing Coverage

1. Run `npm run test-coverage` in the root directory.

## Architecture

### Frontend

-   React app bootstrapped with vite react-ts typescript template.
-   No frontend libraries are used in this project.
-   Used Typescript for the frontend.

### Testing libraries used

-   Jest
-   React testing library
-   Mock service worker (msw)

### Screens

1.  Logic screen
2.  New boards and news list screen
3.  Create/edit news screen
4.  Page not found screen
5.  Error screen in case something goes wrong :)

### Description

    This application allows a user to create and edit news articles. Users are allowed
    change the status of news articles once they have been created. Users can publish a news
    article, archive a news article and finally leave an article in its default state
    after it has been created (draft state).

    Once a news article has been created the user is free to continuously edit the article.
    Once a news article has been archived, the user is no longer able to edit it. A news
    article can also be deleted.
