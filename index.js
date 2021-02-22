const { saveRecordAsync } = require('./src/crudDao/saveRecordAsync');
const { readRecordsWhereAsync } = require('./src/crudDao/readRecordsWhereAsync');
const { deleteRecordsAsync } = require('./src/crudDao/deleteRecordsAsync');
const { initFirestoreDb } = require('./src/crudDao/firestoreDb');
const { mockCrudDao } = require('./src/test/mockCrudDao');

exports.initFirestoreDB = initFirestoreDb;

exports.deleteRecordsAsync = deleteRecordsAsync;
exports.readRecordsWhereAsync = readRecordsWhereAsync;
exports.saveRecordAsync = saveRecordAsync;

exports.mockCrudDao = mockCrudDao;
