import { DataSource, DataSourceOptions } from "typeorm";
import envConfig from "./envConfig";
import { envData } from "../interface/commonInterface";

const keys: envData = envConfig();

/**
 * Database connection details as per environment configuration
 * @returns object with key either data or err
 */
const dbConnectionDetails = async () => {
	return new Promise((resolve) => {
		const connectionOptions: DataSourceOptions = {
			type: "postgres",
			host: keys.database_host,
			port: keys.database_port,
			username: keys.database_username,
			password: keys.database_password,
			database: keys.database_name,
			synchronize: true,
			logging: false,
			entities: ["src/entities/*.ts", "src/entities/*.js"],
			migrations: ["src/migrations/**/*{.ts,.js}"],
			subscribers: ["../src/subscriber/**/*{.ts,.js}"],
			useUTC: true,
		};

		try {
			const dataSource = new DataSource(connectionOptions);

			dataSource.initialize().then(() => {
				console.log("Database initialized");
				resolve(dataSource);
			});
		} catch (e) {
			console.error("Database initialization error", e);
			resolve(undefined);
		}
	});
};

export default dbConnectionDetails;
