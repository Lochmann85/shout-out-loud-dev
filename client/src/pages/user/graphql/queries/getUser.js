import { gql } from 'react-apollo';

import graphQLStore from './../../../../storeHandler/graphQLStore';

let query;

const userFragment = graphQLStore.findFragment("UpdateUser");
if (userFragment) {
   query = {
      document: gql`
      query getUserQuery($userId: ID!) {
         getUser(userId: $userId) {
            ...${userFragment.name}
         }
      }
      ${userFragment.document}`,
      config: {
         name: "getUserQuery",
         options: (ownProps) => {
            return {
               variables: { userId: ownProps.match.params.userId }
            };
         }
      }
   };
}
else {
   throw new Error("FATAL ERROR, could not generate getUserQuery");
}

export default query;