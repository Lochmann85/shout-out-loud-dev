import { IntrospectionFragmentMatcher } from 'react-apollo';

const fragmentMatcher = new IntrospectionFragmentMatcher({
   introspectionQueryResultData: {
      __schema: {
         types: [
            {
               kind: "INTERFACE",
               name: "IAuthorized",
               possibleTypes: [
                  { name: "Viewer" },
               ],
            },
            {
               kind: "INTERFACE",
               name: "IUser",
               possibleTypes: [
                  { name: "User" },
               ],
            },
         ],
      },
   }
});

export default fragmentMatcher;