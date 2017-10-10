import gql from 'graphql-tag';

import roleFormFragments from './roleForm';

export default {
   rules: {
      name: "CreateRoleRules",
      document: gql`
      fragment CreateRoleRules on Rule {
         ...${roleFormFragments.rules.name}
      }
      ${roleFormFragments.rules.document}`
   },
};