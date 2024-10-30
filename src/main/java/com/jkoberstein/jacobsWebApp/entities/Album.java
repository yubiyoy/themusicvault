package com.jkoberstein.jacobsWebApp.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "albums")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Album {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "year")
    private int year;

    @Column(name = "description", columnDefinition="TEXT")
    private String description;

    @Column(name = "spotify_link")
    private String spotifyLink;

    @Column(name = "base64image", columnDefinition="LONGTEXT")
    private String base64image;

}