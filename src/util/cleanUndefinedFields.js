// firestore & undefined fields: https://stackoverflow.com/questions/50112925/firebase-firestore-cloud-functions-showing-error-invalid-use-of-type-undefined
// deleting undefined fields: https://stackoverflow.com/questions/25421233/javascript-removing-undefined-fields-from-an-object
exports.cleanUndefinedFields = obj => (
  Object.keys(obj)
    .filter(key => obj[key] === undefined)
    .forEach(key => delete obj[key])
);