import { serverConfig } from './../../configurations';

/**
 * @public
 * @function singnupTemplate
 * @description html text for signup template
 * @param {object} accountConfirmation - account confirmation data to which email is send
 * @returns {function} generates html
 */
export default (accountConfirmation) => {
   const link = `${serverConfig.URL}/signup/${accountConfirmation.confirmAccountToken}`;

   return {
      subject: `Shout Out Loud signup`,
      html: `<h3>Hello ${accountConfirmation.name}</h3>
      <p>Begin to shout your thoughts to the world.</p>
      <a href="${link}">Click the link to open your mind!</a>
      <br />
      <p>Best regards,<br/>the shout-out-loud-Team</p>`,
   };
};