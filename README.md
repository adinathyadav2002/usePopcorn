# React App for Movie Information and Watch History

This is a React app that shows information about movies and maintains your watch history. The app uses various features like API integration, reusable components, and DOM manipulation.

## Key Features

1. **UseEffect Hook and User Definded Hooks**: Synchronizes data with the component lifecycle(useEffect Hook).
2. **API Integration**: Fetches movie data from an external API.
3. **Loading and Error Handling**: Manages movie loading states and network errors.
4. **Reusable Rating Component**: Implements a reusable `RatingCom` component from a previous project.
5. **DOM Manipulation**: Adds events such as `keydown` and dynamically updates the page title.
6. **Error Handling**: Manages cases for movie not found and API fetching errors using try-catch block.
7. **Decreasing Fetch Requests**: Use of AbortController API to minimize fetch time and maintain the last fetch on UI.
8. **Store Movies to localhost**: Use of localStorage to store the watched movies to localhost:3000
9. **Use of Cleanup function**: Used cleanup function to remove eventHandlers, abort the fetch on every render, etc.
10. **Use of ref's(hook)**: Use of ref's(hook) to handle to focus state when hit enter.

## Installation Guide

### Step 1: Download the Project from GitHub as a ZIP

1. Go to the [GitHub repository](https://github.com/adinathyadav2002/usePopcorn?tab=readme-ov-file).
2. Click the **Code** button (green).
3. From the dropdown, select **Download ZIP**.

### Step 2: Extract the ZIP File

1. Once the ZIP file is downloaded, extract it to your desired location on your machine.

### Step 3: Install Node.js (if not already installed)

1. Download and install Node.js from [https://nodejs.org/](https://nodejs.org/) if it's not already installed.
2. Verify installation by running the following commands in your terminal:
   ```bash
   node -v
   npm -v
   ```

### Step 4: Install Dependencies (Node Modules)

1. Open your terminal (Command Prompt, Git Bash, etc.).
2. Navigate to the extracted folder of your project:
   ```bash
   cd path_to_extracted_folder
   ```
3. Run the following command to install all required node modules:
   ```bash
   npm install
   ```

### Step 5: Run the React App

1. After installation, run the following command to start the app:
   ```bash
   npm start
   ```
2. The React app will now run, and you can view it by navigating to `http://localhost:3000/` in your browser.

### Troubleshooting

- If you encounter any issues, ensure all dependencies are installed correctly using `npm install`.
- Ensure Node.js is up to date and installed properly.
