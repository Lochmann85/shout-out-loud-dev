import { graphql, gql } from 'react-apollo';


const changeUserPasswordDefinition = gql`
mutation changeUserPassword($passwordChangeData: PasswordChangeData, $userId: ID!) {
   changeUserPassword(passwordChangeData: $passwordChangeData, userId: $userId)
}`;

const changeUserPasswordMutation = graphql(changeUserPasswordDefinition, {
   props: ({ mutate }) => ({
      changeUserPassword: (passwordChangeData, userId) => {
         return mutate({
            variables: { passwordChangeData, userId },
         });
      },
   }),
});

export default changeUserPasswordMutation;