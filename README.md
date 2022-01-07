# SvelteKit and Supabase app
## Demo, testing, prototyping, etc. Mainly for learning.

I am not a SvelteKit or Supabase expert by any means. My way of doing thing may be wildly unidiomatic. Tread with caution.

### Basic architecture

I have tried to separate client and server logic as much as possible. That's it for now. 

# Why? #

The reason I do it this way is mainly because I want to see if it is possible to maintain this architecture as the project grows. I believe it will scale well when and if the application grows. It may seem to be over-engineered (and maybe it is) but I think that it will in the long run improve code readability and prevent "boilerplate code redundancy". Components/pages will all have common entry into the the "inner workings" of the application via the services, to ensure that every request will be processed identically.
