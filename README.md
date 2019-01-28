# We Assert

A very small package for use in internally verifying statements inside scripts and functions---not just black-box checking of outputs.

#Usage

# We Assert

A very small package for use in internally verifying the flow and logic of scripts.

## Usage

The only export from this package is a function called `buildWeAssert` which takes no arguments.  So, for example, to get started you might do something like

```
import WeAssert from "we-assert";
var we = WeAssert.build();
```

The most basic usage is the `that(statement, message)` function.  For example
```
we.assert.that(x < y, "x < y");
```
If the statement evaluates false, the weAssert handler will be called.  The handler should be a function of the form `handler(message`).  To define such a function, we use `we.setHandler` as in this example.
```
we.setHandler(function(message){
    throw new Error(`The following assertion failed: ${message}`);
});
```

We can set the level using any of the following:
`we.setLevel("DEBUG")`, `we.setLevel("WARN")`, or  `we.setLevel("ERROR")`.  The default is "ERROR".  

A specific assertion can be assigned a level using the `atLevel` function as in this example.
```
we.assert.atLevel("WARN").that(statement, message)
```
When using this construction, the *statement* will only be evaluated if the level given ("WARN") is greater than or equal to the threshhold level defined using `weAssert.setLevel`.  The order is `DEBUG` < `WARN` < `ERROR`.  Thus, for example, if we set `weAssert.setLevel("ERROR")` and then execute
```
we.assert.atLevel("WARN").that(false, "test")
```
the handler will not be called and nothing will happen because `WARN` is not greater than or equal to the current level `ERROR`.

### data validators

You can define arbitrary data types so long as you can pass int a function that evaluates boolean to check whether any input passes or fails.

Then use the pattern ``we.assert.typeOf(data).is(_tyepstring_, _message_) to validate a given element _data_.

```
    we.define.type("natural", (x)=>FU.number.isNaturalNumber(x));
    we.assert.typeOf(x).is("natural", "x is a natural");
```
