package com.jkoberstein.jacobsWebApp;

import jakarta.servlet.ServletOutputStream;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

public class Interceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(
            HttpServletRequest request,
            HttpServletResponse response,
            Object handler
    ) throws Exception {

        String method = request.getMethod();
        String url = request.getRequestURI();

        // Log requests to the REST-api
        System.out.println( " [" + method + "] " + url);

        // Let all static (non REST-api request through)
        if(!url.startsWith("/api")){
            return true;
        }

        return true;

        // response.getWriter().write("{\"error\":\"Not allowed\"}");
        // response.setStatus(405);
        // return false;

    }

    public void postHandle(
            HttpServletRequest request,
            HttpServletResponse response,
            Object handler,
            ModelAndView modelAndView
    ) throws Exception {

        String method = request.getMethod();
        String url = request.getRequestURI();

        if(method.equals("GET") && url.equals("/error")){
            response.setStatus(200);
        }

    }

}