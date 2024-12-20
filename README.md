# Chatting Application

A simple chatting application built with **Socket.IO**, **React**, and **Node.js**.

## Features

- User Signup and Login
- Real-time chat with online status indicators
- User logout functionality
- User Authentications

## Technologies Used

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js, Socket.IO
- **Database**: MongoDB (for user data storage)
- **Authentication**: JWT (JSON Web Token)
- **Version Control**: Git, GitHub




# API Documentation

## 1. Signup

### URL
`/api/auth/signup`

### Method
`POST`

### Description
This endpoint allows users to sign up by providing their username, email, and password. Upon successful registration, it returns a user object and an authentication token.

### Request Body
```json
{
    "username": "abc",
    "email": "abc@gmail.com",
    "password": "123456"
}
```

### Response
```json
{
    "message": "User Created",
    "users": {
        "username": "abc",
        "email": "abc@gmail.com",
        "password": "$2b$10$Xd9qYtzSUpAFOaho8.ODLugFaVaVMtt6v1h.PpP3o4.stjClQ6SeS",
        "avatarUrl": "https://avatar.iran.liara.run/public/boy?username=abc",
        "gender": "male",
        "_id": "676574d14c5d3cb0d8d746bd",
        "createdAt": "2024-12-20T13:44:49.820Z",
        "updatedAt": "2024-12-20T13:44:49.820Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiYyIsIl9pZCI6IjY3NjU3NGQxNGM1ZDNjYjBkOGQ3NDZiZCIsImVtYWlsIjoiYWJjQGdtYWlsLmNvbSIsImlhdCI6MTczNDcwMjI4OSwiZXhwIjoxNzM0Nzg4Njg5fQ.3CZnDxu1f_uaNXkLyRxzEexRT7W7juBymKlTj_MjAoA"
}
```



## 2. Login

### URL
`/api/auth/login`

### Method
`POST`

### Description
This endpoint allows users to log in by providing their email and password. Upon successful authentication, it returns a user object and an authentication token.
### Request Body
```json
{
    "email": "abc@gmail.com",
    "password": "123456"
}
```

### Response
```json
{
    "message": "Login Successfully",
    "user": {
        "_id": "676574d14c5d3cb0d8d746bd",
        "username": "abc",
        "email": "abc@gmail.com",
        "password": "$2b$10$Xd9qYtzSUpAFOaho8.ODLugFaVaVMtt6v1h.PpP3o4.stjClQ6SeS",
        "avatarUrl": "https://avatar.iran.liara.run/public/boy?username=abc",
        "gender": "male",
        "createdAt": "2024-12-20T13:44:49.820Z",
        "updatedAt": "2024-12-20T13:44:49.820Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFiYyIsIl9pZCI6IjY3NjU3NGQxNGM1ZDNjYjBkOGQ3NDZiZCIsImVtYWlsIjoiYWJjQGdtYWlsLmNvbSIsImlhdCI6MTczNDcwMzEzNywiZXhwIjoxNzM0Nzg5NTM3fQ.17RmWXmlR3auC1ftcdPC8GO33O3DG_G4Cj8RvRrOfco"
}
```




## 3. Logout

### URL
`/api/auth/logout`

### Method
`GET`

### Description
This endpoint allows users to logout.



## 4. Get Users (Excluding Logged-In User)

### URL
`/api/users`

### Method
`GET`

### Description
This endpoint retrieves a list of all users except the currently logged-in user. The logged-in user's information is excluded from the response based on the provided authentication token.

### Headers
- **Authorization**: `Bearer <your_token>`

### Response

```json
[
    {
        "_id": "63a7f8c9204d3e8b8b8d25c1",
        "username": "JohnDoe",
        "email": "johndoe@gmail.com",
        "avatarUrl": "https://avatar.example.com/johndoe",
        "gender": "male",
        "createdAt": "2024-01-15T12:34:56.789Z",
        "updatedAt": "2024-01-15T12:34:56.789Z"
    },
    {
        "_id": "63a7f8c9204d3e8b8b8d25c2",
        "username": "JaneDoe",
        "email": "janedoe@gmail.com",
        "avatarUrl": "https://avatar.example.com/janedoe",
        "gender": "female",
        "createdAt": "2024-02-12T11:23:45.678Z",
        "updatedAt": "2024-02-12T11:23:45.678Z"
    }
]
```


## 5. Get Logged-In User Details

### URL
`/api/auth/get-user`

### Method
`GET`

### Description
This endpoint retrieves the details of the currently logged-in user. The user is authenticated using the token provided in the request header.

### Headers
- **Authorization**: `Bearer <your_token>`

### Response

```json
{
    "_id": "676574d14c5d3cb0d8d746bd",
    "username": "abc",
    "email": "abc@gmail.com",
    "avatarUrl": "https://avatar.iran.liara.run/public/boy?username=abc",
    "gender": "male",
    "createdAt": "2024-12-20T13:44:49.820Z",
    "updatedAt": "2024-12-20T13:44:49.820Z",
    "__v": 0
}
```

# API Documentation

## 6. Get User Details by ID

### URL
/`api/users/details`

### Method
`POST`

### Description
This endpoint retrieves the details of a user by providing their user ID in the request body. The server will return the user details associated with the provided ID.

### Request Body
```json
{
    "id": "676458d45d835130f28f16c4"
}
```
### Response

```json
{
    "_id": "676458d45d835130f28f16c4",
    "username": "johnDoe",
    "email": "johndoe@example.com",
    "avatarUrl": "https://avatar.iran.liara.run/public/boy?username=johnDoe",
    "gender": "male",
    "createdAt": "2024-12-20T13:44:49.820Z",
    "updatedAt": "2024-12-20T13:44:49.820Z",
    "__v": 0
}
```
## 7. Send Message

### URL
`/api/message/send/:receiverId`

### Method
`POST`

### Description
This endpoint allows users to send a message to another user by providing the recipient's user ID in the URL. The sender must include the message content in the request body. 

### URL Parameters
- **receiverId**: The user ID of the recipient (e.g., `676474b04083f8f86d4747f8`).

### Request Body
```json
{
    "message": "Hello, how are you?"
}
```

### Response
```json
    {
    "message": "Message sent successfully",
    "newMessage": {
        "senderId": "676458d45d835130f28f16c4",
        "receiverId": "676474b04083f8f86d4747f8",
        "message": "Hello, how are you?"
        "_id": "6765305d3bf338de769fc62e",
        "createdAt": "2024-12-20T08:52:45.620Z",
        "updatedAt": "2024-12-20T08:52:45.620Z",
        "__v": 0
    }
}
```


## 8. Get Message Details

### URL
`/api/message/:receiverId`

### Method
`GET`

### Description
This endpoint allows users to retrieve all the messages exchanged between the logged-in user and the specified receiver by providing the receiver's user ID in the URL. 

### URL Parameters
- **receiverId**: The user ID of the recipient whose message history is being requested (e.g., `67644d9cf754103490e207cd`).

### Response
```json
{
    "messages": [
        {
            "_id": "67645c29175b6b937e8b60ac",
            "senderId": "676458d45d835130f28f16c4",
            "receiverId": "67644d9cf754103490e207cd",
            "message": "Hii",
            "createdAt": "2024-12-19T17:47:21.828Z",
            "updatedAt": "2024-12-19T17:47:21.828Z",
            "__v": 0
        },
        {
            "_id": "67652a4c3bf338de769cac4d",
            "senderId": "676458d45d835130f28f16c4",
            "receiverId": "67644d9cf754103490e207cd",
            "message": "Hello",
            "createdAt": "2024-12-20T08:26:52.491Z",
            "updatedAt": "2024-12-20T08:26:52.491Z",
            "__v": 0
        }
    ]
}
```
