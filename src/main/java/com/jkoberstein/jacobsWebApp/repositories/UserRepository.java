package com.jkoberstein.jacobsWebApp.repositories;
import com.jkoberstein.jacobsWebApp.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path="users")
    public interface UserRepository extends JpaRepository<User,Long> {
}