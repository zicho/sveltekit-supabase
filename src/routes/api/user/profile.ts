import { getSuccessResponse } from "$lib/models/ServiceResponse";

export async function get() {
    return {
        status: 200,
        body: { 'hej' : "hejda3" }
    };

}