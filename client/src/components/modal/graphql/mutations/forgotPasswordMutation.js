import { graphql, gql } from 'react-apollo';

const forgotPasswordMutationDefinition = gql`
   mutation forgotPasswordMutation($email: String) {
      forgotPassword(email: $email)
   }
`;

const forgotPasswordMutation = graphql(forgotPasswordMutationDefinition, {
   props: ({ mutate }) => ({
      forgotPassword: (email) => {
         return mutate({
            variables: { email }
         });
      },
   }),
});

export default forgotPasswordMutation;
