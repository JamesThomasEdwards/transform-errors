# transform-errors

## Instructions


1. ``` cd rest-api-test ```

2. ``` npm install ```


## Test -> Mocha

There are two additional test included in the solution folder -> test.js file

### To Run Test

1. ``` npm run test ```

## Brief

I decided to break up this problem into several functions. Besides the first 3 which are 
responsible for taking in the error message + multiple arguments, constructing the 
transformed Map, and removing duplicates, the others either take in a Map or List. 

### Takes in error message + key parameters

* concatenateErrorMessages - takes in error Map and additional arguments
* createNewErrorMap - constructs the new Map
* removeDuplicates - removes duplicate error messages

### Act as iterators if a Map is detected

* isMapVal - iterates through a Map
* isMapKeepNest - iterates through a Map and keeps the nesting structure

### Act as iterators if a List is detected and or concatenates error messages

* isListVal - iterates through a List and concatenates error messages
* isListKeepNest - iterates though a List, add '.' to error messages, and keeps the nesting structure

