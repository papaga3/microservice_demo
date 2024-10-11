# Blog microservices

## Project summary
This project is used to learn about microservices and how different services communicate with eachother.
The project is a simple blog, the user can create new blog posts and comments on the posts.

## Dependencies

+ This application also has a React Frontend. at: https://github.com/papaga3/microservice_demo_frontend

## Content
### 1. Post service:
+   Folder: service_posts
+   Description: Create and display posts
+   Port: 4000
+   API list: 
    -   `GET /posts`: return all posts
    -   `POST /posts`: add one new post
    -   `POST /events`: receive events from the event bus

### 2. Comment service:
+   Folder: service_comments
+   Description: Create and display comments
+   Port: 4100
+   API list: 
    -   `GET /posts/:id/comments`: return all comments of post with `id`
    -   `POST /posts/:id/comments`: add one new comment to post with `id`
    -   `POST /events`: receive events from the event bus

### 3. Query service:
+   Folder: service_query
+   Description: For querying the data. This is the main service that the frontend used to get data.
+   Port: 4200
+   API list: 
    -   `GET /posts`: return all posts and comments
    -   `POST /events`: receive events from the event bus

### 4. Event Bus
+   Folder: service_eventBus
+   Description: Will broadcast events emitted by other services.
+   Port: 4500
+   API list:
    -  `POST /events`: receive events from other services and broadcast them.


## How it works
To be added


