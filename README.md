# Bubble Radar Backend

This is the backend repository for Bubble Radar, a web application that helps Redbubble sellers find trending keywords to boost their product visibility and sales. The backend is built using Node.js and Express, and it interacts with a MongoDB database to store and retrieve user research notes.

## Project Structure

The backend repository consists of the following directories and files:

- `src`: This directory contains the source code for the backend.
  - `controllers`: Contains the controllers that handle the business logic of the application.
  - `models`: Contains the database models and schemas.
  - `routes`: Defines the API routes and their corresponding handlers.
  - `services`: Contains additional services or utilities used by the controllers.
  - `server.ts`: Entry point of the application.
- `package.json`: Defines the project dependencies and scripts.
- `README.md`: Instructions and documentation for the backend.

## Getting Started

To run the backend locally, follow these steps:

1. Clone the repository: `git clone https://github.com/burcuicen/bubble-radar-backend.git`
2. Install the dependencies: `npm install`
3. Configure the environment variables:
   - Create a `.env` file 
   - Set the necessary environment variables such as the database connection string and API keys.
4. Start the server: `npm start`
5. The backend should now be running on `http://localhost:3000`.

## API Endpoints

Refer to the `routes` directory for more details on the API routes and their corresponding handlers.

