import { z } from 'zod';

const registerSchema = z.object({
	name: z
		.string({ required_error: 'Name is required' })
		.min(3, { message: 'Name must be more than 3 characters' })
		.max(64, { message: 'Name must be less than 64 characters' })
		.trim(),
	email: z
		.string({ required_error: 'Email is required' })
		.min(6, { message: 'Email must be more than 6 characters' })
		.max(64, { message: 'Email must be less than 64 characters' })
		.email(),
	password: z
		.string({ required_error: 'Password is required' })
		.min(6, { message: 'Password must be more than 6 characters' })
		.max(32, { message: 'Password must be less than 32 characters' })
		.trim(),
	passwordConfirm: z
		.string({ required_error: 'Password is required' })
		.min(6, { message: 'Password must be more than 6 characters' })
		.max(32, { message: 'Password must be less than 32 characters' })
		.trim(),
	terms: z.enum(['on'], { required_error: 'You must be accept the terms' })
});

export const actions = {
	default: async ({ request }) => {
		const formData = Object.fromEntries(await request.formData());

		try {
			const resultSchema = registerSchema.parse(formData);
		} catch (e) {
			const { fieldErrors } = e.flatten();

			const { password, passwordConfirm, ...rest } = formData;

			console.log(fieldErrors);

			return {
				data: rest,
				errors: fieldErrors
			};
		}
	}
};
