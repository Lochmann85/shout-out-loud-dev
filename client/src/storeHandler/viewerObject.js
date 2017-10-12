
function _has(ruleNames) {
   if (this.role && Array.isArray(this.role.rules)) {
      let hasAllRules = true;
      ruleNames.forEach(ruleName => {
         const foundRule = this.role.rules.find(viewerRule => viewerRule.name === ruleName);
         if (!foundRule) {
            hasAllRules = false;
         }
      });
      return hasAllRules;
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