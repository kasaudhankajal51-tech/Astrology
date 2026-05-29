# Astrology Backend

## Project Overview

This repository contains the Astrology backend API built with Node.js, Express, and MongoDB.

Key features:
- Express API server with `server.js` as the main entry point
- MongoDB connection via `mongoose`
- JWT authentication support
- File upload routes for resumes and assets
- Separate route groups for tools, consultations, tarot, love, leads, blogs, jobs, auth, admin, settings, and newsletter
- Logging with `morgan` and `winston`
- Rate limiting, CORS, and error middleware
- Designed to run locally and in serverless hosts

## Work Completed

- Set up backend entry point in `server.js` with MongoDB connection and server startup logic
- Configured Express in `src/app.js` with middleware, static uploads handling, health check, and API route registration
- Added route structure for the major application domains
- Included environment variable support using `.env`
- Added a README with startup instructions and local launch guidance

## Important Files

- `server.js` - application bootstrap and database connection startup
- `src/app.js` - Express app configuration, middleware, and route registration
- `package.json` - project scripts and dependencies

## How to Start the Project

### 1. Open the backend folder

Change directory into the backend folder:

```bash
cd "c:\Users\sharm\OneDrive\Desktop\New folder\Astrology\backend"
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the backend folder with at least:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/astrology
NODE_ENV=development
```

> Note: `src/app.js` expects `MONGO_URI` to be defined for MongoDB connectivity.

### 4. Start the server

For development with automatic restarts:

```bash
npm run dev
```

For production-style launch:

```bash
npm start
```

### 5. Default local URL

Once started, the API will typically be available at:

```text
http://localhost:5000
```

You can also check the health endpoint at:

```text
http://localhost:5000/health
```

## Notes

- If you use MongoDB locally, make sure the MongoDB service is running.
- The server listens on `0.0.0.0` so it can accept requests from the local machine and containers.
- If you run into database connection issues, verify `MONGO_URI` and MongoDB access.
