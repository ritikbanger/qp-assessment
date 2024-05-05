import { ILogin, ISignup } from "./interface";
import { ResponseObject } from "../../interface/commonInterface";
import DbConnection from "../../db/dbConnection";

import UserModel from "../../entities/user";
import bcrypt from "bcryptjs";
import createToken from "../../middleware/generate";

import { apiResponse } from "../../utils/constants";

export class AuthService {
	static response: ResponseObject;

	static getUserByEmail = async ({ email }: { email: string }) => {
		const usersRepo = await DbConnection.getRepository(UserModel);
		const user = await usersRepo.findOne({
			where: {
				email: email.toLowerCase(),
			},
		});

		return user;
	};

	static async login(data: ILogin) {
		try {
			const { email, password } = data;
			const userDetails = await this.getUserByEmail({ email });

			if (userDetails && userDetails.email) {
				const { password: dbPassword, ...restUserDetails } = userDetails;

				const checkPassword = await bcrypt.compare(
					password.toString().trim(),
					`${dbPassword}`
				);
				if (!checkPassword) {
					this.response = {
						success: false,
						message: apiResponse.INCORRECT_PASSWORD,
					};
				} else {
					const token = await createToken({
						email: restUserDetails.email,
						id: restUserDetails.id,
						account_type: restUserDetails.account_type,
					});

					this.response = {
						success: true,
						message: apiResponse.SUCCESSFUL_LOGGED,
						data: {
							userData: restUserDetails,
							token,
						},
					};
				}
			} else {
				this.response = {
					success: false,
					message: apiResponse.EMAIL_NOT_FOUND,
				};
			}
			return this.response;
		} catch (error) {
			console.error(error);
			return {
				success: false,
				message: "An error occurred while logging in.",
				data: error,
			};
		}
	}
	static async signUp(data: ISignup) {
		try {
			const { email, account_type, first_name, last_name, password } = data;
			const user = new UserModel();

			if (email) {
				const isUserEmailExists = await this.getUserByEmail({
					email,
				});

				if (isUserEmailExists && isUserEmailExists.email) {
					return (this.response = {
						success: false,
						message: apiResponse.EMAIL_EXIST,
					});
				}

				user.email = email.toLowerCase().trim();

				user.first_name = first_name;
				user.last_name = last_name;
				user.password = await bcrypt.hash(password, 8);
				user.account_type = account_type;

				const userRepo = await DbConnection.getRepository(UserModel);
				await userRepo.save({ ...user });
			}
			return (this.response = {
				success: true,
				message: "signup successful",
			});
		} catch (error) {
			console.error("signup_catch_error", error);
			return {
				success: false,
				message: "An error occurred while signing up.",
				data: error,
			};
		}
	}
}

export default AuthService;
