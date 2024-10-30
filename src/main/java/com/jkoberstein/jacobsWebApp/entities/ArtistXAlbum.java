package com.jkoberstein.jacobsWebApp.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "artists_x_albums_view")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ArtistXAlbum {

    @Id
    @Column (name="id")
    private String id;

    @Column (name="artist_id")
    private Long artistId;

    @Column(name = "album_id")
    private Long albumId;

}