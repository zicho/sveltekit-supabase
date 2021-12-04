import cookie from 'cookie'

export function getSession(request: { headers: { cookie: string } }) {
    return cookie.parse(request.headers.cookie || '').access_token || null
}