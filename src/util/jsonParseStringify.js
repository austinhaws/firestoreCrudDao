/**
 * sad that firestore documents don't play well with apollo
 *
 * @param o
 * @return {*}
 */
exports.jsonParseStringify = o => o && JSON.parse(JSON.stringify(o));
