import { RegisterRoutes } from "../build/routes";
import express, { json, urlencoded, Response as ExResponse, Request as ExRequest, NextFunction } from "express";
import swaggerUi from "swagger-ui-express";
import swaggerJSON from "../build/swagger.json";
import { ValidateError } from "tsoa";
import { myDatabase } from "./config/database";

export const app = express();

myDatabase
	.initialize()
	.then(() => {
		console.log("Data Source has been initialized!");
	})
	.catch((err) => {
		console.error("Error during Data Source initialization:", err);
	});

app.use(
	urlencoded({
		extended: true,
	})
);
app.use(json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerJSON));

RegisterRoutes(app);

app.use((err: any, req: ExRequest, res: ExResponse, next: NextFunction) => {
	if (err instanceof ValidateError) {
		console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
		res.status(500).send({
			message: err?.fields,
		});
	}
	if (err) {
		console.log("err: ", JSON.stringify(err));
		res.status(500).send({
			message: err.errors || err.message || "Internal Server Error",
		});
	}

	next();
});

app.use(function notFoundHandler(_req, res: ExResponse) {
	res.status(404).send({
		message: "Not Found",
	});
});
