## CS-554 Assignment 5:  User Cache 

A minimal api utilizing redis. Servics following routes:

**`/api/people/history`:**
- responds with an array of the last 20 users in the cache from the recently viewed list

**`/api/people/:id`:**
- Checks if the user has a cache entry in redis. If so, renders the result from that cache entry
-  If not, queries the data for the person and fail the request if they are not found, or send JSON and cache the result if they are found
