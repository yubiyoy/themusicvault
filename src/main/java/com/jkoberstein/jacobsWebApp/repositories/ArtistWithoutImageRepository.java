package com.jkoberstein.jacobsWebApp.repositories;
import com.jkoberstein.jacobsWebApp.entities.ArtistWithoutImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path="artistsWithoutImages")
public interface ArtistWithoutImageRepository extends JpaRepository<ArtistWithoutImage,Long> {
}