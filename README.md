# transform-errors

## Instructions


1. ``` cd transform-errors ```

2. ``` npm install ```


## Test -> Mocha

There are 3 test, the original one given and 2 additional test added. Please see the solution folder -> test.js file. 


### To Run Test

1. ``` npm run test ```

## Brief -> Approach

I decided to break up this problem into several functions. The first are more of the core functions, that are responsible for taking in the error message and transforming it. The others either take in a Map or List and 
essentially act as iterators. Please see function list below.

### Core functions - takes in the error message + key parameters and tansforms the errors

* concatenateErrorMessages - takes in error Map and additional arguments
* createNewErrorMap - constructs the new Map
* removeDuplicates - removes duplicate error messages

### Act as iterators if a Map is detected

* isMapVal - iterates through a Map
* isMapKeepNest - iterates through a Map and keeps the nesting structure

### Act as iterators if a List is detected and or concatenates error messages

* isListVal - iterates through a List and concatenates error messages
* isListKeepNest - iterates though a List, add '.' to error messages, and keeps the nesting structure

