# HRFlow Test

This is a React project set up with Vite, Redux, and Tailwind CSS. The project is a responsive web page that displays a list of jobs. The jobs are fetched from the HrFlow Searching API and can be filtered and searched through a variety of means.

## Features

- **Job Listing**: The list of jobs is retrieved using the HrFlow Searching API.
- **Search Bar**: A search bar allows for searching for jobs by their name.
- **Category Filter**: A dropdown contains the different job categories and allows for filtering jobs by their categories.
- **Sort Filter**: Jobs can be sorted by creation date, name, category, etc.
- **Drag and Drop**: Items can be re-ordered by drag and drop events.
- **Caching System**: A caching system saves the user filters in local storage and syncs it with the app for the next session.
- **State Handling**: The app handles all states (empty, errors, loading, and success states).
- **Pagination**: A pagination component is implemented with a default limit of 10 items per page.
- **Client-side Searching and Filtering**: All the searching and filtering are handled on the client-side (in the frontend) and not using the server API (HrFlow).
- **Responsive Design**: The layout is optimal for the user's device screen size.
- **Interactive Elements**: All interactive elements on the page have hover states.
- **Job Cards**: Jobs are displayed as clickable expandable cards. The default state of the card displays basic info like the title and creation date of the job. The expanded state displays the details of each item (title, description, list of required skills, start date, salary, category, company, etc.).
- **Reset Filters**: All filters can be reset.
- **Navigation**: Users can navigate between pages.

## Installation

First, clone the repository:

```bash
git clone https://github.com/yourusername/hrflow-test.git
cd hrflow-test
```

Then install the dependencies:

```bash
npm install
```

Then under `.env` file in the root directory of the project add your environment variables

```bash
VITE_RAPID_API_KEY=your_api_key
VITE_RAPID_USER_EMAIL=your_email
VITE_RAPID_BOARD_KEYS=your_board_keys
```

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.

### `npm run lint`

Runs ESLint on the project.

### `npm run preview`

Runs a preview of the built app.

### `npm run test`

Launches the test runner in the interactive watch mode.

## Dependencies

This project uses the following key dependencies:

- `@headlessui/react`: A set of completely unstyled, fully accessible UI components.
- `@reduxjs/toolkit`: The official, opinionated, batteries-included toolset for efficient Redux development.
- `@tailwindcss/forms`: A plugin that provides a basic reset for form styles that makes form elements easy to override with utilities.
- `axios`: Promise based HTTP client for the browser and node.js.
- `react`: A JavaScript library for building user interfaces.
- `react-redux`: Official React bindings for Redux.
- `redux`: A predictable state container for JavaScript apps.
