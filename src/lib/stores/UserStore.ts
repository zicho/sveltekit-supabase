import { writable } from 'svelte/store';
import type { Session } from "@supabase/gotrue-js";
import cookie from 'cookie'
import { UserProfileModel } from '$lib/models/user/UserProfileModel';
import { session } from '$app/stores';
import { browser } from '$app/env';
import { supabase } from '$lib/utils/db';
import type { RealtimeSubscription } from '@supabase/supabase-js';
import { addToast } from 'as-toast';

export const signedInUser = writable<UserProfileModel>(getUserFromStorage());
signedInUser.subscribe(val => setUserInLocalStorage(val));

let subscription: RealtimeSubscription;

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
    signedInUser.set(userProfileModel);

    subscription = supabase
        .from(`private_messages:to=eq.${userProfileModel.username}`)
        // .on('INSERT', () => addToast('You have received a PM'))
        //.from('private_messages')
        .on('INSERT', () => console.log("realtime test"))
        .subscribe();
}

export function clearUserAndSession() {
    try {
        session.set(null);
        signedInUser.set(new UserProfileModel());
    } catch (err) {
        console.log(err)
    }

}

export function clearSessionHeaders() {
    console.log("clearing cookie")
    return {
        'set-cookie': 'access_token=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    }
}

function getUserFromStorage(): UserProfileModel {
    if (browser) {
        return JSON.parse(localStorage.getItem("user")) || new UserProfileModel()
    }
}

function setUserInLocalStorage(val: UserProfileModel): void {
    if (browser) {
        localStorage.setItem("user", JSON.stringify(val))
    }
}