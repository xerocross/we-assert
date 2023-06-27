import WeAssert from "./we-assert";

describe("the assert object", () => {
    it("has method atLevel", () => {
        const we = WeAssert.build();
        expect(typeof we.assert.atLevel).toBe("function");
    });
    describe("method atLevel", () => {
        it("accepts value DEBUG", () => {
            const we = WeAssert.build();
            expect(() => {
                we.assert.atLevel("DEBUG");
            }).not.toThrow();
        });
        it("accepts value WARN", () => {
            const we = WeAssert.build();
            expect(() => {
                we.assert.atLevel("WARN");
            }).not.toThrow();
        });
        it("accepts value ERROR", () => {
            const we = WeAssert.build();
            expect(() => {
                we.assert.atLevel("ERROR");
            }).not.toThrow();
        });
        it("throws on other value", () => {
            const we = WeAssert.build();
            expect(() => {
                we.assert.atLevel("invalid");
            }).toThrow();
        });
        describe("for input DEBUG, WARN, or ERROR", () => {
            it("returns an object with method 'that'", () => {
                const we = WeAssert.build();
                expect(typeof we.assert.atLevel("DEBUG").that).toBe("function");
                expect(typeof we.assert.atLevel("WARN").that).toBe("function");
                expect(typeof we.assert.atLevel("ERROR").that).toBe("function");
            });
            describe("the 'that' function of the returned object", () => {
                it(`accepts input of the form (message, statement, payload)`, () => {
                    const we = WeAssert.build();
                    expect(() => {
                        we.assert.atLevel("ERROR").that("true", true, {});
                        we.assert.atLevel("WARN").that("true", true, {});
                        we.assert.atLevel("DEBUG").that("true", true, {});
                    }).not.toThrow();
                });
                it(`accepts input of the form (message, () => boolean, payload)`, () => {
                    const we = WeAssert.build();
                    expect(() => {
                        we.assert.atLevel("ERROR").that("true", () => true, {});
                        we.assert.atLevel("WARN").that("true", () => true, {});
                        we.assert.atLevel("DEBUG").that("true", () => true, {});
                    }).not.toThrow();
                });
                
            });
        });
        /*
        * See we-assert-atLevel-that.test.ts for exhaustive test of different
        * input cases. The case below is intended to illustrate basic usage
        * of the 'that' method
        */
        describe("'that' method", () => {
            describe("if only default handler is defined", () => {
                it("passes message, level, and payload into the handler if assertion fails", (done) => {
                    const we = WeAssert.build();
                    we.setLevel("DEBUG");
                    we.setHandler((message, level, payload) => {
                        expect(message).toBe("myMessage");
                        expect(level).toBe("DEBUG");
                        expect(payload && payload[1]).toBe("apple");
                        done();
                    });
                    we.assert.atLevel("DEBUG").that("myMessage", false, {1 : "apple"});
                });
            });
            describe("if error handler is defined", () => {
                it("passes message, payload into the error handler if error assertion fails", (done) => {
                    const we = WeAssert.build();
                    we.setLevel("ERROR");
                    we.setErrorHandler((message, payload) => {
                        expect(message).toBe("myMessage");
                        expect(payload && payload[1]).toBe("apple");
                        done();
                    });
                    we.assert.atLevel("ERROR").that("myMessage", false, {1 : "apple"});
                });
                it("does not call the default handler", () => {
                    const we = WeAssert.build();
                    we.setLevel("ERROR");
                    let defaultHandlerRan = false;
                    we.setHandler(() => {
                        defaultHandlerRan = true;
                    });
                    we.setErrorHandler(() => {});
                    we.assert.atLevel("ERROR").that("myMessage", false, {1 : "apple"});
                    expect(defaultHandlerRan).toBe(false);
                });
            });
            describe("if warn handler is defined", () => {
                it("passes message, payload into the debug handler if debug assertion fails", (done) => {
                    const we = WeAssert.build();
                    we.setLevel("DEBUG");
                    let defaultHandlerRan = false;
                    we.setHandler(() => {
                        defaultHandlerRan = true;
                    });
                    we.setWarnHandler((message, payload) => {
                        expect(message).toBe("myMessage");
                        expect(payload && payload[1]).toBe("apple");
                        done();
                    });
                    we.assert.atLevel("WARN").that("myMessage", false, {1 : "apple"});
                    expect(defaultHandlerRan).toBe(false);
                });
                it("does not call the default handler", () => {
                    const we = WeAssert.build();
                    we.setLevel("ERROR");
                    let defaultHandlerRan = false;
                    we.setHandler(() => {
                        defaultHandlerRan = true;
                    });
                    we.setWarnHandler(() => {});
                    we.assert.atLevel("WARN").that("myMessage", false, {1 : "apple"});
                    expect(defaultHandlerRan).toBe(false);
                });
            });
            describe("if debug handler is defined", () => {
                it("passes message, payload into the debug handler if debug assertion fails", (done) => {
                    const we = WeAssert.build();
                    we.setLevel("DEBUG");
                    let defaultHandlerRan = false;
                    we.setHandler(() => {
                        defaultHandlerRan = true;
                    });
                    we.setDebugHandler((message, payload) => {
                        expect(message).toBe("myMessage");
                        expect(payload && payload[1]).toBe("apple");
                        done();
                    });
                    we.assert.atLevel("DEBUG").that("myMessage", false, {1 : "apple"});
                    expect(defaultHandlerRan).toBe(false);
                });
                it("does not call the default handler", () => {
                    const we = WeAssert.build();
                    we.setLevel("ERROR");
                    let defaultHandlerRan = false;
                    we.setHandler(() => {
                        defaultHandlerRan = true;
                    });
                    we.setDebugHandler(() => {});
                    we.assert.atLevel("DEBUG").that("myMessage", false, {1 : "apple"});
                    expect(defaultHandlerRan).toBe(false);
                });
            });
        });
        

    });
});