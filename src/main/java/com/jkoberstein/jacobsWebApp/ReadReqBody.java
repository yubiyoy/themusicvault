package com.jkoberstein.jacobsWebApp;
import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Map;

public abstract class ReadReqBody {

    public static Map reader(HttpServletRequest request)  {
        try {
            var sb = new StringBuilder();
            var reader = request.getReader();
            String line;
            while ((line = reader.readLine()) != null) {
                sb.append("\n");
                sb.append(line);
            }
            String requestBody = sb.toString();
            Type type = new TypeToken<Map<String,Object>>(){}.getType();
            return new Gson().fromJson(requestBody, type);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
