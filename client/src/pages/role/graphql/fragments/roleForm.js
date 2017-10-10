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
   rules: {
      name: "RoleFormRules",
      document: gql`
      fragment RoleFormRules on Rule {
         id
         name
      }`
   }
};