import { gql, graphql } from 'react-apollo';

const resetPasswordMutationDefinition = gql`
mutation resetPasswordMutation($password: String, $confirmation: String, $resetPwdToken: String) {
   resetPassword(password: $password, confirmation: $confirmation, resetPwdToken: $resetPwdToken)
}
`;

const resetPasswordMutation = graphql(resetPasswordMutationDefinition, {
   props: ({ mutate }) => ({
      resetPassword: (password, confirmation, resetPwdToken) => {
         return mutate({ variables: { password, confirmation, resetPwdToken } });
      },
   }),
});

export default resetPasswordMutation;