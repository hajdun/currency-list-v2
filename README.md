# Simple currency lister application

The app lists currencies. You can filter for currencies in 2 ways.

- Filter from search box (filtering happens on typing)
- Filter from url (filtering happens on page load)

Extras:

- Added country list from a 3rd party providing all info needed for the flag (response cached)
- Broken images are replaced with a replacement image and the proper alt text
- On flag hover, country name is displayed
- On currency hover, currency name is displayed
- Extras are included in the filter (So it is possible to filter for 'Peso' or 'Mexico')
- List can be displayed without the country list

## Configuration

```
src/config.js
```

Contains the application urls for fetching the country and the currency list.

# Made with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run coverage`

Generates a coverage report of unit tests.

### `npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `serve -s build`

Runs the production build.

Open [http://localhost:5000](http://localhost:5000)

### `npm run e2e`

Runs cypress e2e tests headless. Cypress tests are configured for production build ( [http://localhost:5000](http://localhost:5000))

### `npm run smoke`

Runs cypress. Cypress tests are configured for production build ( [http://localhost:5000](http://localhost:5000))

### `npm run lint`

Fixes autofixable lint errors. Lints for typescript errors too.

# Known issues

- Scroll has a bug because of the poor setup with setTimeout
- Page is slow (a webpack build setup and better serving options would have helped a bit)
- Images are not optimized
- Test coverage needs to be improved
- Currency list should be refreshed every X times to keep it up-to-date
- Not all info fetched is available to the user, design needed for providing more details
- Prohibited currencies not filtered
- Must check if the correct EUR value was used as a display value (currently it is exchangeRate.middle)
- It would be nice to have an API providing country info also, acceptable solution is needed for displaying the countries
- No logger is configured.
- No documentation tool added.
- Commit messages are not associated with issue numbers and are not standardized, so searching root causes of bugs may be harder.
- Search input is not debounced, so filtering happens instantly
- As there is no submit button, I could not figure out if I should send up the filter value to the url first (also debouncing)
