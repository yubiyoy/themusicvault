package com.jkoberstein.jacobsWebApp;
import com.google.gson.Gson;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Map;

public abstract class JsonResponse {

    // Make a json response
    public static void write(
        HttpServletResponse response,
        Object toJson
    ) throws Exception {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        String json = new Gson().toJson(toJson);
        if(json.contains("\"error\"")){ response.setStatus(405); }
        response.getWriter().write(json);
    }
}