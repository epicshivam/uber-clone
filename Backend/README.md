# User Registration Endpoint Documentation

## Endpoint

`POST /user/register`

## Description

Registers a new user in the system. This endpoint expects user details in the request body and returns a JWT token and the created user object upon successful registration.

## Request Body

Send a JSON object with the following structure:

```json
{
  "fullName": {
    "firstName": "John",
    "lastName": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

### Field Requirements

- `fullName.firstName` (string, required): Minimum 3 characters.
- `fullName.lastName` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 3 characters.

## Responses

### Success

- **Status Code:** `201 Created`
- **Body**
  ```json
  {
    "token": "<JWT_TOKEN>",
    "user": {
      "_id": "...",
      "fullName": {
        "firstName": "John",
        "lastName": "Doe"
      },
      "email": "john.doe@example.com"
      // other user fields
    }
  }
  ```

### Validation Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "errors": [
      {
        "msg": "Invalid Email",
        "param": "email",
        "location": "body"
      }
      // other validation errors
    ]
  }
  ```

## Example Request

```sh
curl -X POST http://localhost:3000/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": { "firstName": "John", "lastName": "Doe" },
    "email": "john.doe@example.com",
    "password":