package com.jkoberstein.jacobsWebApp.repositories;
import com.jkoberstein.jacobsWebApp.entities.AlbumWithoutImage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path="albumsWithoutImages")
public interface AlbumWithoutImageRepository extends JpaRepository<AlbumWithoutImage,Long> {
}