const { mocks } = require('../test/mockCrudDao');
const { firestoreDb } = require('./firestoreDb');
const { collectionToArray } = require('../util/collectionToArray');

const readByIdsAsync = async ({ collection, ids }) => {
  const records = await firestoreDb().getAll(...(ids.map(id => firestoreDb().collection(collection).doc(id))));
  return { docs: records };
};

const readByWhereAsync = async ({ collection, where }) => {
  const query = Object.keys(where || {})
    .filter(key => where[key])
    .reduce((queryCarry, key) => queryCarry.where(key, '==', where[key]), firestoreDb().collection(collection));
  return await query.get();
};

const readByIdAsync = async ({ collection, id }) => {
  let appResult = await firestoreDb().collection(collection).doc(id).get();
  // expects results as an array, even if just one
  return appResult && { docs: [appResult] };
};

/**
 * load record(s) based from a collection based on a single field
 * if where has `id` then it searches by a single id
 * if where has `ids` then it searches by a group of ids
 * otherwise it uses key/value exact match pairs for where
 *
 * @param collection string
 * @param where object key value pairs of `key === value` where phrases
 * @param convertToObjects bool if true then change to natural js array objects instead of collection of doc refs
 * @return {Promise<{}>}
 */
exports.readRecordsWhereAsync = async ({ collection, where, convertToObjects = true }) => {
  let result;

  if (mocks.readRecordsWhereAsync) {
    result = mocks.readRecordsWhereAsync({ collection, where, convertToObjects });
  } else if (where && where.id) {
    result = await readByIdAsync({ collection, id: where.id });
  } else if (where && where.ids) {
    result = await readByIdsAsync({ collection, ids: where.ids });
  } else {
    result = await readByWhereAsync({ collection, where });
  }
  if (convertToObjects && result) {
    result = collectionToArray(result);
  }
  return result || [];
};
