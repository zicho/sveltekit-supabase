# SvelteKit and Supabase app
## Demo, testing, prototyping, etc. Mainly for learning.

### Basic architecture

I have tried to separate client and server logic as much as possible. The basic idea is that the client should _never_ directly communicate with any endpoint (at all).

This shall be the responsibility of the "Services" (perhaps it would be more prudent to call them controllers, though)

So basically: 

<code>Client -> Service -> Endpoint -> Supabase.</code>

# Why? #

The reason I do it this way is mainly because I want to see if it is possible to maintain this architecture as the project grows. I believe it will scale well when and if the application grows. It may seem to be over-engineered (and maybe it is) but I think that it will in the long run improve code readability and prevent "boilerplate code redundancy". Components/pages will all have common entry into the the "inner workings" of the application via the services, to ensure that every request will be processed identically.