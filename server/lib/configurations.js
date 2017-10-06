const TIMER_INTERVAL = process.env.TIMER_INTERVAL || 7000,
   MAX_SHOWN_SHOUTS = process.env.MAX_SHOWN_SHOUTS || 100,
   JWT_SECRET = process.env.JWT_SECRET || "development";

const serverConfig = {
   PORT: process.env.PORT || 8000,
   MONGODB_URI: process.env.MONGODB_URI || "mongodb://shout-out-loud:storage@127.0.0.1:27017/solDb",
};

export {
   serverConfig,
   TIMER_INTERVAL,
   MAX_SHOWN_SHOUTS,
   JWT_SECRET,
};