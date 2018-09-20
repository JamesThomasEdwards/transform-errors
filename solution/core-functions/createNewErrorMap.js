
const Immutable = require('immutable');

const isNest = require('../keep-nest-functions/isNest');
const isNonNest = require('../non-nest-functions/isNonNest');
const removeDuplicates = require('./removeDuplicates');

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

function createNewErrorMap(
    errorMap,
    args,
    keys,
    len = 0,
    newMap = Immutable.Map(),
    start = 0,
) {
    // makes an array of keys;
    keys = errorMap.keySeq().toArray();
    len = keys.length;
    // base case;
    if (start === len) {
        // concatenated errors;
        return newMap;
    };
    // check to see if any keys inserted as perameters are to keep their nest;
    if (args.includes(keys[start])) {
        // if the value is a Map run it in keep-nest-functions -> isMapKeepNest;
        if (Immutable.Map.isMap(errorMap.get(keys[start]))) {
            newMap = newMap.set(keys[start],
                isNest.isMapKeepNest(errorMap.get(keys[start])));
        } else {
            // if the value is a List run it in keep-nest-functions -> isListKeepNest;
            newMap = newMap.set(keys[start],
                isNest.isListKeepNest(errorMap.get(keys[start])));
        };
        // if value is a Map run non-nest-functions -> isMapVal;
    } else if (Immutable.Map.isMap(errorMap.get(keys[start]))) {
        newMap = newMap.set(keys[start],
            removeDuplicates(isNonNest.isMapVal(errorMap.get(keys[start]))
                .split('.')
                .map(ele => ele.trim()))
                .join('. ') + '.');
    } else {
        // if value is a List run non-nest-functions -> isListVal;
        newMap = newMap.set(keys[start],
            removeDuplicates(isNonNest.isListVal(errorMap.get(keys[start]))
                .split('.')
                .map(ele => ele.trim()))
                .join('. ') + '.');
    };
    // increment start every recursive call
    return createNewErrorMap(
        errorMap,
        args,
        keys,
        len,
        newMap,
        start + 1,
    );
};

module.exports = concatenateErrorMessages;