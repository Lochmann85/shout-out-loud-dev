import gql from 'graphql-tag';

export default {
   roles: {
      name: "RoleSelectionRoles",
      document: gql`
      fragment RoleSelectionRoles on Role {
         id
         name
      }`
   }
};