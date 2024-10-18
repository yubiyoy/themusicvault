package com.jkoberstein.jacobsWebApp;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.HandlerInterceptor;
import java.io.FileInputStream;
import java.io.InputStream;
import java.net.URISyntaxException;
import java.nio.file.Paths;
import java.util.Map;

@SuppressWarnings("ConstantConditions")
public class Interceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(
            @NonNull
            HttpServletRequest request,
            @NonNull
            HttpServletResponse response,
            @NonNull
            Object handler
    ) throws Exception {

        // Turn on/off logging
        var log = true;

        // Starts session handling
        var session = new Session(request,response);

        // Get the user role of the person making the request
        var loggedInUser = session.read();
        var userRole = (String)(loggedInUser == null
            ? "visitor" : loggedInUser.get("role"));

        // Some info we'll need frequently about the request (and response)
        var method = request.getMethod();
        var url = request.getRequestURI();
        var statusCode = response.getStatus();

        // Log requests to the REST-api
        if(log){
            System.out.println(
                " [" + method + "] " + url +
                " [statusCode: "+ statusCode + "] [userRole: " + userRole + "]"
            );
        }

        // Check all REST-routes against Acl rules
        if(!routeAllowedByAcl(method,url,userRole)){
            response.setStatus(405);
            JsonResponse.write(response,Map.of("error","Not allowed."));
            return false;
        }

        // If GET and 404 then return the index.html file contents (SPA-style)
        if(method.equals("GET") && statusCode == 404){
            response.setStatus(200);
            InputStream inputStream = new FileInputStream(getPathToIndexHtml());
            IOUtils.copy(inputStream, response.getOutputStream());
            response.flushBuffer();
            if(log) {
                System.out.println(" [GET] /index.html [statusCode: 200] (changed from 404 error)");
            }
            return false;
        }

        // Handle login
        if(url.equals("/api/login")){
            JsonResponse.write(response, LoginAndRegister.login(method,request,session));
            return false;
        }

        // Handle user registration and changes to user info
        if(url.equals("/api/register") && (method.equals("POST") || method.equals("PUT"))){
            JsonResponse.write(response, LoginAndRegister.register(request,session));
            return false;
        }

        return true;
    }

    private String getPathToIndexHtml() throws URISyntaxException {
        var res = getClass().getClassLoader().getResource("static");
        var file = Paths.get(res.toURI()).toFile();
        var absolutePath = file.getAbsolutePath();
        return Paths.get(absolutePath,"index.html") + "";
    }

    private boolean routeAllowedByAcl(String method, String url, String userRole){
        // Let all requests for static files through
        if(!url.startsWith("/api")){ return true; }
        // Check against all Acl rules
        url = url.replaceFirst("/api","");
        for (var rule : AclRules.whiteList){
            if(
                method.equals(rule[0]) &&
                userRole.equals(rule[2]) &&
                (url.equals(rule[1]) || url.startsWith(rule[1]+"/"))
            ){
                return true;
            }
        }
        return false;
    }

}