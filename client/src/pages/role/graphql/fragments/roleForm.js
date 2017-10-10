import gql from 'graphql-tag';

export default {
   role: {
      name: "RoleFormRole",
      typeName: "Role",
      document: gql`
      fragment RoleFormRole on Role {
         id
         name
         rules {
            id
            name
         }
      }`
   },
};