const TIMER_INTERVAL = process.env.TIMER_INTERVAL || 7000,
   MAX_SHOWN_SHOUTS = process.env.MAX_SHOWN_SHOUTS || 100,
   GRAPHQL_JWT_SECRET = process.env.GRAPHQL_JWT_SECRET || "development",
   SIGNUP_JWT_SECRET = process.env.SIGNUP_JWT_SECRET || "signup";

const serverConfig = {
   PORT: process.env.PORT || 8000,
   MONGODB_URI: process.env.MONGODB_URI || "mongodb://shout-out-loud:storage@127.0.0.1:27017/solDb",
};

export {
   serverConfig,
   TIMER_INTERVAL,
   MAX_SHOWN_SHOUTS,
   GRAPHQL_JWT_SECRET,
   SIGNUP_JWT_SECRET
};