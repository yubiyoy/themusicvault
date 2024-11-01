#  Installation guide
1. Install the Maven dependencies. (If you use IntelliJ IDEA this will be done automatically for you.)
2. Change the properties for the db connection in **src/main/java/resources/application.properties**. If you are running a local instance of MySQL you will probably only have to change **spring.datasource.username** and 
   **spring.datasource.password**.
3. Provided that the db user has rights to create new databases the database **the_music_vault** will be created and seeded automatically when you start the application the first time. (Otherwise you can import it manually from *main/resources/db-dump/dbDump.sql*.)
4. Start the application by running **src/main/java/com/jkoberstein/jacobsWebApp/JacobsWebApp.class**.
5. Note that the application runs on: http://localhost:3001. (You can change the **server.port** in the **application.properties** if you want to.)

# Users
Logged in users have access to editing and deleting artists and albums. There is one user in the DB already: 
* **anna@gmail.com** with the password **12345678**. 
* You can easily register new users in the web application as well.
