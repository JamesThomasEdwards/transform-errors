
const Immutable = require('immutable');

const isNest = {};

isNest.isMapKeepNest = function (
    errorMap,
    keys,
    len,
    start = 0,
) {

    if (start === 0) {
        // makes an array of keys;
        keys = errorMap.keySeq().toArray();
        len = keys.length;
    };
    // base case;
    if (start === len) {
        return errorMap;
    };
    // if value is a Map, set errorMap at current key, with value as;
    // output of isMapKeepNest;
    // keep iterating recursively;
    if (Immutable.Map.isMap(errorMap.get(keys[start]))) {
        errorMap = errorMap.set(keys[start],
            isNest.isMapKeepNest(errorMap.get(keys[start])));
        // increment start every recursive call
        return isNest.isMapKeepNest(
            errorMap,
            keys,
            len,
            start + 1,
        );
    } else {
        // if value is a List set errorMap at current key, with value as;
        // output of isListKeepNest;
        // keep iterating recursively;
        errorMap = errorMap.set(keys[start],
            isNest.isListKeepNest(errorMap.get(keys[start]))
                .join(' '));
        // increment start every recursive call
        return isNest.isMapKeepNest(
            errorMap,
            keys,
            len,
            start + 1,
        );
    };

};

isNest.isListKeepNest = function (
    errorList,
    len,
    start = 0,
    str = '',
) {

    len = errorList.size;

    if (start === len) {
        return errorList;
    };
    // if List element is a string, add it to str with '.';
    // set str as the new element for the start index of errorList;
    // keep iterating recursively;
    if (typeof errorList.get(start) === 'string') {
        str = errorList.get(start) + '.';
        errorList = errorList.set(start, str);
        // increment start every recursive call
        return isNest.isListKeepNest(
            errorList,
            len,
            start + 1,
        );
    } else {
        // if List element is a Map, set the output of isMapKeepNest;
        // to the start index of errorList;
        // recursively iterate;
        errorList = errorList.set(start,
            isNest.isMapKeepNest(errorList.get(start)));
        // increment start every recursive call
        return isNest.isListKeepNest(
            errorList,
            len,
            start + 1,
        );
    };
};

module.exports = isNest;