import nodemailer from 'nodemailer';
import sendgridTransport from 'nodemailer-sendgrid-transport';

import initializeDebugSmtpServer from './initializeDebugSmtpServer';
import { InternalServerError } from './../errorsApi';

/**
 * @private
 * @member _smtpTransporter
 * @description smtp server transporter
 */
let _smtpTransporter;

/**
 * @private
 * @function _setupSmtpTransporter
 * @description sets up the smtp transporter
 * @param {object} serverConfig - configuration of server
 * @returns {Promise} of setup
 */
const _setupSmtpTransporter = (serverConfig) => {
   if (serverConfig.isInProductionMode) {
      const transport = sendgridTransport({
         auth: {
            api_key: serverConfig.SMTP.API_KEY,
         }
      });

      _smtpTransporter = nodemailer.createTransport(transport);
   }
   else {
      _smtpTransporter = nodemailer.createTransport({
         service: "SMTP",
         host: serverConfig.SMTP.IP,
         port: serverConfig.SMTP.PORT,
         secure: false,
         auth: {
            user: serverConfig.SMTP.USER,
            pass: serverConfig.SMTP.PASSWORD,
         }
      });
   }
};

/**
 * @public
 * @function initializeEMailTransport
 * @description initializes the email transport
 * @param {object} serverConfig - configuration of server
 * @returns {Promise} of initialization
 */
const initializeEMailTransport = (serverConfig) => new Promise((resolve, reject) => {
   _setupSmtpTransporter(serverConfig);

   if (!serverConfig.isInProductionMode) {
      initializeDebugSmtpServer(serverConfig).then(resolve).catch(reject);
   }
   else {
      resolve();
   }
});

/**
 * @public
 * @function sendEMail
 * @description sends an email with given type to the user
 * @param {string} emailTemplate - e-mail template, defines the content
 * @param {object} user - user to which e-mail is send
 * @returns {Promise} of send email
 */
const sendEMail = (emailTemplate, user) => new Promise((resolve, reject) => {
   const email = emailTemplate(user);

   _smtpTransporter.sendMail({
      from: "no-reply@shout-out-loud.com",
      to: user.email,
      replyTo: "no-reply@shout-out-loud.com",
      subject: email.subject,
      html: email.html
   }, (error, info) => {
      if (error) {
         reject(new InternalServerError({
            message: error.message,
            key: "sendEMail"
         }));
      } else {
         resolve(true);
      }
   });
});

export * from './emailTemplates';
export {
   sendEMail,
   initializeEMailTransport
};