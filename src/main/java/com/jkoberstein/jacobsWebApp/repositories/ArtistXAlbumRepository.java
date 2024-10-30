package com.jkoberstein.jacobsWebApp.repositories;
import com.jkoberstein.jacobsWebApp.entities.ArtistXAlbum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(path="artistXAlbums")
public interface ArtistXAlbumRepository extends JpaRepository<ArtistXAlbum,Long> {
}