import { SMTPServer } from 'smtp-server';

/**
 * @public
 * @function initializeDebugSmtpServer
 * @description initializes the debug smtp server
  * @param {object} serverConfig - configuration of server
* @returns {Promise} of initialization
 */
const initializeDebugSmtpServer = (serverConfig) => new Promise((resolve, reject) => {
   const server = new SMTPServer({
      allowInsecureAuth: true,
      disabledCommands: ["STARTTLS"],
      onData(stream, session, callback) {
         stream.pipe(process.stdout);
         stream.on('end', callback);
      },
      onAuth(auth, session, callback) {
         return callback(null, { user: "debug" });
      },
   });
   server.listen(serverConfig.SMTP.PORT, () => {
      console.log(`Debug Smtp Server is now running on ${serverConfig.SMTP.IP}:${serverConfig.SMTP.PORT}`); // eslint-disable-line no-console
      resolve();
   });
});

export default initializeDebugSmtpServer;