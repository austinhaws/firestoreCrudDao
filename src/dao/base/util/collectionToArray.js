// https://stackoverflow.com/questions/46614055/map-items-of-collection-snapshot-in-firebase-firestore
const { jsonParseStringify } = require('./jsonParseStringify');

exports.collectionToArray = collection => (
  collection.docs.map(doc => {
    const result = { ...doc.data() };
    result.id = doc && doc.id;

    // do json string => parse so that everything is natural objects including nested children
    // these seems like it is an optimization pain point
    return jsonParseStringify(result);
  })
);
