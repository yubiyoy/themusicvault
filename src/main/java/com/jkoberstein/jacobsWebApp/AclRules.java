package com.jkoberstein.jacobsWebApp;

public abstract class AclRules {
    // White list for when a route is authorized
    public static String[][] whiteList = {
            // Method, route, user role (visitor = not logged in)
            // Currently we have two user roles, visitor and user,
            // nut an admin role would be easy to add - basically we
            // could whitelist all REST-routes for an admin
            {"POST","/users", "visitor"},
            {"GET", "/artists", "visitor"},
            {"GET", "/artists", "user"},
            {"POST", "/artists", "user"},
            {"PUT", "/artists", "user"},
            {"DELETE", "/artists", "user"},
            {"GET", "/users","visitor"},
            {"GET", "/users","user"}
    };
}
