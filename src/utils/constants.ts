export enum ACCOUNT_TYPE {
	ADMIN = "admin",
	USER = "user",
}

/* eslint-disable no-useless-escape */
export const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const passwordRegex =
	/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;

export const labels = {
	accountType: "Account Type",
	email: "Email",
	password: "Password",
	lastName: "Last name",
	firstName: "First name",
	id: "Id",
	userId: "User id",
};

export const apiResponse = {
	EMAIL_EXIST: "Email already exists",
	EMAIL_NOT_FOUND: "Email not found",
	SUCCESSFUL_LOGGED: "Logged in successfully",
	ACCOUNT_NOT_CREATED: "Account creation failed",
	SUCCESSFUL_CREATED: "Account created successfully",
	USER_FOUND_SUCCESSFULLY: "User found successfully",
	INCORRECT_PASSWORD: "Either email or password is incorrect",
	LOGIN_FAILED: "Login Failed",
	SIGN_UP_FAILED: "Signup Failed",
	NO_AUTH_TOKEN: "No Token Found",
	UNAUTHORIZED_USER: "User is unauthorized to perform this action",
	AUTH_TOKEN_VERIFICATION_FAILED: "Token verification failed",
	INVALID_AUTH_TOKEN: "Your session has expired. Please login again.",
	SOMETHING_WENT_WRONG: "Something went wrong! please try after sometime.",
};
