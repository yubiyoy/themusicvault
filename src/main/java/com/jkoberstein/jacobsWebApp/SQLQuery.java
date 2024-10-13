package com.jkoberstein.jacobsWebApp;
import org.hibernate.service.spi.InjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;

@Service
public  class SQLQuery {

    private JdbcTemplate jdbc;

    public SQLQuery(){
        var builder = DataSourceBuilder.create();
        builder.driverClassName("com.mysql.cj.jdbc.Driver");
        builder.url("jdbc:mysql://localhost:3306/jacobWebApp");
        builder.username("root");
        builder.password("12345678");
        jdbc = new JdbcTemplate(builder.build());
    }

    public Object run(String sql, Object ...params){
        return jdbc.queryForList(sql, params);
    }

}
