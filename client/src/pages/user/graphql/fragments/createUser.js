import gql from 'graphql-tag';

import userFormFragments from './userForm';

export default {
   roles: {
      name: "CreateUserRoles",
      document: gql`
      fragment CreateUserRoles on Role {
         ...${userFormFragments.roles.name}
      }
      ${userFormFragments.roles.document}`
   },
};