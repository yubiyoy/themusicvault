package com.jkoberstein.jacobsWebApp;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Cookie;
import java.lang.reflect.Type;
import java.util.Arrays;
import java.util.Map;

public class Session {

    String cookieValue;
    private static final SQLQuery sql = new SQLQuery("jacobWebApp");

    public Session(HttpServletRequest request, HttpServletResponse response){
        cookieValue = getOrSetCookie(request, response);
    }

    public void write(Object value) {
       sql.run("DELETE FROM sessions WHERE session_id = ?", cookieValue);
       if(value!=null){
           String json = new Gson().toJson(value);
           sql.run("INSERT INTO sessions (session_id, value) VALUES(?, ?)",cookieValue,json);
       }
    }

    public Map<String,Object> read(){
        var result = sql.runOne("SELECT value FROM sessions WHERE session_id = ?", cookieValue);
        if(result == null){ return null; }
        Type type = new TypeToken<Map<String,Object>>(){}.getType();
        return new Gson().fromJson((String)result.get("value"),type);
    }

    private String getOrSetCookie(
            HttpServletRequest request,
            HttpServletResponse response
    ){
        // get the value of the cookie jCookie
        String cookieValue = null;
        if(request.getCookies() != null) {
            cookieValue = Arrays.stream(request.getCookies())
                .filter(c -> c.getName().equals("jCookie"))
                .findFirst()
                .map(Cookie::getValue)
                .orElse(null);
        }

        // set the cookie jCookie if is not set
        if(cookieValue == null){
            cookieValue = ("x"+Math.random()+"x"+Math.random()+"x"+Math.random())
                .replace("x0.","");
            var cookie =new Cookie("jCookie", cookieValue);
            cookie.setPath("/");
            response.addCookie(cookie);
        }

        return cookieValue;
    }

}