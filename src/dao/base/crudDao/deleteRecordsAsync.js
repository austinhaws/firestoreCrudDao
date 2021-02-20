const { firestoreDb } = require('./firestoreDb');

const deleteByIdsAsync = async ({ collection, ids }) => {
  const records = await firestoreDb().getAll(...(ids.map(id => firestoreDb().collection(collection).doc(id))));
  records.docs.forEach(doc => doc.delete());
  return records.docs.map(doc => doc.id);
};

const deleteByWhereAsync = async ({ collection, where }) => {
  const query = Object.keys(where || {})
    .filter(key => where[key])
    .reduce((queryCarry, key) => queryCarry.where(key, '==', where[key]), firestoreDb().collection(collection));

  const results = await query.get();
  results.docs.forEach(doc => doc.ref.delete());

  return results.docs.map(doc => doc.ref.id);
};

const deleteByIdAsync = async ({ collection, id }) => {
  await firestoreDb().collection(collection).doc(id).delete();
  return [id];
};

/**
 * load record(s) based from a collection based on a single field
 * if where has `id` then it searches by a single id
 * if where has `ids` then it searches by a group of ids
 * otherwise it uses key/value exact match pairs for where
 *
 * @param collection string
 * @param where object key value pairs of `key === value` where phrases
 * @return {Promise<{}>}
 */
exports.deleteRecordsAsync = async ({ collection, where }) => {
  let result;

  if (where && where.id) {
    result = await deleteByIdAsync({ collection, id: where.id });
  } else if (where && where.ids) {
    result = await deleteByIdsAsync({ collection, ids: where.ids });
  } else {
    result = await deleteByWhereAsync({ collection, where });
  }
  return result || [];
};
