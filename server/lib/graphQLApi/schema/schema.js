
const typeDefinitionsTemplate = (types, queries, mutations, subscriptions) => `
${types}
${queries ? `type Query {
   ${queries}
}` : ""}
${mutations ? `type Mutation {
   ${mutations}
}` : ""}
${subscriptions ? `type Subscription {
   ${subscriptions}
}` : ""}
schema {
   ${queries ? `query: Query` : ``}
   ${mutations ? `mutation: Mutation` : ""}
   ${subscriptions ? `subscription: Subscription` : ""}
}
`;

const schema = [""];

export {
   typeDefinitionsTemplate,
   schema
};
