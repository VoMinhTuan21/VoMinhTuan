# Project README

## Database Setup

This project uses SQL Server for the database. Please ensure you have SQL Server installed on your device and set up an account for login using SQL Server Authentication.

### Steps to Set Up the Database

1. **Create an Empty Database:**
   - Create a new database named `TEST`. You can change the name of the database later if needed.

2. **Configure Database Connection:**
   - Open the file located at `src/config/database.ts` and update the following fields as necessary:
   
   ```typescript
   export const myDatabase = new DataSource({
       type: "mssql",
       host: "localhost",
       port: 1433,
       username: "sa", // <-- here
       password: "123456789", // <-- here
       database: "TEST", // <-- here
       entities: ["src/entities/*.ts"],
       migrations: ["src/migrations/*.ts"],
       logging: true,
       synchronize: true,
       options: {
         trustServerCertificate: true,
       },
   })
   ```

## Installation

After setting up the database, run the following command to install the required Node.js modules:

```bash
npm install
```

## Build

To create build folder, run:

```bash
npm run build
```
you should run it before start the application after cloning the project

## Running the Server

To start the server, run:

```bash
npm run dev
```
