import WeAssertPackage from "./we-assert";

test("setting level works DEBUG", () => {
    const we = WeAssertPackage.build();
    we.setLevel("DEBUG");
    expect(we.getLevel()).toEqual("DEBUG");
});

describe("for basic handler...", () => {
    test("fails for false DEBUG statement at level DEBUG", () => {
        const we = WeAssertPackage.build();
        let resultVal = false;
        we.setHandler(function () {
            resultVal = true;
        });
        we.setLevel("DEBUG");
        we.assert.atLevel("DEBUG").that("false", false);
        expect(resultVal).toBe(true);
    });
    
    test("fails for false WARN statement at level WARN", () => {
        const we = WeAssertPackage.build();
        let resultVal = false;
        we.setHandler(function () {
            resultVal = true;
        });
        we.setLevel("WARN");
        we.assert.atLevel("WARN").that("false", false);
        expect(resultVal).toBe(true);
    });

    test("fails for false WARN statement at level DEBUG", () => {
        const we = WeAssertPackage.build();
        let functionRan = false;
        we.setHandler(function () {
            functionRan = true;
        });
        we.setLevel("DEBUG");
        we.assert.atLevel("WARN").that("false", false);
        expect(functionRan).toBe(true);
    });
    
    test("fails for false ERROR statement at level ERROR", () => {
        const we = WeAssertPackage.build();
        let resultVal = false;
        we.setHandler(function () {
            resultVal = true;
        });
        we.setLevel("ERROR");
        we.assert.atLevel("ERROR").that("false", false);
        expect(resultVal).toBe(true);
    });
    
    test("fails for false ERROR statement at level DEBUG", () => {
        const we = WeAssertPackage.build();
        let resultVal = false;
        we.setHandler(() => {
            resultVal = true;
        });
        we.setLevel("DEBUG");
        we.assert.atLevel("ERROR").that("false", false);
        expect(resultVal).toBe(true);
    });
    test("fails for false ERROR statement at level WARN", () => {
        const we = WeAssertPackage.build();
        let resultVal = false;
        we.setHandler(() => {
            resultVal = true;
        });
        we.setLevel("WARN");
        we.assert.atLevel("ERROR").that("false", false);
        expect(resultVal).toBe(true);
    });
    test("ignores false DEBUG statement at level ERROR", () => {
        const we = WeAssertPackage.build();
        let resultVal = undefined;
        we.setHandler(() => {
            resultVal = true;
        });
        we.setLevel("ERROR");
        we.assert.atLevel("DEBUG").that("false", false);
        expect(resultVal).toBe(undefined);
    });
    test("ignores false WARN statement at level ERROR", () => {
        const we = WeAssertPackage.build();
        let functionRan = false;
        we.setHandler(() => {
            functionRan = true;
        });
        we.setLevel("ERROR");
        we.assert.atLevel("WARN").that("false", false);
        expect(functionRan).toBe(false);
    });
    describe("at ERROR level", () => {
        test("validation passes on correct assertion", () => {
            let test;
            const we = WeAssertPackage.build();
            we.setLevel("ERROR");
            we.setHandler(() => {
                test = true;
            });
            we.assert.atLevel("ERROR").that("true", true);
            expect(test).toBe(undefined);
        });
        test("validation fails on ERROR-level incorrect assertion", () => {
            let test;
            const we = WeAssertPackage.build();
            we.setHandler(() => {
                test = true;
            });
            we.setLevel("ERROR");
            we.assert.atLevel("ERROR").that("false", false);
            expect(test).toBe(true);
        });
        test("forXBetween passes on simple correct statement", () => {
            const we = WeAssertPackage.build();
            const arr = [2, 18, 92];
            let test;
            we.setHandler(() => {
                test = true;
            });
            we.assert.forXBetween(0, arr.length).that("for i in arr: arr[i], true", () => true);
            expect(test).toBe(undefined);
        });
    });
    test("forXBetween fails on simple false statement", () => {
        const we = WeAssertPackage.build();
        const arr = [2, 9, 92];
        let handlerRan = false;
        we.setHandler(() => {
            handlerRan = true;
        });
        we.assert.forXBetween(0, arr.length).that("for i in arr: i = 9", (i) => { return arr[i] == 9; });
        expect(handlerRan).toBe(true);
    });
});

describe("data type validation", () => {
    test("passes if predicate evaluates true on input", () => {
        const we = WeAssertPackage.build();
        let handlerRan = false;
        we.setHandler(() => {
            handlerRan = true;
        });
        we.define.type("int", () => true);
        const x = 1;
        we.assert.typeOf(x).is("int", "x is an int");
        expect(handlerRan).toBe(false);
    });
    test("data type fails if predicate evaluates false on input", () => {
        const x = 18;
        const we = WeAssertPackage.build();
        let handlerRan = false;
        we.setHandler(() => {
            handlerRan = true;
        });
        we.define.type("int", ()=>false);
        we.assert.typeOf(x).is("int", "x is an int");
        expect(handlerRan).toBe(true);
    });
});

describe("assertion evaluates", () => {
    test("false on false statement", () => {
        const we = WeAssertPackage.build();
        expect(we.assert.that("false", false)).toBe(false);
    });
    test("true on true statement", () => {
        const we = WeAssertPackage.build();
        expect(we.assert.that("true", true)).toBe(true);
    });
});

describe("if DEBUG handler defined", () => {

    test("failed DEBUG assertion calls debug handler rather than default", () => {
        let debugHandlerRan = false;
        let defaultHandlerRan = false;
        const we = WeAssertPackage.build();
        we.setLevel("DEBUG");
        we.setDebugHandler(() => {
            debugHandlerRan = true;
        });
        we.setHandler(() => {
            defaultHandlerRan = true;
        });
        we.assert.atLevel("DEBUG").that("false", false);
        expect(debugHandlerRan).toBe(true);
        expect(defaultHandlerRan).toBe(false);
    });

    test("if DEBUG-level statement passes then DEBUG handler isn't called", () => {
        let functionRan = false;
        const we = WeAssertPackage.build();
        we.setLevel("DEBUG");
        we.setDebugHandler(() => {
            functionRan = true;
        });
        we.assert.atLevel("DEBUG").that("true", true);
        expect(functionRan).toBe(false);
    });
    test("if DEBUG-level statement fails then calls debug handler", () => {
        let functionRan = false;
        const we = WeAssertPackage.build();
        we.setLevel("DEBUG");
        we.setDebugHandler(() => {
            functionRan = true;
        });
        we.assert.atLevel("DEBUG").that("false", false);
        expect(functionRan).toBe(true);
    });
    test("if ERROR-level statement fails then does not call DEBUG handler", () => {
        let functionRan = false;
        const we = WeAssertPackage.build();
        we.setLevel("DEBUG");
        we.setDebugHandler(() => {
            functionRan = true;
        });
        we.assert.atLevel("ERROR").that("false", false);
        expect(functionRan).toBe(false);
    });
    test("if WARN-level statement fails then does not call DEBUG handler", () => {
        let functionRan = false;
        const we = WeAssertPackage.build();
        we.setLevel("DEBUG");
        we.setDebugHandler(() => {
            functionRan = true;
        });
        we.assert.atLevel("WARN").that("false", false);
        expect(functionRan).toBe(false);
    });
});

describe("if WARN handler defined", () => {
    test("failed WARN assertion calls WARN handler rather than default", () => {
        let warnHandlerRan = false;
        let defaultHandlerRan = false;
        const we = WeAssertPackage.build();
        we.setLevel("WARN");
        we.setWarnHandler(() => {
            warnHandlerRan = true;
        });
        we.setHandler(() => {
            defaultHandlerRan = true;
        });
        we.assert.atLevel("WARN").that("false", false);
        expect(warnHandlerRan).toBe(true);
        expect(defaultHandlerRan).toBe(false);
    });

    test("if WARN-level statement passes then WARN handler isn't called", () => {
        let functionRan = false;
        const we = WeAssertPackage.build();
        we.setLevel("DEBUG");
        we.setWarnHandler(() => {
            functionRan = true;
        });
        we.assert.atLevel("WARN").that("true", true);
        expect(functionRan).toBe(false);
    });
    test("if debug-level statement fails then calls warn handler", () => {
        let functionRan = false;
        const we = WeAssertPackage.build();
        we.setLevel("DEBUG");
        we.setWarnHandler(() => {
            functionRan = true;
        });
        we.assert.atLevel("WARN").that("false", false);
        expect(functionRan).toBe(true);
    });
    test("if error-level statement fails then does not call warn handler", () => {
        let functionRan = false;
        const we = WeAssertPackage.build();
        we.setLevel("DEBUG");
        we.setWarnHandler(() => {
            functionRan = true;
        });
        we.assert.atLevel("ERROR").that("false", false);
        expect(functionRan).toBe(false);
    });
    test("if debug-level statement fails then does not call warn handler", () => {
        let functionRan = false;
        const we = WeAssertPackage.build();
        we.setLevel("DEBUG");
        we.setWarnHandler(() => {
            functionRan = true;
        });
        we.assert.atLevel("DEBUG").that("false", false);
        expect(functionRan).toBe(false);
    });
});

describe("if ERROR handler defined", () => {
    test("failed ERROR assertion calls ERROR handler rather than default", () => {
        let errorHandlerRan = false;
        let defaultHandlerRan = false;
        const we = WeAssertPackage.build();
        we.setLevel("ERROR");
        we.setErrorHandler(() => {
            errorHandlerRan = true;
        });
        we.setHandler(() => {
            defaultHandlerRan = true;
        });
        we.assert.atLevel("ERROR").that("false", false);
        expect(errorHandlerRan).toBe(true);
        expect(defaultHandlerRan).toBe(false);
    });
    test("if ERROR-level statement passes then ERROR handler isn't called", () => {
        let functionRan = false;
        const we = WeAssertPackage.build();
        we.setLevel("DEBUG");
        we.setErrorHandler(() => {
            functionRan = true;
        });
        we.assert.atLevel("ERROR").that("true", true);
        expect(functionRan).toBe(false);
    });
    test("if ERROR-level statement fails then calls ERROR handler", () => {
        let functionRan = false;
        const we = WeAssertPackage.build();
        we.setLevel("DEBUG");
        we.setErrorHandler(() => {
            functionRan = true;
        });
        we.assert.atLevel("ERROR").that("false", false);
        expect(functionRan).toBe(true);
    });
    test("if DEBUG-level statement fails then does not call ERROR handler", () => {
        let functionRan = false;
        const we = WeAssertPackage.build();
        we.setLevel("DEBUG");
        we.setErrorHandler(() => {
            functionRan = true;
        });
        we.assert.atLevel("DEBUG").that("false", false);
        expect(functionRan).toBe(false);
    });
    test("if WARN-level statement fails then does not call ERROR handler", () => {
        let functionRan = false;
        const we = WeAssertPackage.build();
        we.setLevel("DEBUG");
        we.setErrorHandler(() => {
            functionRan = true;
        });
        we.assert.atLevel("WARN").that("false", false);
        expect(functionRan).toBe(false);
    });
});
describe("at level DEBUG", () => {

    test("fails on false DEBUG-level statement", () => {
        let functionRan = false;
        const we = WeAssertPackage.build();
        we.setLevel("DEBUG");
        we.setHandler(() => {
            functionRan = true;
        });
        we.assert.atLevel("DEBUG").that("false", false);
        expect(functionRan).toBe(true);
    });
    test("fails on false WARN-level statement", () => {
        let functionRan = false;
        const we = WeAssertPackage.build();
        we.setLevel("DEBUG");
        we.setHandler(() => {
            functionRan = true;
        });
        we.assert.atLevel("WARN").that("false", false);
        expect(functionRan).toBe(true);
    });
    test("fails on false ERROR-level statement", () => {
        let functionRan = false;
        const we = WeAssertPackage.build();
        we.setLevel("DEBUG");
        we.setHandler(() => {
            functionRan = true;
        });
        we.assert.atLevel("ERROR").that("false", false);
        expect(functionRan).toBe(true);
    });
});
describe("at level WARN", () => {

    test("ignores false DEBUG-level statement", () => {
        let functionRan = false;
        const we = WeAssertPackage.build();
        we.setLevel("WARN");
        we.setHandler(() => {
            functionRan = true;
        });
        we.assert.atLevel("DEBUG").that("false", false);
        expect(functionRan).toBe(false);
    });
    test("fails on false WARN-level statement", () => {
        let functionRan = false;
        const we = WeAssertPackage.build();
        we.setLevel("WARN");
        we.setHandler(() => {
            functionRan = true;
        });
        we.assert.atLevel("WARN").that("false", false);
        expect(functionRan).toBe(true);
    });
    test("fails on false ERROR-level statement", () => {
        let functionRan = false;
        const we = WeAssertPackage.build();
        we.setLevel("WARN");
        we.setHandler(() => {
            functionRan = true;
        });
        we.assert.atLevel("ERROR").that("false", false);
        expect(functionRan).toBe(true);
    });
});
describe("at level ERROR", () => {
    test("ignores false DEBUG-level statement", () => {
        let functionRan = false;
        const we = WeAssertPackage.build();
        we.setLevel("ERROR");
        we.setHandler(() => {
            functionRan = true;
        });
        we.assert.atLevel("DEBUG").that("false", false);
        expect(functionRan).toBe(false);
    });
    test("ignores false WARN-level statement", () => {
        let functionRan = false;
        const we = WeAssertPackage.build();
        we.setLevel("ERROR");
        we.setHandler(() => {
            functionRan = true;
        });
        we.assert.atLevel("WARN").that("false", false);
        expect(functionRan).toBe(false);
    });
    test("fails on false ERROR-level statement", () => {
        let functionRan = false;
        const we = WeAssertPackage.build();
        we.setLevel("ERROR");
        we.setHandler(() => {
            functionRan = true;
        });
        we.assert.atLevel("ERROR").that("false", false);
        expect(functionRan).toBe(true);
    });
});