# QA-Server

The `qa-server` is the server-side app companion for HeapOverrun. It presents some APIs to perform some CRUD operations on questions and their answers.

## APIs

Hereafter, we report the designed HTTP APIs, also implemented in the project.

### __List of all questions__

URL: `/api/questions`

HTTP Method: GET

Description: Retrieve all questions

Response: `200 Ok` (success), `500 Internal Server Error` (generic error)

Response body:

```json
[
    {
        "id": 1,
        "text": "Is Javascript better than Python?",
        "email": "stivigas@gmail.com",
        "date": "2025-03-15",
    },
    ...
]
```

### __Get a single question__

URL: `/api/questions/<id>`

HTTP Method: GET

Description: Retrieve a question by its `<id>`

Response: `200 Ok` (success), `404 Not Found` (wrong id), `500 Internal Server Error` (generic error)

Response body:

```json
{
    "id": 1,
    "text": "Is Javascript better than Python?",
    "email": "stivigas@gmail.com",
    "date": "2025-03-15",
}
```

### __Get answers of a single questions__

URL: `/api/questions/<id>/answers`

HTTP Method: GET

Description: Retrieve all the answers of the question represented by its `<id>`

Response: `200 Ok` (success), `404 Not Found` (wrong id), `500 Internal Server Error` (generic error)

Response body:

```json
[
    {
        "id": 1,
        "text": "Yes",
        "email": "stivigas@gmail.com",
        "score": -5,
        "date": "2025-03-17",
    },
    ...
]

```

### __Create a new answer for a given question__

URL: `/api/questions/<id>/answers`

HTTP Method: POST

Description: Create a new answer for the question represented by its `<id>`

Response: `201 Created` (success, with the created id), `404 Not Found` (wrong id), `422 Unprocessable Entity` (validation error), `503 Service Unavailable` (generic error)

Request Body:

```json
{
    "text": "Last year, it had about 220 first-timers.",
    "email": "stivigas@gmail.com",
    "score": 0,
    "date": "2025-03-20"
}
```

Response body: __None__

### __Update an existing answer for a given question__

URL: `/api/questions/<questionId>/answers/<answerId>`

HTTP Method: POST

Description: Create a new answer for the question represented by its `<id>`

Response: `201 Created` (success, with the created id), `404 Not Found` (wrong id), `422 Unprocessable Entity` (validation error), `503 Service Unavailable` (generic error)

Request Body:

```json
{
    "text": "Last year, it had about 220 first-timers.",
    "email": "stivigas@gmail.com",
    "score": 0,
    "date": "2025-03-20"
}
```

Response body: __None__
