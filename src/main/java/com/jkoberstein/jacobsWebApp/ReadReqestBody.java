package com.jkoberstein.jacobsWebApp;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Map;

public abstract class ReadReqestBody {

    public static Map reader(HttpServletRequest request)  {
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

}
