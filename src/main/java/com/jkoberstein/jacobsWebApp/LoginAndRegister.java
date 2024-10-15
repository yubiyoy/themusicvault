package com.jkoberstein.jacobsWebApp;
import at.favre.lib.crypto.bcrypt.BCrypt;
import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;

public abstract class LoginAndRegister {

    private static final SQLQuery sql = new SQLQuery();

    public static Object register(
            HttpServletRequest request, Session session)
            throws IOException {

        var loggedInUser = session.read();
        var reqBody = ReadRequestBody.reader(request);
        if(reqBody.containsKey("error")){return reqBody;}

        // return error if password is too short (or missing)
        if(!reqBody.containsKey("password") || ((String)reqBody.get("password")).length() < 8){
            return Map.of("error","Password too short (min 8 characters)");
        }

        // create or update the user
        var update = loggedInUser != null;
        var changePassword = !(update && reqBody.get("password").equals("_DO_NOT_CHANGE"));
        var params = new ArrayList<Object>(Arrays.asList(
            reqBody.get("email"),reqBody.get("firstName"),reqBody.get("lastName")
        ));
        var query = !update ?
            "INSERT INTO users (email, first_name, last_name, encrypted_password) VALUES (?,?,?,?)" :
            "UPDATE users SET email = ?, first_name = ?, last_name = ?";
        if(changePassword){
            query += update ? ", encrypted_password = ?" : "";
            // encrypt password
            var encryptedPassword = BCrypt.withDefaults()
                .hashToString(12, ((String)reqBody.get("password")).toCharArray());
            params.add(encryptedPassword);
        }
        if(update){
            query += " WHERE email = ?";
            params.add(loggedInUser.get("email"));
        }
        var result = sql.run(query, params.toArray());

        // return the error if the creation/update failed
        if(result instanceof Map && ((Map<?, ?>)result).containsKey("error")){
            return result;
        }
        // login (which sets/updates the session)
        return login("POST", request, session, reqBody);
    }

    public static Object login(
            String method, HttpServletRequest request,
            Session session, Map<?,?>... reqBodies)
            throws IOException {

        switch (method) {
            case "POST" -> {
                var calledFromRegister = reqBodies.length > 0;
                var reqBody = calledFromRegister
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

                // check that the password is correct
                if(!calledFromRegister && !BCrypt.verifyer().verify(
                    ((String)reqBody.get("password")).toCharArray(),
                    ((String)foundUser.get("encrypted_password"))
                ).verified){
                    return Map.of("error", "Wrong credentials");
                }

                // remove id and encrypted_password from foundUser
                // store it in our session and return it
                ReadRequestBody.removeProps(foundUser, "id", "encrypted_password");
                session.write(foundUser);
                return foundUser;
            }
            case "GET" -> {
                return session.read();
            }
            case "DELETE" -> {
                session.write(null);
                return Map.of("status", "Logged out");
            }
        }

        return Map.of("error","Wrong method used");
    }

}