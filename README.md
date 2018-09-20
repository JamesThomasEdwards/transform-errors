# transform-errors

## Instructions


1. ``` cd transform-errors ```

2. ``` npm install ```


## Test -> Mocha

There are 3 test, the original one given and 2 additional test added. Please see the solution folder -> test.js file. 


### To Run Test

1. ``` npm run test ```

## Brief -> Approach

I decided to break up this problem into several functions, 3 parts. The first are more of the core functions, that are responsible for taking in the error message and transforming it. The second act as iterator for Map & List whose nested structures are to be transformed. Lastly, the third also acts as an iterator for Map & List whose nested structures are to be kept; this is determined by the additional arguments (keys) provided.

### core-functions -> takes in the error message + key parameters and tansforms the errors

* concatenateErrorMessages - takes in error Map and additional arguments
* createNewErrorMap - constructs the new Map
* removeDuplicates - removes duplicate error messages

### non-nest-functions -> isNonNest.js -> Act as iterators if a Map and or List are detected where nesting is transformed

* isMapVal - iterates through a Map
* isListVal - iterates through a List and concatenates error messages

### keep-nest-functions -> isNest.js -> Act as iterators if Map and or List are detected where nesting is kept

* isMapKeepNest - iterates through a Map and keeps the nesting structure
* isListKeepNest - iterates though a List, add '.' to error messages, and keeps the nesting structure

