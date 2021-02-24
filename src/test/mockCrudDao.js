const mocks = {
    deleteRecordsAsync: null,
    readRecordsWhereAsync: null,
    saveRecordAsync: null,
};
exports.mocks = mocks;

const startMockCrudDao = ({
    deleteRecordsAsync,
    readRecordsWhereAsync,
    saveRecordAsync,
}) => {
    mocks.deleteRecordsAsync = deleteRecordsAsync || (({ collection, where }) => {
        console.log('deleteRecordsAsync', { collection, where });
    });

    mocks.readRecordsWhereAsync = readRecordsWhereAsync || (({ collection, where, convertToObjects }) => {
        console.log('readRecordsWhereAsync', { collection, where, convertToObjects });
    });

    mocks.saveRecordAsync = saveRecordAsync || (({ collection, record, merge, where }) => {
        console.log('saveRecordAsync', { collection, record, merge, where });
    });
};

const stopMockCrudDao = () => {
    mocks.deleteRecordsAsync = null;
    mocks.readRecordsWhereAsync = null;
    mocks.saveRecordAsync = null;
};

exports.mockCrudDao = (
    {
        deleteRecordsAsync,
        readRecordsWhereAsync,
        saveRecordAsync,
    },
    fn
) => {
    startMockCrudDao({
        deleteRecordsAsync,
        readRecordsWhereAsync,
        saveRecordAsync,
    });
    const result = fn();

    stopMockCrudDao();

    return result;
};

exports.mockCrudDaoAsync = async ({
    deleteRecordsAsync,
    readRecordsWhereAsync,
    saveRecordAsync,
}, fnAsync) => {
    startMockCrudDao({
        deleteRecordsAsync,
        readRecordsWhereAsync,
        saveRecordAsync,
    });

    const result = fnAsync();

    stopMockCrudDao();

    return result;
};
