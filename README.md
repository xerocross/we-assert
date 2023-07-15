# We-Assert

We-Assert is an assert utility for use in internally verifying statements inside scripts at runtime. One potential goal is to catch what would otherwise be silent errors, or perhaps even
to mathematically prove that an algorithm has functioned as expected.

The tests of this app are the official documentation. Anything documented here in the README might be outdated by accident, but you can run the tests at any time and if the tests pass then they document current usage. Any PR that improves upon the clarity, verbiage, specificity, or exhaustiveness of the tests is welcome.

This project was stale for a long while, but as of June 2023 I have updated it to Version 5, and it is up-to-code. I plan to use it in some of my other projects, so it is likely that I will maintain it better now.

As of version 4, We-Assert has been stripped of Vulcan (https://github.com/RyanMarcus/vulcan), which was packaged with Version 3. The license of We-Assert 4 is the MIT license. What was formerly We-Assert Version 3 is now a new project called We-Assert-Proof, located at https://github.com/xerocross/we-assert-proof. That project is interesting to me, but I find the copyleft license of Vulcan far too restrictive.

## New Stuff

As of V6, the default handler function will now be passed the arguments `(message, assertionLevel, payload)`, which is a breaking change. That is why I have bumped the principal version number. Also, all type checking has been offloaded into a separate project called `@xerocross/data-is`. That package is available publicly.

The function `we.assert.that` is no longer supported as of V6. Use `we.assert.atLevel[assertionLevel].that(...);` instead.

When using the `we.assert.atLevel([level]).that` function, you can now pass
in a function that evaluates boolean to benefit from lazy evaluation, as explained
below. You can also pass in any object as a payload: `we.assert.atLevel("WARN").that("this is true", () => {testThisIsTrue()}, payloadObject`)`.

## Importing

We-Assert is published to NPM as `we-assert`. Standard importing would look like this.
```
import WeAssert from "we-assert"
```


The source code is at https://github.com/xerocross/we-assert.

## Development and Deployment

As of Version 4, we are now using npm to build this project (not yarn, which we used in V2), so to install execute `npm install`.

We-Assert is written in TypeScript.  The package includes a test suite and a script for running it. Use `npm test` to run the test suite, which is written and run using Jest.


## Usage

Below we summarize some of the basic usage. The test suite should be considered the official documentation. Run `npm test` for an exhaustive specification of usage. Any usage not indicated
in the tests may have unexpected results and they are not guaranteed even if documented here in the README.

```
import WeAssert from "we-assert";
var we = WeAssert.build();
```
Here ``we`` is not a singleton.  You can build as many as you want, and each has its own scope and each can be configured independently.

The most basic usage is this: `we.assert.atLevel([assertionLevel]).that(message, statement [, payload])`.  For example
```
we.assert.atLevel("ERROR").that("x < y", x < y);
```
We recommend writing messages that are positive assertions&mdash;not an error message to be thrown upon failure.

If the statement evaluates false, the handler will be called.  The handler should be a function of the form `handler : (message, assertionLevel, [,payload]) => {...}`.  To define such a function, we use `we.setHandler` as in this example.
```
we.setHandler((message, level [,payload]) => {
    throw new Error(`The following assertion failed: ${message}`);
});
```
Note how in the handler we have translated the positive assertion into an error message about exactly which assertion failed.  Of course instead of throwing an error you could just swallow it, or log it, or throw the error and log it.  You get the idea.  We-Assert is agnostic to handling the failure of assertions.  Handle it however you want.   

We can set the level using any of the following:
`we.setLevel("DEBUG")`, `we.setLevel("WARN")`, or  `we.setLevel("ERROR")`.  The default is "ERROR".  

### At Level and Lazy Evaluation

A specific assertion can be assigned a level using the `atLevel` function as in this example.
```
we.assert.atLevel("WARN").that(message, statement);
```

When using atLevel, instead of directly passing a boolean `statement` to be evaluated immediately,
you can pass in a function of the form `() => boolean`, which allows for lazy evaluation.

When using this construction, the *boolean function* will only be evaluated if the level given in the assertion ("WARN") is greater than or equal to the threshhold level defined using `setLevel`.  The order is `DEBUG` < `WARN` < `ERROR`.  Thus, for example, if we set `we.setLevel("ERROR")` and then execute
```
we.assert.atLevel("WARN").that("test", () => statement);
```
then `statement` will not be evaluated and the handler will not be called and nothing will happen because `WARN` is not greater than or equal to the current level `ERROR`.


### handlers and payloads

You can define specific handlers for each level using the methods below.
```
we.setHandler((message, assertionLevel, payload) => {...});
we.setErrorHandler((message, payload) => {...}); 
we.setWarnHandler((message, payload) => {...});
we.setDebugHandler((message, payload) => {...});
```

For any assertion, you can optionally send a payload along with the message. For example:
`we.assert.atLevel("ERROR").that("x < y", x < y, myObj)`. Here `myObj` is any JavaScript object. You can handle the data in your handler method any way you want.


### Data Validators

In previous versions of We-Assert, data validation functionality was built into We-Assert. As of V6, that functionality has been offloaded into a separate package `@xerocross/data-is`. Here is a usage example.

```
import WeAssert from "we-assert";
import DataIs from "@xerocross/data-is";

const we = WeAssert.build();
const data = DataIs.build();
data.define.type("integer", x => integerTestFunction(x));
we.assert.atLevel("ERROR").that("x is an integer", data(x).is("integer"));
```