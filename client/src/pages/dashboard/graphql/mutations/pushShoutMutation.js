import { graphql, gql } from 'react-apollo';

const pushShoutMutationDefinition = gql`
mutation pushShoutMutation($shout: ShoutInput!) {
   pushShout(shout: $shout)}
`;

const pushShoutMutation = graphql(pushShoutMutationDefinition, {
   props: ({ mutate }) => ({
      pushShout: (shout) => {
         return mutate({ variables: { shout } });
      },
   }),
});

export default pushShoutMutation;