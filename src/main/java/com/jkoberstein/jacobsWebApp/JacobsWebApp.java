package com.jkoberstein.jacobsWebApp;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import java.io.IOException;
import java.util.Properties;

@SpringBootApplication
public class JacobsWebApp {

    private static final Properties springAppProps = getSpringAppProps();

    public static void main(String[] args) {

        // Create the Spring application
        var application = new SpringApplication(JacobsWebApp.class);

        // Get the Spring application properties
        var props = getSpringAppProps();

        // If the database does not exist import our database dump,
        // otherwise just import a file that selects the correct db
        var sqlFiles = !dbExists() ?
            "file:src/main/resources/db-dump/dbDump.sql":
            "file:src/main/resources/db-dump/useDb.sql";
        Properties properties = new Properties();
        properties.put("spring.sql.init.data-locations",sqlFiles);
        application.setDefaultProperties(properties);

        // Run the Spring application
        application.run(args);;
        System.out.println(AsciiLogo.logo
            .replace("port", (String)props.get("server.port")));
    }

    // Check if the database exists
    private static boolean dbExists(){
        var dbName = "jacobWebApp";
        // query MySQL to see if the db exists
        var sql = new SQLQuery();
        var query = "SELECT COUNT(*) AS count "+
            "FROM information_schema.tables WHERE TABLE_SCHEMA=?";
        var result = sql.runOne(query,dbName);
        // initialize SQLQuery to work with a specific db
        SQLQuery.dbName = dbName;
        SQLQuery.jdbc = null;
        // return if the db exists or not
        return ((long)result.get("count")) != 0;
    }

    // Read Spring application properties
    private static Properties getSpringAppProps(){
        Properties props;
        try {
            var resource = new ClassPathResource("/application.properties");
            props = PropertiesLoaderUtils.loadProperties(resource);
        }
        catch(IOException e){ throw new RuntimeException(e); }
        // transfer props to the SQLQuery class
        SQLQuery.springAppProps = props;
        // return the props
        return props;
    }

}