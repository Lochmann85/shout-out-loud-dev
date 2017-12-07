import { isEmail } from 'validator';

export default {
   validator: function (newEMail) {
      return isEmail(newEMail);
   },
   message: "Please provide a correct E-Mail."
};