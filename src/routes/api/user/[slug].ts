import { getSuccessResponse } from "$lib/models/ServiceResponse";
import { UserRepository } from "$lib/utils/repositories/UserRepository"

export async function get({ params }) {
	// the `slug` parameter is available because this file
	// is called [slug].json.js

	try {
		const { slug } = params;

		const data = await UserRepository.profile(slug);
	
		return {
			status: 200,
			body: data,
		};
	} catch {
		return {
			status: 500,
		};
	}
	
}