/* eslint-disable @typescript-eslint/no-explicit-any */
export declare interface ResponseObject {
	success: boolean;
	message?: string;
	data?: any;
	token?: object;
	error?: unknown;
}
export declare type Resolve = (value: string | PromiseLike<string>) => void;
export declare type Reject = (reason?: any) => void;

export interface envData {
	env: string;
	port: number;
	database_host: string;
	database_port: number;
	database_username: string;
	database_password: string;
	database_name: string;
}
