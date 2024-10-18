package com.jkoberstein.jacobsWebApp;

public class AsciiLogo {
    public static final String logo = String.join("\n","\n"+
            "   (_)               |‾|     *‾*        /‾/ |‾|      /*                ",
            "    _  __ _  ___ ___ | |__  __* *  /*  / /__| |__   /  *   _ __  _ __  ",
            "   | |/ _` |/ __/ _ *| '_ */ __* */  */ / _ * '_ * / /* * | '_ *| '_ * ",
            "   | | (_| | (_| (_) | |_) *__ **  /*  /  __/ |_) / ____ *| |_) | |_) |",
            "   | |*__,_|*___*___/|_.__/|___/ */  */ *___|_.__/_/    *_* .__/| .__/ ",
            "  _/ |                                                    | |   | |    ",
            " |__/           Running on http://localhost:port          |_|   |_|    ",
            "            Version: 0.0.0   Spring version: 1.1.1                      "
    ).replace("*","\\") + "\n";
}
