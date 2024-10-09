package com.jkoberstein.jacobsWebApp.repository;
import com.jkoberstein.jacobsWebApp.entities.Artist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path="artists")
public interface ArtistRepository extends JpaRepository<Artist,Long> {
}