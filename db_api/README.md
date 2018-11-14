## CS-554 Assignment 6: Data API

A minimal api utilizing redis and a web worked.

## Server
`GET /api/people/:id`
- Publishes a message to request a person from the worker, and renders JSON of the person (or of an error, should once occur)

`POST /api/people`
- Publishes a message to request that the worker creates a person, and renders JSON of the person created (or of an error, should once occur)

`DELETE /api/people/:id`
- Publishes a message to request that the worker deletes a person, and renders JSON stating that the operation completed (or of an error, should once occur)

`PUT /api/people/:id`
- Publishes a message to request that the worker updates a person, and renders JSON of the person updated (or of an error, should once occur)

## Worker
- Downloads dummy data set to memory
- Responds to a GET request by providing the person listed at the supplied ID
- Responds to a POST request by adding a person with the supplied information to the dataset
- Responds to a PUT request by updating a person with the supplied information in the dataset
- Responds to a DELETE request by deleting a person with the supplied ID in the dataset
