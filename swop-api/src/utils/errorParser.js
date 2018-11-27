import _ from "lodash";

const parseErrors = function parseError(errors) {
  const result = {};
  _.forEach(errors, function(val, key) {
    result[key] = val.message;
  });
  return result;
};

export default parseErrors;
