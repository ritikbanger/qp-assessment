import env from "../../env.json";
import { envData } from "../interface/commonInterface";

const envConfig = (): envData => {
	const nodeEnv = process.env.NODE_ENV || "local";
	return env[nodeEnv];
};

export default envConfig;
