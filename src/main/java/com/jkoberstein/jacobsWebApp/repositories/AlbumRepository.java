package com.jkoberstein.jacobsWebApp.repositories;
import com.jkoberstein.jacobsWebApp.entities.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path="albums")
public interface AlbumRepository extends JpaRepository<Album,Long> {
}