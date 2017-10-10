import gql from 'graphql-tag';

import passwordChangerFragments from './passwordChanger';
import roleSelectionFragments from './roleSelection';

export default {
   user: {
      name: "UserFormUser",
      typeName: "User",
      document: gql`
      fragment UserFormUser on User {
         id
         email
         name
         role {
            id
         }
         ...${passwordChangerFragments.user.name}
      }
      ${passwordChangerFragments.user.document}`
   },
   roles: {
      name: "UserFormRoles",
      document: gql`
      fragment UserFormRoles on Role {
         ...${roleSelectionFragments.roles.name}
      }
      ${roleSelectionFragments.roles.document}`
   }
};