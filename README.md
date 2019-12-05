This project serves as a Docker demonstration.
It was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Local Deployment

In the project directory, you can run in the **developer** mode:

### `npm install`
### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Or you can build for **production** and serve the app:

### `npm install`
### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.
See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm install -g serve`
### `npm install -g serve`

Install `serve`, which is a small server for deploying react apps.
Then serve the `build` folder on port **3000**.

## Build Docker and run image

**Prequisites:** Docker installed and running. If not, follow the [Official Documentation](https://docs.docker.com/docker-for-windows/install/).

In the project directory (`cd` to the folder), run (`PowerShell` or `bash` is preferred):

### `docker build -t todoapp .`
### `docker run -d --rm -p 4000:3000 --name todoapp todoapp`

**Notes:** add `-v <YourFolderHere>:/home/temp` if you want to mount a folder on host machine to `/home/temp` on the container.

Open [http://localhost:3000](http://localhost:3000) to use the app.
