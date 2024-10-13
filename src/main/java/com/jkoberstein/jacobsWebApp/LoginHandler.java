package com.jkoberstein.jacobsWebApp;
import jakarta.servlet.http.HttpServletRequest;
import org.hibernate.annotations.processing.SQL;

import java.io.IOException;
import java.util.Map;

public abstract class LoginHandler {

    private static final SQLQuery sql = new SQLQuery();

    public static Object handle(
            String method, HttpServletRequest request)
            throws IOException {

        if(method.equals("POST")) {
            var reqBody = ReadReqBody.reader(request);
            if (!reqBody.containsKey("email") || !reqBody.containsKey(("password"))) {
                return Map.of("error", "Missing properties in request body.");
            }
            var result = sql.run(
                "SELECT * FROM users WHERE email = ? AND encrypted_password = ?",
                reqBody.get("email"), reqBody.get("password")
            );
            return result;
        }

        return Map.of("ok",true);
    }

}
