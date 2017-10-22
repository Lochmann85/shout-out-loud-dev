import gql from 'graphql-tag';

import graphQLStore from './../../../../storeHandler/graphQLStore';

const fragment = {
   shouts: {
      name: "ShoutScreenShouts",
      document: gql`
      fragment ShoutScreenShouts on Shout {
         id
         message
         type
      }`
   }
};

graphQLStore.addFragment(fragment.shouts);

export default fragment;