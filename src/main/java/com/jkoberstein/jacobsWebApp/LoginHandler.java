package com.jkoberstein.jacobsWebApp;
import jakarta.servlet.http.HttpServletRequest;
import org.hibernate.annotations.processing.SQL;

import java.io.IOException;
import java.util.Map;

public abstract class LoginHandler {

    private static final SQLQuery sql = new SQLQuery();

    public static Object handle(
            String method, HttpServletRequest request, Session session)
            throws IOException {

        if(method.equals("POST")) {
            var reqBody = ReadReqBody.reader(request);
            if (!reqBody.containsKey("email") || !reqBody.containsKey(("password"))) {
                return Map.of("error", "Missing properties in request body.");
            }
            var result = sql.runOne(
                "SELECT email, first_name AS firstName, last_name AS lastName, "+
                        "role FROM users WHERE email = ? AND encrypted_password = ?",
                reqBody.get("email"), reqBody.get("password")
            );
            session.write(result);
            return result == null ?
                Map.of("error","Wrong credentials") : result;
        }

        if(method.equals("GET")){
            return session.read() == null ?
                Map.of("error","Not logged in") : session.read();
        }

        if(method.equals("DELETE")){
            session.write(null);
            return Map.of("status","Logged out");
        }

        return Map.of("ok",true);
    }

}
