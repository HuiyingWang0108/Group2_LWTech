# Getting Started with Create React App

## `steps:`

### `step1, Install Node.js and npm:`

Make sure you have Node.js and npm (Node Package Manager) installed on your machine. You can download them from https://nodejs.org/.

### `step2, Install Create React App (CRA):`

```
npm install -g create-react-app
```

### `step3, Create a new React app with TypeScript:`

Change your working directory to the newly created app folder:
```
npx create-react-app my-ts-app --template typescript
```

### `step4, Create a new React app with TypeScript:`

```
cd my-ts-app
```

### `step5, Start the development server:`

```
npm start
```

### `step6, Personality our own react app:`

This is the start version for the group 2 react app. I added debugger so changed tsconfig.json & launch.json\

tsconfig.json:

```
    "noEmit": false,
    "sourceMap": true
```

launch.json:

```
    {
      "configurations": [
        {
            "type": "chrome",
            "request": "launch",
            "name": "my-group2-react-app",
            "url": "http://localhost:3000",
            "webRoot": "${workspaceFolder}"
  
        }
        ]
      }
```

# How to use this repositories:

## `steps:`

### `step1, make sure you have installed Node.js and npm:`

```
node -v
npm -v

```

### `step2, git clone:`

```
git clone https://github.com/HuiyingWang0108/Group2_LWTech
```

### `step3, Install react-scripts:`

```
cd Group2_LWTech
git branch -a
git checkout -b jojo-react-app
npm install react-scripts --save-dev

```

### `step4, start:`

```
npm start

```

#### `UML Diagram`

Below is the UML diagram:\
<img src="https://github.com/HuiyingWang0108/Group2_LWTech/blob/jojo-react-app/public/images/UML%20Diagram.png" width="50%">

Open (https://lucid.app/lucidchart/78385fee-9164-4439-a9ad-c9e5b44cc924/edit?viewport_loc=-567%2C-60%2C2857%2C1256%2CHWEp-vi-RSFO&invitationId=inv_95a2e272-9ef4-49b8-9ccf-0987260a3d57) to view it in the browser.

This is the start UML for the group 2 react app based on the Classes.json and Degrees.json.\

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
