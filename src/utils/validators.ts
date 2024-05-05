/**
 * Validates a given data against predefined schema.
 *
 */
const validate = (data: object, schema): Promise<object> =>
	new Promise((resolve, reject) => {
		const options = { abortEarly: false };
		const { error, value } = schema.validate(data, options);

		if (error) {
			const errorMessage = error.details
				.map(
					(detail, index) =>
						detail.message + `${index === error.details.length - 1 ? "" : ", "}`
				)
				.join(" ")
				.replace(/["\\]/g, "");

			reject(errorMessage);
			return;
		}
		resolve(value);
	});
export default validate;
