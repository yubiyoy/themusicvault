package com.jkoberstein.jacobsWebApp;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.Cookie;
import java.util.Arrays;

public class Session {

    String cookieValue;

    public Session(HttpServletRequest request, HttpServletResponse response){
        cookieValue = getOrSetCookie(request, response);
    }

    public boolean write(String value) {
        return true;
    }

    public String SessionRead(){
        return "";
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
