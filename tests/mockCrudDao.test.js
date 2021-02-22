const saveRecordAsync = require("../src/crudDao/saveRecordAsync");
const readRecordsWhereAsync = require("../src/crudDao/readRecordsWhereAsync");
const deleteRecordsAsync = require("../src/crudDao/deleteRecordsAsync");
const { mockCrudDao, mockCrudDaoAsync } = require('../src/test/mockCrudDao');

const TEST_RECORD_ID = 'testRecordID';

test('mockCrudDao - all mocked', async () => {
    mockCrudDao(
        {
            saveRecordAsync: async ({ record }) => {
                record.id = TEST_RECORD_ID;
                return record;
            },
            readRecordsWhereAsync: async () => {
                return [
                    {
                        id: TEST_RECORD_ID
                    }
                ];
            },
            deleteRecordsAsync: async () => [TEST_RECORD_ID],
        },
        () => {
            expect(saveRecordAsync.saveRecordAsync({ record: {} })).resolves.toStrictEqual({ id: TEST_RECORD_ID });
            expect(readRecordsWhereAsync.readRecordsWhereAsync()).resolves.toStrictEqual([{ id: TEST_RECORD_ID }]);
            expect(deleteRecordsAsync.deleteRecordsAsync({ record: {} })).resolves.toStrictEqual([TEST_RECORD_ID]);
        }
    )
});

test('mockCrudDaoAsync - all mocked', async () => {
    mockCrudDaoAsync(
        {
            saveRecordAsync: async ({ record }) => {
                record.id = TEST_RECORD_ID;
                return record;
            },
            readRecordsWhereAsync: async () => {
                return [
                    {
                        id: TEST_RECORD_ID
                    }
                ];
            },
            deleteRecordsAsync: async () => [TEST_RECORD_ID],
        },
        async () => {
            expect(saveRecordAsync.saveRecordAsync({ record: {} })).resolves.toStrictEqual({ id: TEST_RECORD_ID });
            expect(readRecordsWhereAsync.readRecordsWhereAsync()).resolves.toStrictEqual([{ id: TEST_RECORD_ID }]);
            expect(deleteRecordsAsync.deleteRecordsAsync({ record: {} })).resolves.toStrictEqual([TEST_RECORD_ID]);
        }
    )
});
