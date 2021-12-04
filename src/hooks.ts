import cookie from 'cookie'

// export async function handle({ request, resolve }) {

//     console.log("handle begins")
//     const cookies = cookie.parse(request.headers.cookie || '')

//     console.dir(cookies)

//     request.locals.user = cookies;
    
//     if (!cookies.session_id) {
//         console.log("handle: authenticated failed")
//         request.locals.authenticated = false;
//     } else {
//         console.log("handle: authenticated success")
//         request.locals.authenticated = true;
//     }

//     const response = await resolve(request);
//     console.log("resolve ends")
//     console.log("handle ends")
//     console.log("-----")

//     return {
//         ...response,
//         headers: {
//             ...response.headers
//         }
//     };
// }

export function getSession(request: { headers: { cookie: string } }) {
    return cookie.parse(request.headers.cookie || '').access_token || null
}