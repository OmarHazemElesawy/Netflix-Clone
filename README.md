# Fakeflix, The Netflix Clone MERN Stack Project

Links to the project:

1. [Fakeflix](https://streamflix-client.onrender.com) 
&
2. [Admin](https://streamflix-admin.onrender.com)

## Inroduction:

This is a Netflix Clone Project using MERN Stack. This project is made for learning purpose only.
This project is a full-stack clone of the popular streaming service Netflix, built using the MERN stack (MongoDB, Express, React, and Node.js). It consists of three parts:

1. Server-side backend. (Node.js, Express, MongoDB)
2. Frontend client-side (Netflix). (React.js)
3. Admin website responsible for CRUD operations on movies, series, movie lists, series lists, and users. (React.js)

With this project, users can browse and watch their favorite movies and series in a user-friendly interface that closely resembles the original Netflix platform. The frontend client-side is built using React.js and styled using Material-UI.

The server-side backend is built using Node.js and Express and is responsible for handling user authentication and serving data to both; client and admin. Data is stored in a MongoDB database and can be easily managed through the admin website.

The admin website provides a simple and intuitive interface for administrators to manage the content on the platform. They can easily add, edit or delete movies, series, movie lists, series lists, and users.

Overall, this project demonstrates a solid understanding of full-stack web development using the MERN stack and provides a fully functional platform for streaming movies and series.

## Built with:
- JavaScript: Frontend & Backend
- HTML5/CSS3: Frontend
- SCSS: Frontend
- React.js: Frontend
- Node.js: Backend
- Express: Backend
- MongoDB: Database
- Material-UI: Styling
- Axios: HTTP Client
- React Router DOM: Used for routing
- React Context API: Used for state management
- Firebase for storing images, trailers and videos
- Render: Used for deployment

## Features:

The project consists of three parts:

1. Server-side backend. (Node.js, Express, MongoDB):

- Fully functional REST API with endpoints for CRUD operations on movies, series, movie lists, series lists, and users.
  Fully equiped with error handling.
- Use of mongoose to model and interact with the MongoDB database.
- User authentication and authorization using JWT.
- Password hashing using Crypto.
- CRUD routes for movies and series.
- CRUD routes for movie lists and series lists.
- CRUD routes for users.
- CRUD routes for registering and signing in.

2. Frontend client-side (Netflix). (React.js):

- Fully functional frontend client-side built using React.js.
- styled using Scss and Material-UI.
- Use of React Hooks and React Context API for state management.
- Use of React Router DOM for routing.
- Use of Axios for HTTP requests.
- Use of Render for deployment.

3. Admin website. (React.js):

- Fully functional admin website built using React.js.
- styled using CSS modules and Material-UI.
- Use of React Hooks and React Context API for state management.
- Use of React Router DOM for routing.
- Use of Axios for HTTP requests.
- Use of firebase for storing images, trailers and videos.
- Use of Render for deployment.
- CRUD operations for movies and series.
- CRUD operations for movie lists and series lists.
- CRUD operations for users.

## Installation:

1. Server-side:
- Clone the repo and cd into server folder.
- Install all dependencies using `npm install`.
- create a .env file to add: 
    1. MongoDB connection string(DB_URL)
    2. JWT secret key (JWT_SECRET)
    3. Crypto secret key (CRYPTO_SECRET)
    4. port number of your choice (PORT)
- Run the server using `npm start`.
- The server will run on port 8000 by default.
- All the endpoints are available on `http://localhost:${PORT}/api/`

2. Frontend client-side:
- Clone the repo and cd into client folder.
- Install all dependencies using `npm install`.
- create a .env file to add: 
    1. add your server side base url (REACT_APP_BASE_URL) `http://localhost:${PORT}/api/`
    2. port number of your choice (PORT)
- Run the server using `npm start`.

3. Admin website:
- Clone the repo and cd into admin folder.
- Install all dependencies using `npm install`.
- create a .env file to add: 
    1. add your server side base url (REACT_APP_SERVER_URL) `http://localhost:${PORT}/api`
    3. add your firebase api key (REACT_APP_FIREBASE_API_KEY)
    4. add your firebase auth domain key (REACT_APP_FIREBASE_AUTH_DOMAIN)
    5. add your firebase project id (REACT_APP_FIREBASE_PROJECT_ID)
    6. add your firebase storage bucket id (REACT_APP_FIREBASE_STORAGE_BUCKET)
    7. add your firebase messaging sender id (REACT_APP_FIREBASE_MESSAGING_SENDER_ID)
    8. add your firebase app key (REACT_APP_FIREBASE_APP_ID)
    9. add your firebase measurement id (REACT_APP_FIREBASE_MEASUREMENT_ID)
    10. port number of your choice (PORT)
- Run the server using `npm start`.

## Screenshots:
1. Fakeflix:
    1. Register Page:
    ![Register Page](/client/assets/register.png)
    2. Login Page:
    ![Login Page](/client/assets/login.png)
    3. Home Page:
    ![Home Page 1](/client/assets/Home.png)
    ![Home Page 2](/client/assets/Home_2.png)
    ![Home Page 3](/client/assets/Home_3.png)
    4. Movies Page:
    ![Movies Page](/client/assets/Movies.png)
    5. Series Page:
    ![Series Page](/client/assets/Series.png)
    6. video player Page:
    ![Watch Page](/client/assets/video.png)
2. Admin website:
    2. Home Page:
    ![Home Page 1](/admin/assets/Homepage_1.png)
    ![Home Page 2](/admin/assets/Homepage_2.png)
    3. Movies list page:
    ![Movies list page](/admin/assets/Movies_list.png)
    4. movie page:
    ![movie page 1](/admin/assets/Movie_1.png)
    ![movie page 2](/admin/assets/Movie_2.png)
    5. New movie page:
    ![New movie page](/admin/assets/Add_movie.png)
    6. Series list page:
    ![Series list page 1](/admin/assets/Series_list_1.png)
    ![Series list page 2](/admin/assets/Series_list_2.png)
    7. Series page:
    ![Series page 1](/admin/assets/Series_2.png)
    ![Series page 2](/admin/assets/Series_2.png)
    8. New series page:
    ![New series page](/admin/assets/Add_movie.png)
    9. List page:
    ![Movies List page](/admin/assets/List_of_movies.png)
    ![Series List page](/admin/assets/List_of_series.png)
    10. New list page:
    ![New list page](/admin/assets/New_list.png)
    11. User list page:
    ![User list page](/admin/assets/user_list.png)
    12. User page:
    ![User page](/admin/assets/user.png)
    13. New user page:
    ![New user page](/admin/assets/new_user.png)






## 🤝 Support

Contributions, issues, and feature requests are welcome!

Give a ⭐️ if you like this project!