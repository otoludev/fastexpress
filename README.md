# FastExpress

A simple Express.js application for testing MongoDB connectivity.

## Description

This project is designed to test MongoDB with a collection named `users` that contains documents with only one property: `name`.

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

## API Endpoints

- `GET /` - Returns all users from the `users` collection

## MongoDB Collection Structure

The `users` collection should contain documents with the following structure:
```json
{
  "name": "string"
}
```

## Technologies

- Node.js
- Express.js
- MongoDB (via Mongoose)
