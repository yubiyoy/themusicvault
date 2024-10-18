package com.jkoberstein.jacobsWebApp;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import java.util.Properties;

@SpringBootApplication
public class JacobsWebApp {

    public static void main(String[] args) {

        // Create the Spring application
        SpringApplication application = new SpringApplication(JacobsWebApp.class);

        // If the database does not exist import our database dump,
        // otherwise just import a file that selects the correct db
        var sqlFiles = !dbExists() ?
            "file:src/main/resources/db-dump/dbDump.sql":
            "file:src/main/resources/db-dump/useDb.sql";
        Properties properties = new Properties();
        properties.put("spring.sql.init.data-locations",sqlFiles);
        application.setDefaultProperties(properties);

        // Run the Spring application
        application.run(args);
    }

    // Check if the database exists
    private static boolean dbExists(){
        var dbName = "jacobWebApp";
        var sql = new SQLQuery("");
        var result = sql.runOne(
                "SELECT COUNT(*) AS count FROM information_schema.tables WHERE TABLE_SCHEMA=?",
                dbName
        );
        return ((long)result.get("count")) != 0;
    }

}
