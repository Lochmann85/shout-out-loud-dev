import { serverConfig } from './../../configurations';

/**
 * @public
 * @function forgotPasswordTemplate
 * @description html text for forgot password e-mail template
 * @param {object} user - user to which email is send
 * @returns {function} generates html
 */
export default (user) => {
   const link = `${serverConfig.URL}/resetPassword/${user.resetPasswordToken}`;

   return {
      subject: `WiFli password reset`,
      html: `<h3>Hallo ${user.name}</h3>
      <p>Klicken Sie auf den folgenden Link um ihr Password zu ändern:</p>
      <a href="${link}">Link to reset Password</a>
      <br />
      <p>Mit freundlichen Grüßen,<br/>Ihr Software-Team</p>`,
   };
};