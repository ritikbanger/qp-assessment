import express, { Express } from "express";
import cors from "cors";

const app: Express = express();

app.use(cors());

const port = 3001;

app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true, limit: "5mb" }));

app.get("/", (req, res) => {
	res.send("Welcome to the Grocery Booking API");
});

app.listen(port, () => {
	console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
