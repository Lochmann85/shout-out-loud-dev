
function _has(ruleName) {
   if (this.role && Array.isArray(this.role.rules)) {
      return this.role.rules.findIndex(viewerRule => viewerRule.name === ruleName) > -1;
   }
   else {
      return false;
   }
};

const addFunctionalityToViewerData = (viewerData) => {
   return Object.assign({}, viewerData, {
      has: _has
   });
};

export {
   addFunctionalityToViewerData
};