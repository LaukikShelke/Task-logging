# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

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

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)



Login api  (response)
const data = {
        "userId": 123,
        "username": "john_doe",
        "time": [
          { "id": 1, "slot": "Feb 1" },
          { "id": 2, "slot": "Feb 2" },
          { "id": 3, "slot": "Feb 3" }
        ],
        "token": "abc123xyz"
      };

Login api (payload)
loginData = {
      username,
      password,
    };

 fetch task details (response)   
 const data = {
        "timeLoggedDetails": [
         
        ],
        "taskList": [
          {
            "id": 1,
            "taskname": "Task 1",
            "description": "Description 1"
          },
          {
            "id": 2,
            "taskname": "Task 2",
            "description": "Description 2"
          }
        ]
      }
     url example
      fetch task details url = https://example.com/api/time-logged?userId=1&timeId=1

      login task (post request)
      payload
      {
  "userId": 123,
  "timeId": 1,
  "tasks": [
    {
      "taskId": 1,
      "taskname": "Task 1",
      "description": "Description for Task 1",
      "comment": "Worked on Task 1",
      "percentageWorkDone": 50
    },
    {
      "taskId": 2,
      "taskname": "Task 2",
      "description": "Description for Task 2",
      "comment": "Worked on Task 2",
      "percentageWorkDone": 75
    },
    {
      "taskId": 3,
      "taskname": "Task 3",
      "description": "Description for Task 3",
      "comment": "Worked on Task 3",
      "percentageWorkDone": 100
    }
  ]
}

response 
{
  "status": "success",
  "message": "Time logged successfully!",
}

