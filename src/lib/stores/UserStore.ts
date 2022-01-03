import { writable } from 'svelte/store';
import type { Session } from "@supabase/gotrue-js";
import cookie from 'cookie'
import { UserProfileModel } from '$lib/models/user/UserProfileModel';
import { session } from '$app/stores';
import { browser } from '$app/env';
import { supabase } from '$lib/utils/db';
import type { RealtimeSubscription } from '@supabase/supabase-js';
import { addToast } from 'as-toast';
import { toast } from '$lib/utils/ToastHandler';
import { ToastTitles } from '$lib/models/core/Messages';
import { Table } from '$lib/utils/repositories/RepositoryBase';

export const signedInUser = writable<UserProfileModel>(getUserFromStorage());
signedInUser.subscribe(val => setUserInLocalStorage(val));

let messageSubscription: RealtimeSubscription;

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

    handleSubscriptions(userProfileModel.username);
}

export function logout() {
    clearUserAndSession();
    supabase.removeSubscription(messageSubscription);
}

function clearUserAndSession() {
    try {
        session.set(null);
        signedInUser.set(new UserProfileModel());
        localStorage.removeItem("user")
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
        var user = JSON.parse(localStorage.getItem("user"));

        if(user) {
            console.dir(user)
            // handleSubscriptions(user.username);
            return user;
        } 

        return new UserProfileModel();
    }
}

function setUserInLocalStorage(val: UserProfileModel): void {
    if (browser) {
        localStorage.setItem("user", JSON.stringify(val))
    }
}


function handleSubscriptions(username: string) {
    
    messageSubscription = supabase
        .from(`${Table.Messages}:to=eq.${username}`)
        .on('INSERT', payload => toast(payload.new.content, `${ToastTitles.PrivateMessage} ${payload.new.from}`))
        .subscribe();
}

