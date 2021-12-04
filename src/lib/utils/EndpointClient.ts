// handles sveltekit endpoints

import type { ServiceResponse } from "$lib/models/ServiceResponse";

// T1 is what you send in, T2 is what you get back.
export async function get<T1>(endpoint: string): Promise<ServiceResponse<T1>> {
    console.dir(`Attempting ENDPOINT get request at: ${endpoint}`);

    try {
        const res = await fetch(endpoint);
        const data = await res.json();
        return data as ServiceResponse<T1>;
    } catch (err) {
        console.log(err);
    }
}

// T1 is what you send in, T2 is what you get back.
export async function post<T1, T2>(endpoint: string, body?: T1): Promise<ServiceResponse<T2>> {

    try {
        const res = await fetch(endpoint, {
            method: 'POST',
            body: JSON.stringify(body)
        });

        const data = await res.json();
        return data as ServiceResponse<T2>;
    } catch (err) {
        console.log(err);
    }
}


