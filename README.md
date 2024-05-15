

# Sports Schedule App

## Overview

This application provides APIs to manage sports schedules for users. It allows users to book slots for sports activities and creates a schedule for the sports day accordingly.

## Endpoints

### Create Sport Schedule

- **Endpoint**: `/api/sport_schedule/create` (authenticated request)
- **Method**: POST
- **Description**: Creates a schedule for a sport on a specific date and time. If the requested time slot is already booked, it will adjust the schedule accordingly.
- **Example**:
  - In the first request, a user books a slot for football from 11:00 to 13:00. It gets stored.
  - In the second request, the user books a slot for cricket from 10:00 to 11:30. It will store the cricket schedule from 10:00 to 11:00 only, as the 11:00 to 11:30 slot was already booked for football.

## Database Tables

1. **sport_schedule**
   - **Columns**:
     - id: ID of the schedule
     - name: Name of the sport
     - startTime: Start time of the schedule
     - endTime: End time of the schedule
     - date: Date of the schedule

2. **user**
   - **Columns**:
     - id: ID of the user
     - full_name: Full name of the user
     - email: Email address of the user
     - password: Password of the user (stored in hash format)

## Tech Stack

- Nest.js: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- Prisma: A modern database toolkit for TypeScript and Node.js that replaces traditional ORMs.
- MySQL: A popular open-source relational database management system.
- Passport.js: Authentication middleware for Node.js.
- bcryptjs: Library for hashing passwords.

## Usage

1. Clone the repository:

```bash
git clone https://github.com/your-username/sports-schedule-app.git
cd sports-schedule-app

Install dependencies:
npm install
 
Set up the database:

Create a MySQL database.
Configure the database URL in the .env file.
Start the application:
npm run start:dev


Certainly, here's how you can include an example request in the README file:

markdown
Copy code
## Example Request

To create a schedule for playing cricket on May 20, 2024, from 08:00 to 11:30, send a POST request to the following endpoint:

```http

Register user :
POST http://localhost:3000/user/register

Request Body:
{
  "fullName": "john",
  "email": "kutear@example.com",
  "password": "password123"
}

Response:
  {
    "status": "success",
    "message": "User created successfully."
}



Login for Authentication

http://localhost:3000/auth/login

Request Body:
{
  
  "email": "kutear@example.com",
  "password": "password123"
}

Response:
{
    "status": "success",
    "message": "Login successfully.",
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imt1dGVhckBleGFtcGxlLmNvbSIsImlhdCI6MTcxNTgwOTI4OSwiZXhwIjoxNzE1ODEyODg5fQ.zLjD7dMDH2uGDIBrNkEDTgEsa9hri1aTefEksSHyykQ"
}


# Sheduler
POST http://localhost:3000/api/sport_schedule/create

Request Body:
{
  "name": "Football",
  "startTime": "2024-05-20T11:30:00.000Z",
  "endTime": "2024-05-20T13:00:00.000Z",
  "date": "2024-05-20"
}


Response :
{
    "status": "success",
    "message": "Slot booked successfully.",
    "schedule": {
        "id": 47,
        "name": "Football",
        "startTime": "2024-05-20 17:00:00",
        "endTime": "2024-05-20 18:30:00",
        "date": "2024-05-20T00:00:00.000Z"
    }
}


Second Request 
{
  "name": "Cricket",
  "startTime": "2024-05-20T10:00:00.000Z",
  "endTime": "2024-05-20T11:30:00.000Z",
  "date": "2024-05-20"
}

Response
The time slot from 11:00 to 11:30 is already booked for Football.