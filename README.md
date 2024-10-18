#  Install
1. Install the Maven.dependencies. If you use IntelliJ IDEA this will be done automatically for you.
2. Change the properties for the db connection in **/src/main/java/resources/application.properties**. If you are running a local instance of MySQL you will probably only have to change **spring.datasource.username** and 
   **spring.datasource.password**.
3. Provided that the db user has rights to create new databases they database **jacobWebApp** will be created and seeded automatically when you start the application the first time.
4. Start the application by running **/src/main/java/com/jkoberstein/jacobsWebApp/JacobsWebApp.class**.

# Important
See the README.md file in src/resources/static for more documentation!
