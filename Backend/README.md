# API Endpoint Documentation

## User Registration

### Endpoint

`POST /user/register`

### Description

Registers a new user in the system. This endpoint expects user details in the request body and returns a JWT token and the created user object upon successful registration.

### Request Body

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

#### Field Requirements

- `fullName.firstName` (string, required): Minimum 3 characters.
- `fullName.lastName` (string, optional): Minimum 3 characters if provided.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 3 characters.

### Responses

#### Success

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

#### Validation Error

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

### Example Request

```sh
curl -X POST http://localhost:3000/user/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": { "firstName": "John", "lastName": "Doe" },
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```

---

## User Login

### Endpoint

`POST /user/login`

### Description

Authenticates an existing user. This endpoint expects the user's email and password in the request body and returns a JWT token and user object upon successful login.

### Request Body

```json
{
  "email": "john.doe@example.com",
  "password": "yourpassword"
}
```

#### Field Requirements

- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 3 characters.

### Responses

#### Success

- **Status Code:** `200 OK`
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

#### Validation Error

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

#### Authentication Error

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

### Example Request

```sh
curl -X POST http://localhost:3000/user/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@example.com",
    "password": "yourpassword"
  }'
```

---

## User Profile

### Endpoint

`GET /user/profile`

### Description

Returns the authenticated user's profile information. Requires a valid JWT token (sent via cookie or Authorization header).

### Request Headers

- `Authorization: Bearer <JWT_TOKEN>` (if not using cookies)

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body**
  ```json
  {
    "_id": "...",
    "fullName": {
      "firstName": "John",
      "lastName": "Doe"
    },
    "email": "john.doe@example.com"
    // other user fields
  }
  ```

#### Authentication Error

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Authentication required"
  }
  ```

### Example Request

```sh
curl -X GET http://localhost:3000/user/profile \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

---

## User Logout

### Endpoint

`GET /user/logout`

### Description

Logs out the authenticated user by blacklisting the JWT token and clearing the authentication cookie.

### Request Headers

- `Authorization: Bearer <JWT_TOKEN>` (if not using cookies)

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body**
  ```json
  {
    "message": "Logged out"
  }
  ```

#### Authentication Error

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Authentication required"
  }
  ```

### Example Request

```sh
curl -X GET http://localhost:3000/user/logout \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

---

# Captain Endpoint Documentation

## Captain Registration

### Endpoint

`POST /captain/register`

### Description

Registers a new captain (driver) in the system. This endpoint expects captain and vehicle details in the request body and returns a JWT token and the created captain object upon successful registration.

### Request Body

```json
{
  "fullName": {
    "firstName": "Jane",
    "lastName": "Smith"
  },
  "email": "jane.smith@example.com",
  "password": "yourpassword",
  "vehicle": {
    "color": "Red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### Field Requirements

- `fullName.firstName` (string, required): Minimum 3 characters.
- `fullName.lastName` (string, required): Minimum 3 characters.
- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 3 characters.
- `vehicle.color` (string, required): Minimum 3 characters.
- `vehicle.plate` (string, required): Minimum 3 characters.
- `vehicle.capacity` (integer, required): Must be a number greater than 0.
- `vehicle.vehicleType` (string, required): Must be one of `car`, `motorcycle`, or `bicycle`.

### Responses

#### Success

- **Status Code:** `201 Created`
- **Body**
  ```json
  {
    "token": "<JWT_TOKEN>",
    "captain": {
      "_id": "...",
      "fullName": {
        "firstName": "Jane",
        "lastName": "Smith"
      },
      "email": "jane.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
      // other captain fields
    }
  }
  ```

#### Validation Error

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

#### Already Exists Error

- **Status Code:** `400 Bad Request`
- **Body:**
  ```json
  {
    "message": "Captain already exist"
  }
  ```

### Example Request

```sh
curl -X POST http://localhost:3000/captain/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": { "firstName": "Jane", "lastName": "Smith" },
    "email": "jane.smith@example.com",
    "password": "yourpassword",
    "vehicle": {
      "color": "Red",
      "plate": "ABC123",
      "capacity": 4,
      "vehicleType": "car"
    }
  }'
```

---

## Captain Login

### Endpoint

`POST /captain/login`

### Description

Authenticates an existing captain. This endpoint expects the captain's email and password in the request body and returns a JWT token and captain object upon successful login.

### Request Body

```json
{
  "email": "jane.smith@example.com",
  "password": "yourpassword"
}
```

#### Field Requirements

- `email` (string, required): Must be a valid email address.
- `password` (string, required): Minimum 3 characters.

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body**
  ```json
  {
    "token": "<JWT_TOKEN>",
    "captain": {
      "_id": "...",
      "fullName": {
        "firstName": "Jane",
        "lastName": "Smith"
      },
      "email": "jane.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
      // other captain fields
    }
  }
  ```

#### Validation Error

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

#### Authentication Error

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Invalid email or password"
  }
  ```

### Example Request

```sh
curl -X POST http://localhost:3000/captain/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "jane.smith@example.com",
    "password": "yourpassword"
  }'
```

---

## Captain Profile

### Endpoint

`GET /captain/profile`

### Description

Returns the authenticated captain's profile information. Requires a valid JWT token (sent via cookie or Authorization header).

### Request Headers

- `Authorization: Bearer <JWT_TOKEN>` (if not using cookies)

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body**
  ```json
  {
    "captain": {
      "_id": "...",
      "fullName": {
        "firstName": "Jane",
        "lastName": "Smith"
      },
      "email": "jane.smith@example.com",
      "vehicle": {
        "color": "Red",
        "plate": "ABC123",
        "capacity": 4,
        "vehicleType": "car"
      }
      // other captain fields
    }
  }
  ```

#### Authentication Error

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Authentication required"
  }
  ```

### Example Request

```sh
curl -X GET http://localhost:3000/captain/profile \
  -H "Authorization: Bearer <JWT_TOKEN>"
```

---

## Captain Logout

### Endpoint

`GET /captain/logout`

### Description

Logs out the authenticated captain by blacklisting the JWT token and clearing the authentication cookie.

### Request Headers

- `Authorization: Bearer <JWT_TOKEN>` (if not using cookies)

### Responses

#### Success

- **Status Code:** `200 OK`
- **Body**
  ```json
  {
    "message": "Logout Successfully"
  }
  ```

#### Authentication Error

- **Status Code:** `401 Unauthorized`
- **Body:**
  ```json
  {
    "message": "Authentication required"
  }
  ```

### Example Request

```sh
curl -X GET http://localhost:3000/captain/logout \
  -H "Authorization: Bearer <JWT_TOKEN>"
```