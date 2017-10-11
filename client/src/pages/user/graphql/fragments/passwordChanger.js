import gql from 'graphql-tag';

export default {
   user: {
      name: "PasswordChangerUser",
      document: gql`
      fragment PasswordChangerUser on User {
         id
         name
      }`
   }
};