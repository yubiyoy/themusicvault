package com.jkoberstein.jacobsWebApp.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "artists_x_albums")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class ArtistXAlbum {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column (name="artist_id")
    private Long artistId;

    @Column(name = "album_id")
    private Long albumId;

}