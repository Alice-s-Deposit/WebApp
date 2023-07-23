# Web App

## Installing packages

To install the different packages needed to run the app, run : 

### `npm install --force`
The --force tag is required because the SDK and dependencies used are unstable for the moment.   

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

## **Structure**📏

**1. Main page**

In this page, all the workflow to withdraw from cex is explained. Your connection to RPC will go througth an HOPR RPCh to avoid any leak of your IP address. 

Here are the different steps : 
- Step 1: Generate ETH burner address. It's saved en encrypted localy with your password.
- ⚠️WARNING: COPY AND SAVE THE PUBLIC & PRIVATE KEY
- Step 2: Login & Generate a shielded address, zkBOB address
- ⚠️WARNING: IMPERATIVELY COPY THE MNEMONIC SEED
- Step 3: Send funds to burner address (ETH only)
- Step 4: Direct deposit
- Step 5: to withdraw your funds go on zkBob platform and import a zkAccount : past the generated mnemonic.

## Technology 💻

- [React](https://reactjs.org/)
- [zkBob ](https://www.zkbob.com/)
- [HOPR HRPc](https://rpch.net)

## Supported networks 🛰️

Testnet (live) : 
* Goerli

## A huge thanks to the ZK-BOB team, always a pleasure to hack with you !
## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
