import { writable } from 'svelte/store';
import type { Session } from "@supabase/gotrue-js";
import cookie from 'cookie'
import { UserProfileModel } from '$lib/models/user/UserProfileModel';
import { session } from '$app/stores';
import { browser } from '$app/env';
import { supabase } from '$lib/utils/db';
import type { RealtimeSubscription } from '@supabase/supabase-js';
import { handleIncomingMessage, unreadMessages, updateMessages } from './MessageStore';
import { Tables } from '$lib/utils/DatabaseTypes';

export const signedInUser = writable<UserProfileModel>(getUserFromStorage());
signedInUser.subscribe(val => setUserInLocalStorage(val));

var messageSubscription: RealtimeSubscription;

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
    
    updateMessages(userProfileModel.username);
    
    clearSubscriptions();
    activateSubscriptions(userProfileModel.username);
}

export function logout() {
    clearUserAndSession();
    clearSubscriptions();
}

function clearUserAndSession() {
    try {
        session.set(null);
        signedInUser.set(new UserProfileModel());
        unreadMessages.set(0);
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

        if (user) {
            console.log("user retrieved")
            if (browser) {
                activateSubscriptions(user.username);
                updateMessages(user.username);
            }
            
            return user;
        }

        return new UserProfileModel();
    }
}

function setUserInLocalStorage(user: UserProfileModel): void {
    if (browser) {
        localStorage.setItem("user", JSON.stringify(user))
    }
}

export function activateSubscriptions(username: string) {
    clearSubscriptions();

    try {
        messageSubscription = supabase
        .from(`${Tables.Messages}:to=eq.${username}`)
        .on('INSERT', payload => handleIncomingMessage(payload))
        .subscribe();
    } catch (err) {
        console.log("Could not activate subscriptions: " + err)
    }
    
}

function clearSubscriptions() {
    console.log("clearing all supabase subscriptions")

    supabase.getSubscriptions().forEach(subscription => {
        supabase.removeSubscription(subscription);
    });

}

