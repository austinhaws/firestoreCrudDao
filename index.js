const { saveRecordAsync } = require('./src/crudDao/saveRecordAsync');
const { readRecordsWhereAsync } = require('./src/crudDao/readRecordsWhereAsync');
const { deleteRecordsAsync } = require('./src/crudDao/deleteRecordsAsync');
const { initFirestoreDb } = require('./src/dao/base/crudDao/firestoreDb');

exports.initFirestoreDB = initFirestoreDb;

exports.deleteRecordsAsync = deleteRecordsAsync;
exports.readRecordsWhereAsync = readRecordsWhereAsync;
exports.saveRecordAsync = saveRecordAsync;
