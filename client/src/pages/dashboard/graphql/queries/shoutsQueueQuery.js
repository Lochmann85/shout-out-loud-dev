import { graphql, gql } from 'react-apollo';

const shoutsQueueQuery = gql`
query shoutsQueueQuery {
   getShoutsQueue {
      message
      type
   }
}
`;

export default graphql(shoutsQueueQuery, {
   name: "shoutsQueueQuery",
});