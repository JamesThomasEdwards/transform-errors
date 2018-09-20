
const Immutable = require('immutable');

const isNonNest = {};

isNonNest.isMapVal = function (
    errorMap,
    keys,
    len,
    start = 0,
    str = '',
) {

    if (start === 0) {
        // makes array of keys;
        keys = errorMap.keySeq().toArray();
        len = keys.length;
    };
    // base case;
    if (start === len) {
        return str;
    };
    // if value is a Map, recursively iterate;
    if (Immutable.Map.isMap(errorMap.get(keys[start]))) {
        return isNonNest.isMapVal(errorMap.get(keys[start]));
    } else {
        // if value is a List, run isListVal and set it equal to str;
        // then recursively iterate;
        str += isNonNest.isListVal(errorMap.get(keys[start]));
        // increment start every recursive call
        return isNonNest.isMapVal(
            errorMap,
            keys,
            len,
            start + 1,
            str,
        );
    };
};

isNonNest.isListVal = function (
    errorList,
    len,
    start = 0,
    str = '',
) {

    len = errorList.size;
    // base case;
    if (start === len) {
        return str;
    };
    // if element is a string, add it to str and keep iterating recursively;
    if (typeof errorList.get(start) === 'string') {
        str += errorList.get(start) + '.';
        // increment start every recursive call
        return isNonNest.isListVal(
            errorList,
            len,
            start + 1,
            str,
        );
    } else {
        // if element is a Map, add the output of isMapVal to str;
        // keep iterating recrusively;
        str += isNonNest.isMapVal(errorList.get(start));
        // increment start every recursive call
        return isNonNest.isListVal(
            errorList,
            len,
            start + 1,
            str,
        );
    };
};

module.exports = isNonNest;

