import { writable } from 'svelte/store';
import type { ServiceResponse } from "$lib/models/ServiceResponse";
import type { LoginUserModel } from "$lib/models/user/LoginUserModel";
import type { RegisterUserModel } from "$lib/models/user/RegisterUserModel";
import { get, post } from "$lib/utils/EndpointClient";
import type { Session } from "@supabase/gotrue-js";
import cookie from 'cookie'
import type { UserProfileModel } from '$lib/models/user/UserProfileModel';
import { session } from '$app/stores';

export let user = writable<UserProfileModel>(null);

export async function login(user: LoginUserModel): Promise<ServiceResponse<{ session: Session, userProfileModel: UserProfileModel }>> {

    try {
        var res = await post<LoginUserModel, { session: Session, userProfileModel: UserProfileModel }>('api/user/login', user);

        return res;

    } catch (err) {
        console.log(err);
    }
}

export async function register(user: RegisterUserModel): Promise<ServiceResponse<{ session: Session, userProfileModel: UserProfileModel }>> {

    try {
        let res = await post<RegisterUserModel, { session: Session, userProfileModel: UserProfileModel }>('api/user/register', user);

        return res;

    } catch (err) {
        console.log(err);
    }
}

export async function logout(): Promise<ServiceResponse<void>> {

    try {
        return await post('api/user/logout');
    } catch (err) {
        console.log(err);
    }
}

export async function profile(): Promise<ServiceResponse<UserProfileModel>> {
    try {
        console.log("hittin the service")
        // console.log("username: " + username)
        var res = await get<UserProfileModel>('/api/user/test');
        console.log("-------------------------------------------")
        console.log("Data returned from get: ")
        console.dir(res)
        console.log("-------------------------------------------")
        return res;
    } catch (err) {
        console.log(err);
    }
}

export function setSessionHeaders(session: Session) {
    return {
        'Set-Cookie':
            cookie.serialize(
                'access_token', session.access_token, {
                httpOnly: true,
                sameSite: 'lax',
                secure: true,
                maxAge: session.expires_in * 1000,
                path: "/"
            })
    }
}

export function setUserAndSession(s: Session, userProfileModel: UserProfileModel) {
    session.set(s);
    user.set(userProfileModel);
}


export function clearSessionHeaders() {
    console.log("clearing cookie")
    return {
        'set-cookie': 'access_token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
}