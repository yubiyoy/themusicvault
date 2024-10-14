package com.jkoberstein.jacobsWebApp;
import at.favre.lib.crypto.bcrypt.BCrypt;
import jakarta.servlet.http.HttpServletRequest;

import java.io.IOException;
import java.util.Map;

public abstract class LoginAndRegister {

    private static final SQLQuery sql = new SQLQuery();

    @SuppressWarnings("unchecked")
    public static Object register(
            HttpServletRequest request, Session session)
            throws IOException {

        var reqBody = ReadRequestBody.reader(request);

        // return error if password is to short (or missing)
        if(!reqBody.containsKey("password") || ((String)reqBody.get("password")).length() < 8){
            return Map.of("error","Password to short (min 8 characters)");
        }

        // encrypt password
        reqBody.put("password", BCrypt.withDefaults()
            .hashToString(12, ((String)reqBody.get("password")).toCharArray()));

        // create the user
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
                var reqBody = reqBodies.length > 0
                        ? reqBodies[0] :  ReadRequestBody.reader(request);
                if (reqBody.containsKey("error")) {
                    return reqBody;
                }
                if (!reqBody.containsKey("email") || !reqBody.containsKey(("password"))) {
                    return Map.of("error", "Missing properties in request body.");
                }
                var foundUser = sql.runOne(
                    "SELECT * FROM users WHERE email = ?",
                    reqBody.get("email")
                );

                // if the user is not found
                if(foundUser == null){
                    return Map.of("error", "No such user");
                }

                // check that password is correct
                if(!BCrypt.verifyer().verify(
                    ((String)reqBody.get("password")).toCharArray(),
                    ((String)foundUser.get("encrypted_password"))
                ).verified){
                    return Map.of("error", "Wrong credentials");
                }

                // remove id and encrypted_password from foundUser
                ReadRequestBody.removeProps(foundUser, "id","encrypted_password");

                return foundUser;
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
