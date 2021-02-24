const { mocks } = require('../test/mockCrudDao');
const { firestoreDb } = require('./firestoreDb');
const { jsonParseStringify } = require('../util/jsonParseStringify');
const { readRecordsWhereAsync } = require('./readRecordsWhereAsync');

/**
 * Saves a firestore record. assumes that the record's id is set if it
 * already exists and will add the record as a new one if it isn't set.
 * This function does not check if the record can be found by another
 * field. The caller should load the record's id using readRecordsWhere()
 * or another method as needed before calling this function.
 *
 * Returns the saved record, with id added if record inserted.
 *
 * @param collection string
 * @param record object
 * @param merge bool if true then fields are merged together in document
 * @param where object where fields for finding the record
 * @return {Promise<{}>}
 */
exports.saveRecordAsync = async ({ collection, record, merge, where }) => {
  let naturalInput = jsonParseStringify(record);

  if (mocks.saveRecordAsync) {
    naturalInput = mocks.saveRecordAsync({ collection, record, merge, where });
  } else if (record.id) {
    await firestoreDb().collection(collection).doc(record.id).set(naturalInput, { merge: !!merge });

    // because of merge, the naturalInput may not have all the input
    naturalInput = (await readRecordsWhereAsync({ collection, where: { id: record.id } })).pop();

  } else if (where) {
    const existingRecord = await readRecordsWhereAsync({ collection, where, convertToObjects: false });
    if (existingRecord.docs && existingRecord.docs.length === 1) {
      const doc = existingRecord.docs[0];
      await doc.ref.update(naturalInput, { merge: !!merge });
    } else {
      const docRef = await firestoreDb().collection(existingRecord).add(naturalInput);
      naturalInput.id = docRef.id;
      record.id = naturalInput.id;
    }

  } else {
    const docRef = await firestoreDb().collection(collection).add(naturalInput);
    naturalInput.id = docRef.id;
    record.id = naturalInput.id;
  }

  return naturalInput;
};
