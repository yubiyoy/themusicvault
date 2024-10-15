package com.jkoberstein.jacobsWebApp;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.support.PropertiesLoaderUtils;
import org.springframework.jdbc.core.JdbcTemplate;
import java.io.IOException;
import java.util.Map;
import java.util.Properties;

public  class SQLQuery {

    private static JdbcTemplate jdbc;

    public SQLQuery(){
        if(jdbc != null){return;}
        // read db settings from application.properties
        // (should have been possible to @AutoWire them, but didn't work)
        Properties props;
        try {
            var resource = new ClassPathResource("/application.properties");
            props = PropertiesLoaderUtils.loadProperties(resource);
        }
        catch(IOException e){throw new RuntimeException(e);}
        var builder = DataSourceBuilder.create();
        var pre = "spring.datasource.";
        builder.driverClassName((String)props.get(pre+"driver-class-name"));
        builder.url((String)props.get(pre+"url"));
        builder.username((String)props.get(pre+"username"));
        builder.password((String)props.get(pre+"password"));
        // create new jdbc driver
        jdbc = new JdbcTemplate(builder.build());
    }

    public Object run(String sql, Object... params){
        try {
            if(sql.toUpperCase().trim().startsWith(("SELECT"))) {
                return jdbc.queryForList(sql, params);
            }
            else {
                return jdbc.update(sql,params);
            }
        }
        catch(Exception error){ return Map.of("error","SQL error"); }
    }

    public Map<String,Object> runOne(String sql, Object ...params){
        try {
            return jdbc.queryForMap(sql, params);
        }
        catch(Exception e){ return null; }
    }

}
