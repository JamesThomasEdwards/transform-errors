
const createNewErrorMap = require('./createNewErrorMap');


// start here with the error message and possible keys in the parameter;
function concatenateErrorMessages(
    errorMap,
    ...args
) {
    // return createNewErrorMap with errorMap and additional arguments;
    // as an array;
    return createNewErrorMap(
        errorMap,
        [...args],
    );
};

module.exports = concatenateErrorMessages;