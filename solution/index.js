const Immutable = require('immutable');

let error = Immutable.fromJS({
    name: ['This field is required'],
    age: ['This field is required', 'Only numeric characters are allowed'],
    urls: [{}, {}, {
        site: {
            code: ['This site code is invalid'],
            id: ['Unsupported id'],
        }
    }],
    url: {
        site: {
            code: ['This site code is invalid'],
            id: ['Unsupported id'],
        }
    },
    tags: [{}, {
        non_field_errors: ['Only alphanumeric characters are allowed'],
        another_error: ['Only alphanumeric characters are allowed'],
        third_error: ['Third error']
    }, {}, {
        non_field_errors: [
            'Minumum length of 10 characters is required',
            'Only alphanumeric characters are allowed',
        ],
    }],
    tag: {
        nested: {
            non_field_errors: ['Only alphanumeric characters are allowed'],
        },
    },
});
// start here with the error message and possible keys in the perameter;
function concatenateErrorMessages(errorMap, ...args) {
    // return createNewErrorMap with errorMap and additional arguments
    // as an array
    return createNewErrorMap(errorMap, [...args]);
}
function createNewErrorMap(errorMap, args, keys, len = 0, newMap = Immutable.Map(), start = 0) {
    // makes an array of keys
    keys = errorMap.keySeq().toArray();
    len = keys.length;
    // base case
    if (start === len) {
        // concatenated errors;
        return newMap;
    }
    // check to see if any keys inserted as perameters are to keep their nest;
    if (args.includes(keys[start])) {
        // if the value is a Map run it in isMapKeepNest;
        if (Immutable.Map.isMap(errorMap.get(keys[start]))) {
            newMap = newMap.set(keys[start],
                isMapKeepNest(errorMap.get(keys[start])));
        } else {
            // if the value is a List run it in isListKeepNest;
            newMap = newMap.set(keys[start],
                isListKeepNest(errorMap.get(keys[start])));
        }
        // if value is a Map run isMapVal;
    } else if (Immutable.Map.isMap(errorMap.get(keys[start]))) {
        newMap = newMap.set(keys[start],
            removeDuplicates(isMapVal(errorMap.get(keys[start]))
                .split('.')
                .map(ele => ele.trim()))
                .join('. ') + '.');
    } else {
        // if value is a List run isListVal;
        newMap = newMap.set(keys[start],
            removeDuplicates(isListVal(errorMap.get(keys[start]))
                .split('.')
                .map(ele => ele.trim()))
                .join('. ') + '.');
    }
    // increment start every recursive call
    return createNewErrorMap(errorMap, args, keys, len, newMap, start + 1);
}

console.dir(concatenateErrorMessages(error, 'url', 'urls').toJS(), { depth: null });

function removeDuplicates(arr) {
    return arr.filter((ele, i) => arr.indexOf(ele) === i && ele !== '');
}

function isMapVal(errorMap, keys, len, start = 0, str = '') {
    if (start === 0) {
        // makes array of keys;
        keys = errorMap.keySeq().toArray();
        len = keys.length;

    }
    // base case
    if (start === len) {
        return str;
    }
    // if value is a Map, recursively iterate;
    if (Immutable.Map.isMap(errorMap.get(keys[start]))) {
        return isMapVal(errorMap.get(keys[start]));
    } else {
        // if value is a List, run isListVal and set it equal to str;
        // then recursively iterate;
        str += isListVal(errorMap.get(keys[start]));
        // increment start every recursive call
        return isMapVal(errorMap, keys, len, start + 1, str);
    }
}

function isListVal(errorList, len = 0, start = 0, str = '') {
    len = errorList.size;
    // base case
    if (start === len) {
        return str;
    }
    // if element is a string, add it to str and keep iterating recursively;
    if (typeof errorList.get(start) === 'string') {
        str += errorList.get(start) + '.';
        // increment start every recursive call
        return isListVal(errorList, len, start + 1, str);
    } else {
        // if element is a Map, add the output of isMapVal to str;
        // keep iterating recrusively;
        str += isMapVal(errorList.get(start));
        // increment start every recursive call
        return isListVal(errorList, len, start + 1, str);
    }
}

function isMapKeepNest(errorMap, keys, len, start = 0) {
    if (start === 0) {
        // makes an array of keys;
        keys = errorMap.keySeq().toArray();
        len = keys.length;
    }
    // base case
    if (start === len) {
        return errorMap;
    }
    // if value is a Map, set errorMap at current key, with value as;
    // output of isMapKeepNest;
    // keep iterating recursively;
    if (Immutable.Map.isMap(errorMap.get(keys[start]))) {
        errorMap = errorMap.set(keys[start],
            isMapKeepNest(errorMap.get(keys[start])));
        // increment start every recursive call
        return isMapKeepNest(errorMap, keys, len, start + 1);
    } else {
        // if value is a List set errorMap at current key, with value as;
        // output of isListKeepNest;
        // keep iterating recursively;
        errorMap = errorMap.set(keys[start],
            isListKeepNest(errorMap.get(keys[start]))
                .join(' '));
        // increment start every recursive call
        return isMapKeepNest(errorMap, keys, len, start + 1);
    }

}

function isListKeepNest(errorList, len, start = 0, str = '') {
    len = errorList.size;
    if (start === len) {
        return errorList;
    }
    // if List element is a string, add it to str with '.';
    // set str as the new element for the start index of errorList;
    // keep iterating recursively;
    if (typeof errorList.get(start) === 'string') {
        str = errorList.get(start) + '.';
        errorList = errorList.set(start, str);
        // increment start every recursive call
        return isListKeepNest(errorList, len, start + 1);
    } else {
        // if List element is a Map, set the output of isMapKeepNest;
        // to the start index of errorList;
        // recursively iterate;
        errorList = errorList.set(start,
            isMapKeepNest(errorList.get(start)));
        // increment start every recursive call
        return isListKeepNest(errorList, len, start + 1);
    }

}
module.exports = concatenateErrorMessages