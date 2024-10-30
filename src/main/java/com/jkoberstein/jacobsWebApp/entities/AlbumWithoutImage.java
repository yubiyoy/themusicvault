package com.jkoberstein.jacobsWebApp.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "albums_without_images")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class AlbumWithoutImage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description", columnDefinition="TEXT")
    private String description;

    @Column(name = "spotify_link")
    private String spotifyLink;

}