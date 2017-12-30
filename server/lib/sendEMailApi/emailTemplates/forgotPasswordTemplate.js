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
      subject: `Shout Out Loud forgot password`,
      html: `<h3>Hello ${user.name}</h3>
      <p>Reenter the world of thoughts with a new password.</p>
      <a href="${link}">Click the link to change yours!</a>
      <br />
      <p>Best regards,<br/>the shout-out-loud-Team</p>`,
   };
};