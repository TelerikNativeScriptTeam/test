var application = require("application");
application.mainModule = "views/splash/splash";
application.cssFile = "./app.css";

global.BS_API_KEY = "$EVERLIVE_API_KEY$";
global.BS_SCHEME = "http";
global.BS_URL = "";
global.TOKEN_DATA_KEY = "authenticationToken";
global.USER_ID = "userId";
global.USERNAME = "Anonymous";
global.EVERLIVE = null;
global.MONITOR = null;
application.start();
