import { graphql, gql } from 'react-apollo';

const signupMutationDefinition = gql`
   mutation signupMutation($newAccount: NewAccount) {
      signup(newAccount: $newAccount)
   }
`;

const signupMutation = graphql(signupMutationDefinition, {
   props: ({ mutate }) => ({
      signup: (newAccount) => {
         return mutate({
            variables: { newAccount }
         });
      },
   }),
});

export default signupMutation;
