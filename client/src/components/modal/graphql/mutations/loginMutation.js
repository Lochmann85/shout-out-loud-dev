import { graphql, gql } from 'react-apollo';

const loginMutationDefinition = gql`
   mutation loginMutation($credentials: Credentials) {
      login(credentials: $credentials) {
         id
         token
      }
   }
`;

const loginMutation = graphql(loginMutationDefinition, {
   props: ({ mutate }) => ({
      login: (credentials) => {
         return mutate({
            variables: { credentials }
         });
      },
   }),
});

export default loginMutation;
