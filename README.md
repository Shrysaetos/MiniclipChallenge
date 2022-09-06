# MiniclipChallenge

This is a system designed to help manage user generated images

## Configuration 

This is only required to use the UI designed to let users create image reports  
Open file `/frontend/.env`  
Edit the parameter `VITE_CALLBACK` and replace it's value with your system API.

## Installation

Clone the repository to the desired location.

```bash
git clone https://github.com/Shrysaetos/MiniclipChallenge.git
cd MiniclipChallenge
docker-compose up
```

## Seeding

The USER table is seeded automatically, to provide basic user authentication.
The following users are provided:
```javascript
  {
    name: 'User1',
    username: `user1`,
    password: `user1`,
  },
  {
    name: 'User2',
    username: `user2`,
    password: `user2`,
  },
  {
    name: 'Admin1',
    username: `admin1`,
    password: `admin1`,
    role: 'admin',
  },
  {
    name: 'Admin2',
    username: `admin2`,
    password: `admin2`,
    role: 'admin',
  }
```

## API

`POST /auth/login`
```typescript
Request.user = {
  username: string,
  password: string
}
```

`POST /api/report`
```typescript
Body = {
  image: File,
  callback: string,
  userId: number,
  comment: string, (optional)
}
```

## Usage

###### Create a Report

First decide if you're going to use a detached system or the provided UI ([Image Reporter](http://localhost:3001/)) to call the API  
If you're using the UI:
```
  Login with any user
  Create a report
```
If you're using a detached system:
```
  Send POST request to `/auth/login` endpoint; This will return an access token
  Send POST request to  `api/report` adding access token to Authorization Header as a Bearer Token
```

###### Approve a Report
Login on the UI with a User with the "admin" role (e.g. username: admin1, password: admin1): [Image Reporter](http://localhost:3001/)  
When the report status is changed from `Pending` to `Rejected` or `Approved`, the provided callback endpoint will be called  
