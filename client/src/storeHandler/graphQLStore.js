/**
 * @private
 * @class Fragment
 * @description class for fragments which can be reused
 */
class Fragment {
   constructor(name, typeName, document) {
      this._name = name;
      this._typeName = typeName;
      this._document = document;
   }

   buildExecutable(relatedId) {
      return {
         fragmentName: this._name,
         id: `${this._typeName}${relatedId}`,
         fragment: this._document,
      };
   }

   get name() { return this._name; }

   get document() { return this._document; }

   get typeName() { return this._typeName; }
};

/**
 * @private
 * @member
 * @description queries and fragments stored for graphql
 */
const _queries = [];

const _fragments = [];

/**
 * @public
 * @function addQuery
 * @description adds a new query to the array and checks if already exists
 * @param {object} newQuery - new query
 */
const addQuery = (newQuery) => {
   const query = _queries.find(query => query.config.name === newQuery.config.name);
   if (!query) {
      _queries.push(newQuery);
   }
};

/**
 * @public
 * @function findQuery
 * @description finds a saved prepared query by name
 * @param {string} queryName - name of the query
 * @returns {object} query or null
 */
const findQuery = (queryName) => {
   const query = _queries.find(query => query.config.name === queryName);
   if (!query) {
      console.log(`Could not find query: ${queryName} in graphQLStore.`);
   }
   return query;
};

/**
 * @public
 * @function addFragment
 * @description adds a new fragment to the array and checks if already exists
 * @param {object} newFragment - new fragment
 */
const addFragment = (newFragment) => {
   const fragment = _fragments.find(fragment => fragment.name === newFragment.name);
   if (!fragment) {
      _fragments.push(new Fragment(newFragment.name, newFragment.typeName, newFragment.document));
   }
};

/**
 * @public
 * @function findFragment
 * @description finds a saved prepared Fragment by name
 * @param {string} fragmentName - name of the fragment
 * @returns {object} fragment or null
 */
const findFragment = (fragmentName) => {
   const fragment = _fragments.find(fragment => fragment.name === fragmentName);
   if (!fragment) {
      console.log(`Could not find fragment: ${fragmentName} in graphQLStore.`);
   }
   return fragment;
};

const graphQLStore = {
   addQuery,
   findQuery,
   addFragment,
   findFragment
};

export default graphQLStore;