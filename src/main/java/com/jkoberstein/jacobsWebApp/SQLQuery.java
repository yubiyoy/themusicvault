package com.jkoberstein.jacobsWebApp;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.jdbc.core.JdbcTemplate;
import java.util.Map;
import java.util.Properties;

public  class SQLQuery {

    public static Properties springAppProps;
    public static String dbName = "";
    public static JdbcTemplate jdbc;

    public SQLQuery(){
        var props = springAppProps;
        var builder = DataSourceBuilder.create();
        var pre = "spring.datasource.";
        builder.driverClassName((String)props.get(pre+"driver-class-name"));
        builder.url((String)props.get(pre+"url")+(dbName.isEmpty() ? "" : "/" + dbName));
        builder.username((String)props.get(pre+"username"));
        builder.password((String)props.get(pre+"password"));
        // create the jdbc driver (only once)
        jdbc = jdbc != null ? jdbc : new JdbcTemplate(builder.build());
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
