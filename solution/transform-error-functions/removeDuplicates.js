
function removeDuplicates(arr) {
    return arr
        .filter((ele, i) => arr
            .indexOf(ele) === i && ele !== '');
};

module.exports = removeDuplicates;