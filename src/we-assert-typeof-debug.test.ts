import WeAssert from "./we-assert";

describe("for function atLevel([level]).typeOf([data]).is([dataType])", () => {
    describe("with level set to DEBUG", () => {
        const x = "example data";
        const getWe = () => {
            const we = WeAssert.build();
            we.setLevel("DEBUG");
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
                it("does not call error handler on on correct data type", () => {
                    const we = getWe();
                    let errorHandlerRan = false;
                    we.setErrorHandler(() => {
                        errorHandlerRan = true;
                    });
                    we.define.type("number", () => true);
                    we.assert.atLevel(assertionLevel).thatTypeOf(x).is("number");
                    expect(errorHandlerRan).toBe(false);
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
                it("does not call default handler on on correct data type", () => {
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
        describe("with assertion atLevel WARN", () => {
            const assertionLevel = "WARN";
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
            describe("if warn handler is defined", () => {
                it("calls warn handler on incorrect data type", () => {
                    const we = getWe();
                    let warnHandlerRan = false;
                    we.setWarnHandler(() => {
                        warnHandlerRan = true;
                    });
                    we.define.type("number", () => false);
                    we.assert.atLevel(assertionLevel).thatTypeOf(x).is("number");
                    expect(warnHandlerRan).toBe(true);
                });
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
            });
            describe("if warn handler is not defined", () => {
                it("calls default handler on incorrect data type", () => {
                    const we = getWe();
                    let defaultHandlerRan = false;
                    we.setHandler(() => {
                        defaultHandlerRan = true;
                    });
                    we.define.type("number", () => false);
                    we.assert.atLevel(assertionLevel).thatTypeOf(x).is("number");
                    expect(defaultHandlerRan).toBe(true);
                });
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
            });
        });
        describe("with assertion atLevel DEBUG", () => {
            const assertionLevel = "DEBUG";
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
            describe("if debug handler is defined", () => {
                it("calls debug handler on incorrect data type", () => {
                    const we = getWe();
                    let debugHandlerRan = false;
                    we.setDebugHandler(() => {
                        debugHandlerRan = true;
                    });
                    we.define.type("number", () => false);
                    we.assert.atLevel(assertionLevel).thatTypeOf(x).is("number");
                    expect(debugHandlerRan).toBe(true);
                });
                it("does not call warn handler on correct data type", () => {
                    const we = getWe();
                    let debugHandlerRan = false;
                    we.setWarnHandler(() => {
                        debugHandlerRan = true;
                    });
                    we.define.type("number", () => true);
                    we.assert.atLevel(assertionLevel).thatTypeOf(x).is("number");
                    expect(debugHandlerRan).toBe(false);
                });
            });
            describe("if warn handler is not defined", () => {
                it("calls default handler on incorrect data type", () => {
                    const we = getWe();
                    let defaultHandlerRan = false;
                    we.setHandler(() => {
                        defaultHandlerRan = true;
                    });
                    we.define.type("number", () => false);
                    we.assert.atLevel(assertionLevel).thatTypeOf(x).is("number");
                    expect(defaultHandlerRan).toBe(true);
                });
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
            });
        });
    });
});