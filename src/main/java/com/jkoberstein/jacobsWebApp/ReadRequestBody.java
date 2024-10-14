package com.jkoberstein.jacobsWebApp;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Map;

public abstract class ReadRequestBody {

    // Read the request body of a request
    public static Map<String,Object> reader(HttpServletRequest request)  {
        var sb = new StringBuilder();
        try {
            var reader = request.getReader();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append("\n");
                sb.append(line);
            }
        }
        catch (IOException e) { throw new RuntimeException(e); }
        String requestBody = sb.toString();
        Type type = new TypeToken<Map<String,Object>>(){}.getType();
        Map<String,Object> result;
        try {
            return new Gson().fromJson(requestBody, type);
        }
        catch(Exception e) {
            return Map.of("error","Malformed JSON");
        }
    }

    // Remove properties from a read request body
    public static void removeProps(Map<String,Object> reqBody, String... props){
        for(var prop : props){
            reqBody.remove(prop);
        }
    }

}
