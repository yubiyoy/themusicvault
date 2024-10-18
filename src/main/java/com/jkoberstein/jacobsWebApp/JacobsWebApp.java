package com.jkoberstein.jacobsWebApp;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.SpringVersion;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import java.io.IOException;
import java.util.Objects;
import java.util.Properties;

@SpringBootApplication
public class JacobsWebApp {

    private static final Properties springAppProps = getSpringAppProps();

    public static void main(String[] args) {

        // Create the Spring application
        var application = new SpringApplication(JacobsWebApp.class);

        // Get the Spring application props, extract the db name
        // + temporarily remove the db from the datasource.url
        var props = getSpringAppProps();
        var dataUrl =  ((String)props.get("spring.datasource.url"));
        var parts = dataUrl.split("/");
        var dataUrlNoDb = dataUrl.substring(0, dataUrl.lastIndexOf("/"));
        var dbName = parts[parts.length - 1];
        props.put("spring.datasource.url", dataUrlNoDb);

        // If the database does not exists, import the db dump
        var dbExists = dbExists(dbName, props);
        if(!dbExists){
            var extraProps = new Properties();
            extraProps.put("spring.sql.init.data-locations",
                "file:src/main/resources/db-dump/dbDump.sql");
            application.setDefaultProperties(extraProps);
        }

        // Add the db name back to the the datasource.url
        props.put("spring.datasource.url", dataUrlNoDb + "/" + dbName);

        // initialize SQLQuery to work with a specific db
        SQLQuery.initSettings(props);

        // Run the Spring application
        application.run(args);;

        // Display start up message
        var version = ((String)props.get("spring.application.name")).split("_")[1];
        System.out.println(AsciiLogo.logo
            .replace("port", (String)props.get("server.port"))
            .replace("0.0.0", version)
            .replace("1.1.1", Objects.requireNonNull(SpringVersion.getVersion())) +
            (dbExists ? "" : "\n  The database \""+dbName+"\" did not exist and has been created.") + "\n"
        );
    }

    // Check if the database exists
    private static boolean dbExists(String dbName, Properties props){
        // query MySQL to see if the db exists
        SQLQuery.initSettings(props);
        var sql = new SQLQuery();
        var query = "SELECT COUNT(*) AS count "+
            "FROM information_schema.tables WHERE TABLE_SCHEMA=?";
        var result = sql.runOne(query,dbName);
        var exists =  ((long)result.get("count")) != 0;
        // if the db does not exist then create it;
        if(!exists) {
            sql.run("CREATE DATABASE IF NOT EXISTS " + dbName);
        }
        // return if the db exists or not
        return exists;
    }

    // Read Spring application properties
    private static Properties getSpringAppProps(){
        Properties props;
        try {
            var resource = new ClassPathResource("/application.properties");
            props = PropertiesLoaderUtils.loadProperties(resource);
        }
        catch(IOException e){ throw new RuntimeException(e); }
        // return the props
        return props;
    }

}