# Backend Assignment 2

This project is a Node.js backend using Express, Sequelize, and PostgreSQL. It fetches football fixture data from an external API and stores it in a PostgreSQL database.

## Endpoints
- `GET /api/v1/fixtures/` — Get all fixtures from the API
- `POST /api/v1/fixtures/dump` — Fetch and store fixtures in the database

## Setup
1. Clone the repository
2. Install dependencies:
   ```sh
   npm install
   ```
3. Configure environment variables in `config/env.js` (API_SERVICE, DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, PORT)
4. Ensure PostgreSQL is running and accessible
5. Start the server:
   ```sh
   npm start
   ```

## Project Structure
- `app.js` — Main application entry point
- `controllers/fixtures.js` — Fixture logic
- `models/Fixture.js` — Sequelize model for fixtures
- `routes/fixturesRoutes.js` — API routes
- `database/` — Database configuration

## Requirements
- Node.js
- PostgreSQL

## License
MIT
