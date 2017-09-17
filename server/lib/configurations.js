const TIMER_INTERVAL = 7000,
   MAX_SHOWN_SHOUTS = 100;

const serverConfig = {
   OPENSHIFT_PORT: process.env.APP_SERVICE_PORT_WEB || 8080,
   OPENSHIFT_IP: process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0",
   MONGO_DB_URI: process.env.MONGODB_SERVICE_HOST || "127.0.0.1",
   MONGODB_SERVICE_PORT: process.env.MONGODB_SERVICE_PORT || "27017",
   MONGO_DB_NAME: process.env.MONGODB_DATABASE || "sotDb",
   MONGO_USER_NAME: process.env.MONGODB_USER || "shout-out-loud",
   MONGO_USER_PWD: process.env.MONGODB_PASSWORD || "storage",
};

export {
   serverConfig,
   TIMER_INTERVAL,
   MAX_SHOWN_SHOUTS,
};