# About my web application:<br>Classic Artists

### Documentation
[I have made some documentation of the application](/pdfs/flow-spring-app.pdf) (schematics of the database, the backend, REST-routes and the frontend).

I also documented my workflow and collected links to articles I found and read to help me understand different aspects of Spring, as well as frontend development.

### My workflow
This is the way I have worked with the project:
* I work in one GitHub-hosted git repository with both the Spring-based backend and the Vanilla JS based frontend. The frontend files are in src/main/resources/static and I have configured Spring to serve the REST-api on the basePath /api.
* For my **backend** I use **Spring** (configured via **Spring Boot**) and a combination of **Spring Data Rest** (to create basic REST-api routes for different entities without the need for controllers and services) and a **Spring interceptor** that let me write my own logic for user authentication, user sessions and special routes (like login and registration).
* I use a local instance of **MySQL** and my database name is **jacobWebApp**. I save a database dump of the database as an sql file in the repo, and have written backend logic that automatically creates and seeds the database from the database dump if the database is missing, when you start the backend.
* For my **frontend** I use vanilla JS and try to write in a modern style with the code divided into different ES-modules. Application specific modules are found in **src/main/resources/static/js** and smaller, more generic helpers/utilities in **src/main/resources/static/js/utils**. The frontend application is built as an **SPA** (Single Page Application) which means the frontend controls all routing outside the REST-api and does not make hard page reloads when navigating between pages/views.
* I use GitHub Desktop to commit my changes to the git repository.
* I open the whole repository in IntelliJ Idea.
* I open the frontend folder (src/main/resources/static) with "Open folder" in VSC.
* I have installed the VSC extension **Thunder** Client in VSC - and use it to test my REST routes.
* I have installed the VSC extension **leet-html** in VSC and thus template literal strings containing HTML in my JS code gets highlighted nicely.
* I use the CSS framework Bootstrap - which saves how much own CSS I have to write and helps me make the frontend application responsive.


### Articles I found and read

#### Spring Data REST: Building REST routes without Controllers & Services
* https://medium.com/@mertkagan/spring-data-rest-say-goodbye-to-controller-and-service-1acb6c7437f1
* https://www.baeldung.com/spring-data-rest-intro
* https://docs.spring.io/spring-data/rest/docs/4.0.6/reference/html

#### Interceptors: Modifying and disallowing route responses
* https://www.baeldung.com/spring-mvc-handlerinterceptor
* https://stackoverflow.com/questions/46953039/spring-interceptor-not-working-in-spring-data-rest-urls - for adding interceptors that work with Spring Data Rest (see the answer from *Carlitos Way*).

#### Changing the base-path of REST-api to /api
https://stackoverflow.com/questions/32927937/how-to-set-base-url-for-rest-in-spring-boot

#### Serving static resources (frontend) with Spring
https://www.baeldung.com/spring-mvc-static-resources

#### Show updates to static files without having to restart Spring
https://stackoverflow.com/questions/43693393/reload-static-content-spring-boot-application

#### Serialize id field of entity
https://www.baeldung.com/spring-data-rest-serialize-entity-id

#### Fetching from a REST-api on frontend
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

#### The Bootstrap documentation, started with CSS with Bootstrap
https://getbootstrap.com/docs/5.3/getting-started/introduction

#### Event delegation in JavaScript
https://sebastiandedeyne.com/javascript-framework-diet-event-delegation

#### Applying frontend routing using the history push state api
https://css-tricks.com/using-the-html5-history-api

#### Documentation about the FileReader class in JavaScript
https://developer.mozilla.org/en-US/docs/Web/API/FileReader

(I use the FileReader to convert images to base64 - preparing them for upload.)

#### Google Webfonts Helper: Self hosting of Google fonts
https://gwfh.mranftl.com/fonts

### Tool for base64-encoding images
Until I got the image upload in place I used this online tool for conversion to base64 of jpgs:
https://www.base64-image.de

### Data collected from
* Text and images from https://www.discogs.com and https://prezi.com are used in the DB.

### Idea for albums
Save an Spotify embed link in the database and use code like the one shown here:
* https://www.spotembed.com to embed a player.