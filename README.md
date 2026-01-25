# FastExpress

An Express.js **user todolist** application using **MongoDB** and a light **MVC-style** structure.

## Description

This project started as a minimal Express.js API for testing MongoDB connectivity and Docker, and has been upgraded into a simple todolist-style app that manages a `users` collection.

You can:

- Add new users
- List all users
- Delete users individually  

There is **no edit option by design**.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy the example environment file:
```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB credentials:
```
MONGODB_USER=your_username
MONGODB_PASSWORD=your_password
MONGODB_HOST=localhost
MONGODB_PORT=27017
MONGODB_DATABASE=your_database_name
PORT=3000
```

## Running the Application

Start the server:

```bash
npm start
```

The server will run on `http://localhost:3000` (or the port specified in your `.env` file).

### Web UI

- Open `http://localhost:3000` in your browser.
- You will see a small “User Todolist” interface where you can:
  - Type a user name and click **Add User**
  - See the list of existing users
  - Click **Delete** on any user to remove it

All operations are persisted in MongoDB in the `users` collection.

### API Endpoints

Base URL: `http://localhost:3000`

- `GET /api/users`  
  **Description**: Get all users.

- `POST /api/users`  
  **Description**: Add a new user.  
  **Body (JSON)**:
  ```json
  {
    "name": "John Doe"
  }
  ```

- `DELETE /api/users/:id`  
  **Description**: Delete a user by its MongoDB `_id`.

## MongoDB Collection Structure

The `users` collection contains documents similar to:

```json
{
  "_id": "ObjectId",
  "name": "string",
  "createdAt": "ISODate"
}
```

## Project Structure (MVC-style)

- `index.js` – App entry point, Express setup, MongoDB connection, route wiring.
- `models/user.js` – Mongoose `User` model (`users` collection).
- `controllers/userController.js` – Logic for listing, creating, and deleting users.
- `routes/userRoutes.js` – Express routes for `/api/users`.
- `views/index.html` – Simple front-end “todolist” UI for users.

## Technologies

- Node.js
- Express.js
- MongoDB (via Mongoose)
