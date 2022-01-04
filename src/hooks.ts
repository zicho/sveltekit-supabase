import { activateSubscriptions } from '$lib/stores/UserStore';
import cookie from 'cookie'

export function getSession(request: { headers: { cookie: string } }) {


    let c =  cookie.parse(request.headers.cookie || '').access_token || null

    if(c == null) return null;
    else {
        activateSubscriptions('datanist')
        return c;
    }

    return cookie.parse(request.headers.cookie || '').access_token || null
}