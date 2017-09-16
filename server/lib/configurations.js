const TIMER_INTERVAL = 7000,
   MAX_SHOWN_SHOUTS = 100;

const serverConfig = {
   OPENSHIFT_PORT: process.env.OPENSHIFT_NODEJS_PORT || 8080,
   OPENSHIFT_IP: process.env.OPENSHIFT_NODEJS_IP || "0.0.0.0",
   MONGO_DB_URI: process.env.OPENSHIFT_MONGODB_DB_URL || "127.0.0.1",
};

console.log(process.env);

if (process.env.DATABASE_SERVICE_NAME) {
   const mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase();
   serverConfig.MONGO_DB_NAME = process.env[mongoServiceName + "_DATABASE"];
   serverConfig.MONGO_USER_NAME = process.env[mongoServiceName + "_USER"];
   serverConfig.MONGO_USER_PWD = process.env[mongoServiceName + "_PASSWORD"];
}
else {
   serverConfig.MONGO_DB_NAME = "sotDb";
   serverConfig.MONGO_USER_NAME = "shout-out-loud";
   serverConfig.MONGO_USER_PWD = "storage";
}

export {
   serverConfig,
   TIMER_INTERVAL,
   MAX_SHOWN_SHOUTS,
};