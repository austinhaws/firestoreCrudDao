const deleteRecordsAsyncModule = require('../crudDao/deleteRecordsAsync');
const readRecordsWhereAsyncModule = require('../crudDao/readRecordsWhereAsync');
const saveRecordAsyncModule = require('../crudDao/saveRecordAsync');

const startMockCrudDao = ({
    deleteRecordsAsync,
    readRecordsWhereAsync,
    saveRecordAsync,
}) => {
    const originalFuncs = {
        deleteRecordsAsync: deleteRecordsAsyncModule.deleteRecordsAsync,
        readRecordsWhereAsync: readRecordsWhereAsyncModule.readRecordsWhereAsync,
        saveRecordAsync: saveRecordAsyncModule.saveRecordAsync,
    };

    deleteRecordsAsyncModule.deleteRecordsAsync = deleteRecordsAsync || (({ collection, where }) => {
        console.log('deleteRecordsAsync', { collection, where });
    });

    readRecordsWhereAsyncModule.readRecordsWhereAsync = readRecordsWhereAsync || (({ collection, where, convertToObjects }) => {
        console.log('readRecordsWhereAsync', { collection, where, convertToObjects });
    });

    saveRecordAsyncModule.saveRecordAsync = saveRecordAsync || (({ collection, record, merge, where }) => {
        console.log('saveRecordAsync', { collection, record, merge, where });
    });

    return originalFuncs;
};

const stopMockCrudDao = originalFuncs => {
    deleteRecordsAsyncModule.deleteRecordsAsync = originalFuncs.deleteRecordsAsync;
    readRecordsWhereAsyncModule.readRecordsWhereAsync = originalFuncs.readRecordsWhereAsync;
    saveRecordAsyncModule.saveRecordAsync = originalFuncs.saveRecordAsync;
};

exports.mockCrudDao = (
    {
        deleteRecordsAsync,
        readRecordsWhereAsync,
        saveRecordAsync,
    },
    fn
) => {
    const originalFuncs = startMockCrudDao({
        deleteRecordsAsync,
        readRecordsWhereAsync,
        saveRecordAsync,
    })
    const result = fn();

    stopMockCrudDao(originalFuncs);

    return result;
};

exports.mockCrudDaoAsync = async ({
    deleteRecordsAsync,
    readRecordsWhereAsync,
    saveRecordAsync,
}, fnAsync) => {
    const originalFuncs = startMockCrudDao({
        deleteRecordsAsync,
        readRecordsWhereAsync,
        saveRecordAsync,
    })

    const result = fnAsync();

    stopMockCrudDao(originalFuncs);

    return result;
};
