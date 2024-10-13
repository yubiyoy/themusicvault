package com.jkoberstein.jacobsWebApp;

import jakarta.persistence.EntityManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import jakarta.persistence.metamodel.Type;
import org.springframework.web.servlet.handler.MappedInterceptor;


@Configuration
public class RestConfiguration implements RepositoryRestConfigurer {

    @Autowired
    private EntityManager entityManager;

    // These configuration settings are needed
    // in order to make Spring serialize id fields
    @Override
    public void configureRepositoryRestConfiguration(
            RepositoryRestConfiguration config, CorsRegistry cors) {
        Class[] classes = entityManager.getMetamodel()
                .getEntities().stream().map(Type::getJavaType).toArray(Class[]::new);
        config.exposeIdsFor(classes);
    }

    // This connects our interceptor to all routes
    @Bean
    public MappedInterceptor someMethodName() {
        return new MappedInterceptor(
                // map to all repositories by using null
                null,
                new Interceptor()
        );
    }
}