import { DataSource } from "typeorm";

export const myDatabase = new DataSource({
    type: "mssql",
    host: "localhost",
    port: 1433,
    username: "sa",
    password: "123456789",
    database: "TEST",
    entities: ["src/entities/*.ts"],
    migrations: ["src/migrations/*.ts"],
    logging: true,
    synchronize: true,
    options: {
      trustServerCertificate: true,
    },
})