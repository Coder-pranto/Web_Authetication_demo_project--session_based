# Web Authentication Demo Project - Session Based

## Overview

The Web Authentication Demo Project is a session-based web application that demonstrates user authentication using the Passport framework, specifically the passport-local strategy. It utilizes Express.js for building the server, express-session for managing user sessions, and connect-mongo for storing sessions separately in MongoDB.

The project provides functionality for user registration, login, profile viewing, and logout. It employs session-based authentication to ensure secure access to protected routes. The application stores user credentials securely using bcrypt for password hashing.

## Project Structure

The project follows a modular structure with the following main components:

1. **Server Setup**: The project initializes the Express.js server and configures required middleware such as cors, morgan, body-parser, and express-session.

2. **Database Configuration**: The project connects to a MongoDB database using the Mongoose library. It sets up the necessary schemas and models, including the User model for storing user information.

3. **Passport Configuration**: Passport is configured with the passport-local strategy for user authentication. The project defines the authentication logic, serialization, and deserialization of user objects.

4. **Routes**: The project defines various routes for handling user registration, login, profile viewing, and logout. It includes both GET and POST endpoints for processing user requests.

5. **Views**: The project uses the EJS templating engine to render dynamic views for different routes. Views are provided for the home page, registration, login, profile, and error pages.

6. **Middleware**: Middleware functions are implemented to check if a user is logged in or not, and to protect routes that require authentication.

## Features

The Web Authentication Demo Project includes the following features:

1. **User Registration**: Users can create a new account by providing a unique username, email, and password. Passwords are securely hashed using bcrypt before storing in the database.

2. **User Login**: Registered users can log in with their credentials. The application verifies the username and password, and upon successful login, creates a session for the user.

3. **Protected Routes**: Certain routes, such as the profile page, require users to be authenticated. If a user tries to access these routes without being logged in, they are redirected to the login page.

4. **User Profile**: Authenticated users can view their profile, which displays their username and email information. The profile page is only accessible to logged-in users.

5. **Logout**: Users can log out of their account, which destroys the session and removes the user's authentication.

## Dependencies

The project utilizes the following dependencies:

- Express.js: Fast, unopinionated web framework for Node.js
- passport: Simple and modular authentication middleware for Node.js
- passport-local: Passport strategy for authenticating with a username and password
- express-session: Session middleware for Express.js
- connect-mongo: MongoDB session store for Express.js sessions
- bcrypt: Library for hashing and comparing passwords securely
- mongoose: MongoDB object modeling tool
- ejs: Embedded JavaScript templating engine

## Usage

To run the project locally, follow these steps:

1. Install the required dependencies using `npm install`.
2. Set up a MongoDB database and provide the database URL in the configuration.
3. Start the server using `npm start`.
4. Access the application in a web browser using the provided URL.

## Conclusion

The Web Authentication Demo Project showcases session-based authentication using the Passport framework and Express.js. It provides a solid foundation for building more complex web applications with user authentication and authorization. Feel free to explore and expand upon this project to meet your specific requirements.