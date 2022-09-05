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

## API

`POST /api/report`
```
Body: 
  - Image Buffer
  - Callback API endpoint
  - User identifier
  - Comment (optional)
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

## Usage

Use your system to call the exported endpoint or use the following URL to access the provided UI: [Image Reporter](http://localhost:3001/)  
//TODO: Talk about users? Does system need to login to use API?
To be able to approve/reject reports, you need to be logged on the UI with a User with the "admin" role  
When the report status is changed from `Pending` to `Rejected` or `Approved`, the provided callback endpoint is called
