package com.jkoberstein.jacobsWebApp;
import java.io.IOException;
import java.io.OutputStream;
import java.io.PrintStream;

public class SystemOutOnOff {

    private static final PrintStream orgOut = System.out;

    // Turn off System.out
    public static void off(){
        System.setOut(new PrintStream(new OutputStream() {
            @Override
            public void write(int arg0) throws IOException {}
        }));
    }

    // Turn on System.out
    public static void on(){
        System.setOut(orgOut);
    }

    // Print during off
    public static void print(String str){
        on();
        System.out.print(str);
        off();
    }

}
