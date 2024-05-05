import { DataSource, EntityTarget } from "typeorm";
import dbConnectionDetails from "../config/databaseConfig";

class DbConnection {
	static connectionInfo: DataSource | undefined;

	public async getDataSource(): Promise<DataSource> {
		return new Promise((resolve) => {
			if (!DbConnection.connectionInfo?.isInitialized) {
				dbConnectionDetails().then(async (connection: Promise<DataSource>) => {
					DbConnection.connectionInfo = await connection;
					resolve(DbConnection.connectionInfo);
				});
			} else {
				resolve(DbConnection.connectionInfo);
			}
		});
	}
	public async getRepository<T>(model: EntityTarget<T>) {
		const dbConnection = await this.getDataSource();
		const repository = dbConnection.getRepository(model);
		return repository;
	}

	public async createQueryRunner() {
		const dbConnection = await this.getDataSource();
		const repository = dbConnection.createQueryRunner();
		return repository;
	}
}

export default new DbConnection();
