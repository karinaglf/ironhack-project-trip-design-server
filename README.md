# Project - Trip Design
<br>

## Description

A platform for travel advisors to create and share custom trip itineraries with their customers.

**Keywords:** Trip plan, custom itinerary, travel advisor app.
<br>

## User Stories

-  **404:** As a user I want to see an aesthetic 404 page when I try to access a page that doesn’t exist, so that I know it was my fault.
-  **500:** As a user I want to see an aesthetic error page when the dev team screws it up, so that I know that is not my fault.
-  **Signup:** As an anonymous user I can sign up on the platform I want to sign up as a travel advisor or as a traveller, so I can register my credentials to access the platform.
-  **Login:** As a user I can login to the platform so that I can access my profile and access the data I have access.
-  **Logout:** As a logged in user I can logout from the platform so no one else can use it.
-  **Travel Advisor Profile:** As a travel advisor I want to be able to see recent activities in my profile, so I can have a glimpse of the lasted trips I have created
-  **Create Trips:** As a travel advisor I want to have a trip creation tool where I can add information day-by-day and select hotels and experiences, so I can easily create custom itineraries for my clients
-  **Edit Trips:** As a travel advisor I want to be able to edit any itinerary I have created, so I can correct possible mistakes or adjust it after customer feedback.
-  **Delete Trips:** As a travel advisor I want to be able to delete any itinerary I have created, so I can correct remove it from the database.
-  **Customer Profile:** As a customer I want to be able to log in and have access to previous trip itineraries that have been created for me, so I can keep a history of all my trips.
-  **Trip Details - Share:** As a customer I want to be able to easily share the trip itinerary with my travel partners and friends, so they can view the itinerary without logging in.
-  **Trip Details:** As user with a valid trip itinerary llink I want to be able to access the details of the trip.


## Backlog

- Notify customers via email that the trip itinerary is ready, so they can check on the platform.
- Pre selected curated list of hotels and experiences
- Google API - Maps and Places
- Request Trip Design Form integrated with the app.


<br>


# Client / Frontend
## React Router Routes (React App)

| Path           | Component       | Permissions                 | Behavior                                          |
|----------------|-----------------|-----------------------------|---------------------------------------------------|
| `/`            | HomePage        | public `<Route>`            | Homepage                                          |
| `/signup`      | SignupPage      | anon only  `<AnonRoute>`    | Signup form, navigates to home page after signup. |
| `/login`       | HomePage        | anon only  `<AnonRoute>`    | Login form, navigates to home page after login.   |
| `/profile`     | ProfilePage     | user only `<PrivateRoute>`  | Profile for the current user                      |
| `/create-trip` | CreateTripPage  | admin only `<PrivateRoute>` | Create a new trip form                            |
| `/:tripId`     | TripDetailsPage | public `<Route>`            | Show detailed day-by-day trip itinerary           |
| /:tripId/edit  | EditTripPage    | admin only `<PrivateRoute>` | Edit trip itinerary form                          |

## Components
**Pages**

- LoginPage
- SignupPage
- HomePage
- ProfilePage
- CreateTripPage
- TripDetailsPage
- EditTripPage

**Components**

- OptionCard
- Navbar

## Services

- **Auth Service**

  - `authService` :
    - `.login(user)`
    - `.signup(user)`
    - `.verify(user)`

<br>


# Server / Backend


## Models

**User model**

```javascript
{
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
	playerProfile: { type: Schema.Types.ObjectId, ref:'Player' },
  createdTournaments: [ { type: Schema.Types.ObjectId, ref:'Tournament' } ]
}
```



**Trip Model**

```javascript
 {
   name: { type: String, required: true },
   img: { type: String },
   players: [ { type: Schema.Types.ObjectId, ref:'Player' } ],
   games: [],
   rankings: []
 }
```

<br>


## API Endpoints (backend routes)

| HTTP Method | URL            | Request Body                  | Success status | Error Status | Description                                                  |
| ----------- | -------------- | ----------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| POST        | /auth/signup   | {name, email, role, password} | 201            | 500          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | /auth/login    | {username, password}          | 200            | 500          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| GET         | /auth/verify   | Saved token                   | 200            | 500          | Check if the user has the authorization token to access the app |
| POST        | /api/trips     | {trip form body}              | 201            | 500          | Add a trip itinerary                                         |
| PUT         | /api/trips/:id | {trip form body}              | 200            | 500          | Edit a specific trip itinerary                               |
| GET         | /api/trips/:id | {_id}                         | 200            | 500          | Show a specific trip itinerary                               |
| DELETE      | /api/trips/:id | {_id}                         | 200            | 500          | Delete a specific trip itinerary                             |



<br>


## Links

### Kanban

[Notion Page](https://www.notion.so/karinaglf/Project-Trip-Design-bd8f13112f29435fab6e9748cbeca779)

### Git

[Client repository Link](https://github.com/karinaglf/ironhack-project-trip-design-client)

[Server repository Link](https://github.com/karinaglf/ironhack-project-trip-design-server)

Deployed App Link

### Slides

Slides Link