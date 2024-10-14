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

        // Session handling
        var session = new Session(request,response);

        // Some info about the request (and response)
        var method = request.getMethod();
        var url = request.getRequestURI();
        var statusCode = response.getStatus();

        // Log requests to the REST-api
        if(log){
            System.out.println( " [" + method + "] " + url + " [statusCode: "+ statusCode + "]");
        }

        // If 404 then return the index.html file (SPA-style)
        if(method.equals("GET") && statusCode == 404){
            response.setStatus(200);
            InputStream inputStream = new FileInputStream(getPathToIndexHtml());
            IOUtils.copy(inputStream, response.getOutputStream());
            response.flushBuffer();
            if(log) {
                System.out.println(" [GET] /index.html statusCode: 200 (changed from 404 error)");
            }
            return false;
        }

        // Let all requests for static files through
        if(!url.startsWith("/api")){
            return true;
        }

        // Handle login
        if(url.equals("/api/login")){
            JsonResponse.write(response,LoginHandler.handle(method,request,session));
            return false;
        }

        // Check all REST-routes against Acl rules
        var userRole = "user";
        if(!routeAllowedByAcl(
            method,
            url.replaceFirst("/api",""),
            userRole
        )){
            response.setStatus(405);
            JsonResponse.write(response,Map.of("error","Not allowed."));
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
        for (var rule : AclRules.whiteList){
            if(method.equals(rule[0]) && url.startsWith(rule[1]) && userRole.equals(rule[2])){
                return true;
            }
        }
        return false;
    }

}