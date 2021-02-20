// sad that firestore documents don't play well with apollo
const { jsonParseStringify } = require('./jsonParseStringify');

exports.documentToObject = document => {
  const result = jsonParseStringify(document.data());
  result.id = document.id || result.id;
  return result;
};
