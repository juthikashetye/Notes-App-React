# Notes-App-React

![Notes-App](my-app/src/images/notesApp.png)
->**Link to deployed app: [Note-It](https://projectnoteit.herokuapp.com/)**<-

* An app that lets you organize your notes by notebooks.
* You can create, save, edit and delete notes.
* Currently the app has a layout specifically to note down recipes.
* Future features will include a choice to use a general layout for any type of notes.

## Technologies/Tools

* This is a single page full stack application created using the following:

	* React.js (version 16.8.6)
	* Node.js
	* MySQL
	* Javascript
	* HTML 5
	* CSS 3
	* Bootstrap 4

## System Requirements

To make this app work, you need to have the following installed on your computer:

1. NodeJS - version 10 and up
2. MySQL - version 8.0 

## Things to do after cloning the repo

### Installing npm packages

* In your terminal/command line, navigate to the `Notes-App-React` folder, `cd` into the folder and run `npm install`
	* This should create a `node_modules` folder with the following npm packages alongwith their dependencies:

		* [bcryptjs: 2.4.3](https://www.npmjs.com/package/bcryptjs)
	    * [body-parser: 1.19.0](https://www.npmjs.com/package/body-parser)
	    * [cookie-parser: 1.4.4](https://www.npmjs.com/package/cookie-parser)
	    * [dotenv: 7.0.0](https://www.npmjs.com/package/dotenv)
	    * [express: 4.16.4](https://www.npmjs.com/package/express)
	    * [express-session: 1.16.1](https://www.npmjs.com/package/express-session)
	    * [method-override: 3.0.0](https://www.npmjs.com/package/method-override)
	    * [morgan: 1.9.1](https://www.npmjs.com/package/morgan)
	    * [mysql: 2.17.1](https://www.npmjs.com/package/mysql)

* In case you don't see the packages in `node_modules`, use the package links mentioned above to manually install the required packages.

### Creating your `.env` file

* Staying in the root folder create a `.env` file and write your MySQL credentials inside the file as follows:

	`DB_USER=YOUR MYSQL USERNAME
	 DB_HOST=localhost
	 DB_PASS=YOUR MYSQL PASSWORD
	 DB_NAME=notes_app`

### Building your Database

* Now from your terminal navigate inside the `server` folder and then into the `db` folder. Then login to your **MySQL** connection
* Once logged in, run `source schema.sql`. This should create your datatbase.
* Exit from your MySQL connection after the above step.

### Installing React packages

* Navigate back to the root folder and then go inside `my-app` folder.
* Run `npm install` or `yarn install` if you have yarn on your computer.
* This should create a `node-modules` folder with all the required react packages.

## Running The App

* Navigate back to the root `Notes-App-React` folder and run `node server/server.js` or `nodemon server/server.js`. This should connect you to the server of this app.

* Keeping the current terminal tab running the server.js file open, open another terminal tab and navigate to the `my-app` folder.

* Run `yarn start` in this terminal tab. This should connect you to the react app.

* On your browser go to `http://localhost:3000`

* You now have the Notes-App running in your browser!


