import express, { Express } from "express";
import cors from "cors";
import envConfig from "./src/config/envConfig";
import dbConnectionDetails from "./src/config/databaseConfig";
import { authRoutes } from "./src/features/auth/routes";

const app: Express = express();

const config = envConfig();

const { port } = config;

dbConnectionDetails();

app.use(cors());

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.get("/", (req, res) => {
	res.send("Welcome to the Grocery Booking API");
});

app.use(authRoutes);

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
