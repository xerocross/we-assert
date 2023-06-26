import WeAssert from "./we-assert";

describe("for function atLevel([level]).typeOf([data]).is([dataType])", () => {
    describe("with we level set to ERROR", () => {
        const x = "example data";
        const getWe = () => {
            const we = WeAssert.build();
            we.setLevel("ERROR");
            return we;
        };
        describe("with assertion atLevel ERROR", () => {
            const assertionLevel = "ERROR";
            it("evaluates to value of assertion if true", () => {
                const we = getWe();
                we.define.type("number", () => true);
                const resultVal = we.assert.atLevel(assertionLevel).thatTypeOf(x).is("number");
                expect(resultVal).toBe(true);
            });
            it("evaluates to value of assertion if false", () => {
                const we = getWe();
                we.define.type("number", () => false);
                const resultVal = we.assert.atLevel(assertionLevel).thatTypeOf(x).is("number");
                expect(resultVal).toBe(false);
            });
            describe("if error handler is defined", () => {
                it("calls error handler on on incorrect data type", () => {
                    const we = getWe();
                    let errorHandlerRan = false;
                    we.setErrorHandler(() => {
                        errorHandlerRan = true;
                    });
                    we.define.type("number", () => false);
                    we.assert.atLevel(assertionLevel).thatTypeOf(x).is("number");
                    expect(errorHandlerRan).toBe(true);
                });
                it("does not call error handler on correct data type", () => {
                    const we = getWe();
                    let errorHandlerRan = false;
                    we.setErrorHandler(() => {
                        errorHandlerRan = true;
                    });
                    we.define.type("number", () => true);
                    we.assert.atLevel(assertionLevel).thatTypeOf(x).is("number");
                    expect(errorHandlerRan).toBe(false);
                });
                it("does not call default handler on incorrect data type", () => {
                    const we = getWe();
                    let defaultHandlerRan = false;
                    we.setHandler(() => {
                        defaultHandlerRan = true;
                    });
                    we.setErrorHandler(() => {});
                    we.define.type("number", () => false);
                    we.assert.atLevel(assertionLevel).thatTypeOf(x).is("number");
                    expect(defaultHandlerRan).toBe(false);
                });
            });
            describe("if error handler is not defined", () => {
                it("calls default handler on on incorrect data type", () => {
                    const we = getWe();
                    let defaultHandlerRan = false;
                    we.setHandler(() => {
                        defaultHandlerRan = true;
                    });
                    we.define.type("number", () => false);
                    we.assert.atLevel(assertionLevel).thatTypeOf(x).is("number");
                    expect(defaultHandlerRan).toBe(true);
                });
                it("does not call handler on correct data type", () => {
                    const we = getWe();
                    let defaultHandlerRan = false;
                    we.setHandler(() => {
                        defaultHandlerRan = true;
                    });
                    we.define.type("number", () => true);
                    we.assert.atLevel(assertionLevel).thatTypeOf(x).is("number");
                    expect(defaultHandlerRan).toBe(false);
                });
            });
            
        });
        describe("for an assertion at level warn", () => {
            const assertionLevel = "WARN";
            it("evaluates true if assertion true", () => {
                const we = getWe();
                we.define.type("number", () => true);
                const resultVal = we.assert.atLevel(assertionLevel).thatTypeOf(x).is("number");
                expect(resultVal).toBe(true);
            });
            it("evaluates true if assertion false", () => {
                const we = getWe();
                we.define.type("number", () => false);
                const resultVal = we.assert.atLevel(assertionLevel).thatTypeOf(x).is("number");
                expect(resultVal).toBe(true);
            });
            it("assertion returns true", () => {
                const we = getWe();
                we.setHandler(() => {});
                we.define.type("number", () => false);
                const assertionValue = we.assert.atLevel(assertionLevel).thatTypeOf(x).is("number");
                expect(assertionValue).toBe(true);
            });
            describe("with warn handler not defined", () => {
                it("does not call warn handler on correct data type", () => {
                    const we = getWe();
                    let defaultHandlerRan = false;
                    we.setHandler(() => {
                        defaultHandlerRan = true;
                    });
                    we.define.type("number", () => true);
                    we.assert.atLevel(assertionLevel).thatTypeOf(x).is("number");
                    expect(defaultHandlerRan).toBe(false);
                });
                it("does not call warn handler on incorrect data type", () => {
                    const we = getWe();
                    let defaultHandlerRan = false;
                    we.setHandler(() => {
                        defaultHandlerRan = true;
                    });
                    we.define.type("number", () => false);
                    we.assert.atLevel(assertionLevel).thatTypeOf(x).is("number");
                    expect(defaultHandlerRan).toBe(false);
                });
            });
            describe("with warn handler defined", () => {
                it("does not call warn handler on correct data type", () => {
                    const we = getWe();
                    let warnHandlerRan = false;
                    we.setWarnHandler(() => {
                        warnHandlerRan = true;
                    });
                    we.define.type("number", () => true);
                    we.assert.atLevel(assertionLevel).thatTypeOf(x).is("number");
                    expect(warnHandlerRan).toBe(false);
                });
                it("does not call warn handler on incorrect data type", () => {
                    const we = getWe();
                    let warnHandlerRan = false;
                    we.setWarnHandler(() => {
                        warnHandlerRan = true;
                    });
                    we.define.type("number", () => false);
                    we.assert.atLevel(assertionLevel).thatTypeOf(x).is("number");
                    expect(warnHandlerRan).toBe(false);
                });
            });
            it("does not execute the data definition predicate", () => {
                const we = getWe();
                let definitionFunctionRan = false;
                we.setHandler(() => {
                });
                const isType = () => {
                    definitionFunctionRan = true;
                    return true;
                };
                we.define.type("number", isType);
                we.assert.atLevel(assertionLevel).thatTypeOf(x).is("number");
                expect(definitionFunctionRan).toBe(false);
            });
        });
        describe("for an assertion at level debug", () => {
            const assertionLevel = "DEBUG";
            it("evaluates true if assertion true", () => {
                const we = getWe();
                we.define.type("number", () => true);
                const resultVal = we.assert.atLevel(assertionLevel).thatTypeOf(x).is("number");
                expect(resultVal).toBe(true);
            });
            it("evaluates true if assertion false", () => {
                const we = getWe();
                we.define.type("number", () => false);
                const resultVal = we.assert.atLevel(assertionLevel).thatTypeOf(x).is("number");
                expect(resultVal).toBe(true);
            });
            it("assertion returns true", () => {
                const we = getWe();
                we.setHandler(() => {});
                we.define.type("number", () => false);
                const test = we.assert.atLevel(assertionLevel).thatTypeOf(x).is("number");
                expect(test).toBe(true);
            });
            describe("with debug handler not defined", () => {
                it("does not call default handler on correct data type", () => {
                    const we = getWe();
                    let defaultHandlerRan = false;
                    we.setHandler(() => {
                        defaultHandlerRan = true;
                    });
                    we.define.type("number", () => true);
                    we.assert.atLevel(assertionLevel).thatTypeOf(x).is("number");
                    expect(defaultHandlerRan).toBe(false);
                });
                it("does not call default handler on incorrect data type", () => {
                    const we = getWe();
                    let defaultHandlerRan = false;
                    we.setHandler(() => {
                        defaultHandlerRan = true;
                    });
                    we.define.type("number", () => false);
                    we.assert.atLevel(assertionLevel).thatTypeOf(x).is("number");
                    expect(defaultHandlerRan).toBe(false);
                });
            });
            describe("with debug handler defined", () => {
                it("does not call debug handler on correct data type", () => {
                    const we = getWe();
                    let debugHandlerRan = false;
                    we.setDebugHandler(() => {
                        debugHandlerRan = true;
                    });
                    we.define.type("number", () => true);
                    we.assert.atLevel(assertionLevel).thatTypeOf(x).is("number");
                    expect(debugHandlerRan).toBe(false);
                });
                it("does not call debug handler on incorrect data type", () => {
                    const we = getWe();
                    let debugHandlerRan = false;
                    we.setDebugHandler(() => {
                        debugHandlerRan = true;
                    });
                    we.define.type("number", () => false);
                    we.assert.atLevel(assertionLevel).thatTypeOf(x).is("number");
                    expect(debugHandlerRan).toBe(false);
                });
            });
            it("does not execute the data definition predicate", () => {
                const we = getWe();
                let definitionFunctionRan = false;
                we.setHandler(() => {
                });
                const isType = () => {
                    definitionFunctionRan = true;
                    return true;
                };
                we.define.type("number", isType);
                we.assert.atLevel(assertionLevel).thatTypeOf(x).is("number");
                expect(definitionFunctionRan).toBe(false);
            });
        });
    });
});