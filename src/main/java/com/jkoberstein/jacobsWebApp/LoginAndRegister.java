package com.jkoberstein.jacobsWebApp;
import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;
import java.util.Map;

public abstract class LoginAndRegister {

    private static final SQLQuery sql = new SQLQuery();

    public static Object register(
            HttpServletRequest request, Session session)
            throws IOException {

        var reqBody = ReadReqestBody.reader(request);
        var insertResult =sql.run(
            "INSERT INTO users (email, first_name, last_name, encrypted_password) " +
                    "VALUES (?, ?, ?, ?)",
            reqBody.get("email"),
            reqBody.get("firstName"),
            reqBody.get("lastName"),
            reqBody.get("password")
        );
        // return error if failed
        if(insertResult instanceof Map && ((Map<?, ?>)insertResult).containsKey("error")){
            return insertResult;
        }
        // otherwise login (which returns the logged in user)
        return login("POST", request, session, reqBody);
    }

    public static Object login(
            String method, HttpServletRequest request,
            Session session, Map<?,?>... reqBodies)
            throws IOException {

        switch (method) {
            case "POST" -> {
                var reqBody = reqBodies.length > 0 ? reqBodies[0] :  ReadReqestBody.reader(request);
                if (reqBody.containsKey("error")) {
                    return reqBody;
                }
                if (!reqBody.containsKey("email") || !reqBody.containsKey(("password"))) {
                    return Map.of("error", "Missing properties in request body.");
                }
                var result = sql.runOne(
                    "SELECT email, first_name AS firstName, last_name AS lastName, " +
                            "role FROM users WHERE email = ? AND encrypted_password = ?",
                    reqBody.get("email"), reqBody.get("password")
                );
                session.write(result);
                return result == null ?
                    Map.of("error", "Wrong credentials") : result;
            }
            case "GET" -> {
                return session.read() == null ?
                    Map.of("error", "Not logged in") : session.read();
            }
            case "DELETE" -> {
                session.write(null);
                return Map.of("status", "Logged out");
            }
        }

        return Map.of("error","Wrong method used");
    }

}
