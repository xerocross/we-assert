# We-Assert

We-Assert is an assert utility for use in internally verifying statements inside scripts at runtime. One potential goal is to catch what would otherwise be silent errors, or perhaps even
to mathematically prove that an algorithm has functioned as expected.

This project was stale for a long while, but as of June 2023 I have updated it to Version 5, and it is up-to-code. I plan to use it in some of my other projects, so it is likely that I will maintain it better now.

As of version 4, We-Assert has been stripped of Vulcan (https://github.com/RyanMarcus/vulcan), which was packaged with Version 3. The license of We-Assert 4 is the MIT license. What was formerly We-Assert Version 3 is now a new project called We-Assert-Proof, located at https://github.com/xerocross/we-assert-proof. That project is interesting to me, but I find the copyleft license of Vulcan far too restrictive.

## New Stuff

As of V5, I have reordered the arguments of the basic `we.assert` functions
so that they should be `(message, validatorFunction, payload)`. I realize this is
a breaking change, but I'm doing it because it makes more sense, and it makes
the intention of the statement more readable because the plain language 
message (English, or whatever human language) is up front.

As of V5, the `that` function can also include an optional payload object 
for passing data of any kind from assertions into your handler function.

## Importing

We-Assert is published to NPM as `we-assert`. Standard importing would look like this.
```
import WeAssert from "we-assert"
```


The source code is at https://github.com/xerocross/we-assert.

## Development and Deployment

As of Version 4, we are now using npm to build this project (not yarn, which we used in V2), so to install execute `npm install`.

We-Assert is written in TypeScript.  The package includes a test suite and a script for running it. Use `npm test` to run the test suite, which is written using Jest.


## Usage

```
import WeAssert from "we-assert";
var we = WeAssert.build();
```
Here ``we`` is not a singleton.  You can build as many as you want, and each has its own scope and each can be configured independently.

The most basic usage is the `that(statement, message [, payload])` function.  For example
```
we.assert.that("x < y", x < y);
```
We recommend writing messages that are positive assertions representing the calculation&mdash;not an error message to be thrown upon failure.

If the statement evaluates false, the weAssert handler will be called.  The handler should be a function of the form `handler : (message) => {...}`.  To define such a function, we use `we.setHandler` as in this example.
```
we.setHandler((message) => {
    throw new Error(`The following assertion failed: ${message}`);
});
```
Note how in the handler we have translated the positive assertion into an error message about exactly which assertion failed.  Of course instead of throwing an error you could just swallow it, or log it, or throw the error and log it.  You get the idea.  We-Assert is agnostic to handling the failure of assertions.  Handle it however you want.   

We can set the level using any of the following:
`we.setLevel("DEBUG")`, `we.setLevel("WARN")`, or  `we.setLevel("ERROR")`.  The default is "ERROR".  

A specific assertion can be assigned a level using the `atLevel` function as in this example.
```
we.assert.atLevel("WARN").that(message, statement)
```
When using this construction, the *statement* will only be evaluated if the level given ("WARN") is greater than or equal to the threshhold level defined using `weAssert.setLevel`.  The order is `DEBUG` < `WARN` < `ERROR`.  Thus, for example, if we set `weAssert.setLevel("ERROR")` and then execute
```
we.assert.atLevel("WARN").that("test", statement)
```
then `statement` will not be evaluated and the handler will not be called and nothing will happen because `WARN` is not greater than or equal to the current level `ERROR`.

By contrast, if you call
```
we.assert.that("test", false)
```
then levels play no role in the assertion.  It will be treated as an error and it will go to the handler.

### handlers and payloads

You can define specific handlers for each level using the methods below.
```
we.setHandler((message, payload) => {...});
we.setErrorHandler((message, payload) => {...}); 
we.setWarnHandler((message, payload) => {...});
we.setDebugHandler((message, payload) => {...});
```

For any assertion, you can optionally send a payload along with the message. For example:
`we.assert.that("x < y", x < y, myObj)`. Here `myObj` is any JavaScript object. You can handle the data in your handler method.



### data validators

You can define arbitrary data types so long as you can pass in a function that evaluates boolean to check whether any input passes or fails. The predicate defines the data type.

The usage pattern is ``we.assert.typeOf(data).is(_tyepstring_, _message_)`` to validate a given element _data_.

```
    we.define.type("natural", (x) => isNaturalNumber(x));
    we.assert.typeOf(x).is("natural", "x is a natural");
```
The ```we``` instance does not come with any predefined types.  If you want to use the standard types you can define them in your ``we`` instance by, for example, executing this:

```we.define.type("number", (x) => typeof x === "number");```
```we.define.type("array", (x)=> Array.isArray(x));```

You can also _check_ a data element and get a boolean directly like this.  This has no side effects. If false, the handler will not be called.
```
let x = 12;
we.define.type("natural", (x) => isNaturalNumber(x));
expect(we.check.typeOf(x).is("natural")).toBe(true);
```

Putting these things together, we can define something like this:

```
we.define.type("natural", (x) => isNaturalNumber(x));
we.define.type("natural[]", function (x) {
    if (!Array.isArray(x)) {
        return false;
    } else {
        for (let i = 0; i < x.length; i++) {
            if (!we.check.typeOf(x[i]).is("natural")) {
                return false;
            }
        }
        return true;
    }
});
expect(we.check.typeOf([2, 4, 7.5, 10]).is("natural[]")).toBe(false);
```

## To Do


### Documentation

There is more functionality in We-Assert that I have not documented here yet. I need to add more documentation to this readme document.