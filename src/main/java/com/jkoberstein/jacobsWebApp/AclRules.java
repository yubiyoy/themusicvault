package com.jkoberstein.jacobsWebApp;

public abstract class AclRules {

    // White list for when a route is authorized
    public static String[][] whiteList = {

            // Each rule consists of :
            // Method, route, and user role (visitor = not logged in)

            // Currently we have two user roles, visitor and user,
            // nut an admin role would be easy to add - basically we
            // could whitelist all REST-routes for an admin

            {"POST", "/register", "visitor"},
            {"PUT", "/register", "user"},
            {"POST", "/login", "visitor"},
            {"GET", "/login", "visitor"},
            {"GET", "/login", "user"},
            {"DELETE", "/login", "user"},
            {"POST", "/artists", "user"},
            {"GET", "/artists", "visitor"},
            {"GET", "/artists", "user"},
            {"PUT", "/artists", "user"},
            {"DELETE", "/artists", "user"},
            {"GET", "/artistsWithoutImages", "visitor"},
            {"GET", "/artistsWithoutImages", "user"},
            {"POST", "/albums", "user"},
            {"GET", "/albums", "visitor"},
            {"GET", "/albums", "user"},
            {"PUT", "/albums", "user"},
            {"DELETE", "/albums", "user"},
            {"GET", "/albumsWithoutImages", "visitor"},
            {"GET", "/albumsWithoutImages", "user"},
            {"GET", "/artistXAlbums", "visitor"},
            {"GET", "/artistXAlbums", "user"},
            {"POST", "/artistXAlbums", "user"},
            {"DELETE", "/artistXAlbums", "user"}
    };

}