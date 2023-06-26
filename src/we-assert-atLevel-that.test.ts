import WeAssert from "./we-assert";

describe("the we.assert.atLevel[validationLevel].that function", () => {
    it("throws if atLevel passed invalid level", () => {
        const we = WeAssert.build();
        expect(() => {
            we.assert.atLevel("invalid").that("true", true);
        }).toThrow();
    });
    describe("given error handler is not defined", () => {
        it("passes the level ERROR to the default handler along with an ERROR-level fail", (done) => {
            const we = WeAssert.build();
            we.setLevel("DEBUG");
            we.setHandler((message, level) => {
                expect(level).toBe("ERROR");
                done();
            });
            we.assert.atLevel("ERROR").that("false", false);
        });
    });
    describe("given debug handler is not defined", () => {
        it("passes the level DEBUG to the default handler along with a DEBUG-level fail", (done) => {
            const we = WeAssert.build();
            we.setLevel("DEBUG");
            we.setHandler((message, level) => {
                expect(level).toBe("DEBUG");
                done();
            });
            we.assert.atLevel("DEBUG").that("false", false);
        });
    });
    describe("given warn handler is not defined", () => {
        it("passes the level WARN to the default handler along with a WARN-level fail", (done) => {
            const we = WeAssert.build();
            we.setLevel("DEBUG");
            we.setHandler((message, level) => {
                expect(level).toBe("WARN");
                done();
            });
            we.assert.atLevel("WARN").that("false", false);
        });
    });

    describe("for default handler", () => {
        describe("on level DEBUG", () => {
            function getWe () {
                const we = WeAssert.build();
                we.setLevel("DEBUG");
                return we;
            }
            it("fails for false DEBUG statement", () => {
                const we = getWe();
                let resultVal = false;
                we.setHandler(function () {
                    resultVal = true;
                });
                we.setLevel("DEBUG");
                we.assert.atLevel("DEBUG").that("false", false);
                expect(resultVal).toBe(true);
            });
            it("passes for correct DEBUG statement", () => {
                const we = getWe();
                let resultVal = false;
                we.setHandler(function () {
                    resultVal = true;
                });
                we.assert.atLevel("DEBUG").that("true", true);
                expect(resultVal).toBe(false);
            });
            it("fails for false WARN statement", () => {
                const we = getWe();
                let functionRan = false;
                we.setHandler(function () {
                    functionRan = true;
                });
                we.assert.atLevel("WARN").that("false", false);
                expect(functionRan).toBe(true);
            });
            it("passes for correct WARN statement", () => {
                const we = getWe();
                let resultVal = false;
                we.setHandler(function () {
                    resultVal = true;
                });
                we.assert.atLevel("WARN").that("true", true);
                expect(resultVal).toBe(false);
            });
            it("fails for false ERROR statement", () => {
                const we = getWe();
                let resultVal = false;
                we.setHandler(() => {
                    resultVal = true;
                });
                we.assert.atLevel("ERROR").that("false", false);
                expect(resultVal).toBe(true);
            });
            it("passes for correct ERROR statement", () => {
                const we = getWe();
                let resultVal = false;
                we.setHandler(function () {
                    resultVal = true;
                });
                we.assert.atLevel("ERROR").that("true", true);
                expect(resultVal).toBe(false);
            });
            test("fails on false DEBUG-level statement", () => {
                let functionRan = false;
                const we = WeAssert.build();
                we.setLevel("DEBUG");
                we.setHandler(() => {
                    functionRan = true;
                });
                we.assert.atLevel("DEBUG").that("false", false);
                expect(functionRan).toBe(true);
            });
            test("fails on false WARN-level statement", () => {
                let functionRan = false;
                const we = WeAssert.build();
                we.setLevel("DEBUG");
                we.setHandler(() => {
                    functionRan = true;
                });
                we.assert.atLevel("WARN").that("false", false);
                expect(functionRan).toBe(true);
            });
            test("fails on false ERROR-level statement", () => {
                let functionRan = false;
                const we = WeAssert.build();
                we.setLevel("DEBUG");
                we.setHandler(() => {
                    functionRan = true;
                });
                we.assert.atLevel("ERROR").that("false", false);
                expect(functionRan).toBe(true);
            });
            test("does evaluate DEBUG () => boolean", () => {
                const we = WeAssert.build();
                let statementFunctionRan = false;
                we.setHandler(() => {});
                we.setLevel("DEBUG");
                const statementFunction = () => {
                    statementFunctionRan = true;
                    return true;
                };
                we.assert.atLevel("DEBUG").that("false", statementFunction);
                expect(statementFunctionRan).toBe(true);
            });
            test("a DEBUG level () => false is passed to handler", () => {
                const we = WeAssert.build();
                we.setLevel("DEBUG");
                let functionRan = false;
                we.setHandler(() => {
                    functionRan = true;
                });
                we.assert.atLevel("DEBUG").that("false", () => false);
                expect(functionRan).toBe(true);
            });
        });
        describe("on level WARN", () => {
            function getWe () {
                const we = WeAssert.build();
                we.setLevel("WARN");
                return we;
            }
            it("fails for false WARN statement", () => {
                const we = getWe();
                let resultVal = false;
                we.setHandler(function () {
                    resultVal = true;
                });
                we.assert.atLevel("WARN").that("false", false);
                expect(resultVal).toBe(true);
            });
            it("passes for correct WARN statement", () => {
                const we = getWe();
                let resultVal = false;
                we.setHandler(function () {
                    resultVal = true;
                });
                we.assert.atLevel("WARN").that("true", true);
                expect(resultVal).toBe(false);
            });
            it("fails for false ERROR statement", () => {
                const we = getWe();
                let resultVal = false;
                we.setHandler(() => {
                    resultVal = true;
                });
                we.assert.atLevel("ERROR").that("false", false);
                expect(resultVal).toBe(true);
            });
            it("passes for correct ERROR statement", () => {
                const we = getWe();
                let resultVal = false;
                we.setHandler(() => {
                    resultVal = true;
                });
                we.assert.atLevel("ERROR").that("true", true);
                expect(resultVal).toBe(false);
            });
            it("passes for false DEBUG statement", () => {
                const we = getWe();
                let resultVal = false;
                we.setHandler(() => {
                    resultVal = true;
                });
                we.assert.atLevel("DEBUG").that("false", false);
                expect(resultVal).toBe(false);
            });
            test("ignores false DEBUG-level statement", () => {
                let functionRan = false;
                const we = WeAssert.build();
                we.setLevel("WARN");
                we.setHandler(() => {
                    functionRan = true;
                });
                we.assert.atLevel("DEBUG").that("false", false);
                expect(functionRan).toBe(false);
            });
            test("fails on false WARN-level statement", () => {
                let functionRan = false;
                const we = WeAssert.build();
                we.setLevel("WARN");
                we.setHandler(() => {
                    functionRan = true;
                });
                we.assert.atLevel("WARN").that("false", false);
                expect(functionRan).toBe(true);
            });
            test("fails on false ERROR-level statement", () => {
                let functionRan = false;
                const we = WeAssert.build();
                we.setLevel("WARN");
                we.setHandler(() => {
                    functionRan = true;
                });
                we.assert.atLevel("ERROR").that("false", false);
                expect(functionRan).toBe(true);
            });
            test("does not evaluate DEBUG () => boolean", () => {
                const we = WeAssert.build();
                let statementFunctionRan = false;
                we.setHandler(() => {});
                we.setLevel("WARN");
                const statementFunction = () => {
                    statementFunctionRan = true;
                    return true;
                };
                we.assert.atLevel("DEBUG").that("false", statementFunction);
                expect(statementFunctionRan).toBe(false);
            });
            test("does evaluate WARN () => boolean", () => {
                const we = WeAssert.build();
                let statementFunctionRan = false;
                we.setHandler(() => {});
                we.setLevel("WARN");
                const statementFunction = () => {
                    statementFunctionRan = true;
                    return true;
                };
                we.assert.atLevel("WARN").that("false", statementFunction);
                expect(statementFunctionRan).toBe(true);
            });
            test("a WARN level () => false is passed to handler", () => {
                const we = WeAssert.build();
                we.setLevel("WARN");
                let functionRan = false;
                we.setHandler(() => {
                    functionRan = true;
                });
                we.assert.atLevel("WARN").that("false", () => false);
                expect(functionRan).toBe(true);
            });
            test("an ERROR level () => false is passed to handler", () => {
                const we = WeAssert.build();
                we.setLevel("WARN");
                let functionRan = false;
                we.setHandler(() => {
                    functionRan = true;
                });
                we.assert.atLevel("ERROR").that("false", () => false);
                expect(functionRan).toBe(true);
            });
        });
        describe("on level ERROR", () => {
            function getWe () {
                const we = WeAssert.build();
                we.setLevel("ERROR");
                return we;
            }
            it("fails for false ERROR statement", () => {
                const we = getWe();
                let resultVal = false;
                we.setHandler(function () {
                    resultVal = true;
                });
                we.assert.atLevel("ERROR").that("false", false);
                expect(resultVal).toBe(true);
            });
            it("passes on correct ERROR statement", () => {
                let test = false;
                const we = getWe();
                we.setHandler(() => {
                    test = true;
                });
                we.assert.atLevel("ERROR").that("true", true);
                expect(test).toBe(false);
            });
            it("passes on incorrect WARN statement", () => {
                let test = false;
                const we = getWe();
                we.setHandler(() => {
                    test = true;
                });
                we.assert.atLevel("WARN").that("false", false);
                expect(test).toBe(false);
            });
            it("passes on incorrect DEBUG statement", () => {
                let test = false;
                const we = getWe();
                we.setHandler(() => {
                    test = true;
                });
                we.assert.atLevel("DEBUG").that("false", false);
                expect(test).toBe(false);
            });
            test("ignores false DEBUG-level statement", () => {
                let functionRan = false;
                const we = WeAssert.build();
                we.setLevel("ERROR");
                we.setHandler(() => {
                    functionRan = true;
                });
                we.assert.atLevel("DEBUG").that("false", false);
                expect(functionRan).toBe(false);
            });
            test("ignores false WARN-level statement", () => {
                let functionRan = false;
                const we = WeAssert.build();
                we.setLevel("ERROR");
                we.setHandler(() => {
                    functionRan = true;
                });
                we.assert.atLevel("WARN").that("false", false);
                expect(functionRan).toBe(false);
            });
            test("fails on false ERROR-level statement", () => {
                let functionRan = false;
                const we = WeAssert.build();
                we.setLevel("ERROR");
                we.setHandler(() => {
                    functionRan = true;
                });
                we.assert.atLevel("ERROR").that("false", false);
                expect(functionRan).toBe(true);
            });
            test("ignores false DEBUG statement", () => {
                const we = WeAssert.build();
                let resultVal : boolean | undefined = undefined;
                we.setHandler(() => {
                    resultVal = true;
                });
                we.setLevel("ERROR");
                we.assert.atLevel("DEBUG").that("false", false);
                expect(resultVal).toBe(undefined);
            });
            test("ignores false WARN statement", () => {
                const we = WeAssert.build();
                let functionRan = false;
                we.setHandler(() => {
                    functionRan = true;
                });
                we.setLevel("ERROR");
                we.assert.atLevel("WARN").that("false", false);
                expect(functionRan).toBe(false);
            });
            test("does not evaluate WARN () => boolean", () => {
                const we = WeAssert.build();
                let statementFunctionRan = false;
                we.setHandler(() => {});
                we.setLevel("ERROR");
                const statementFunction = () => {
                    statementFunctionRan = true;
                    return true;
                };
                we.assert.atLevel("WARN").that("false", statementFunction);
                expect(statementFunctionRan).toBe(false);
            });
            test("does not evaluate DEBUG () => boolean", () => {
                const we = WeAssert.build();
                let statementFunctionRan = false;
                we.setHandler(() => {});
                we.setLevel("ERROR");
                const statementFunction = () => {
                    statementFunctionRan = true;
                    return true;
                };
                we.assert.atLevel("DEBUG").that("false", statementFunction);
                expect(statementFunctionRan).toBe(false);
            });
            it("evaluates ERROR () => boolean", () => {
                const we = WeAssert.build();
                let statementFunctionRan = false;
                we.setHandler(() => {});
                we.setLevel("ERROR");
                const statementFunction = () => {
                    statementFunctionRan = true;
                    return true;
                };
                we.assert.atLevel("ERROR").that("false", statementFunction);
                expect(statementFunctionRan).toBe(true);
            });
            test("an ERROR level () => false is passed to handler", () => {
                const we = WeAssert.build();
                we.setLevel("ERROR");
                let functionRan = false;
                we.setHandler(() => {
                    functionRan = true;
                });
                we.assert.atLevel("ERROR").that("false", () => false);
                expect(functionRan).toBe(true);
            });
        });
    });

    
    describe("if DEBUG handler defined", () => {
        it("calls debug handler rather than default for failed DEBUG assertion", () => {
            let debugHandlerRan = false;
            let defaultHandlerRan = false;
            const we = WeAssert.build();
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

        it("does not call DEBUG handler if DEBUG-level statement passes", () => {
            let debugHandlerRan = false;
            const we = WeAssert.build();
            we.setLevel("DEBUG");
            we.setDebugHandler(() => {
                debugHandlerRan = true;
            });
            we.assert.atLevel("DEBUG").that("true", true);
            expect(debugHandlerRan).toBe(false);
        });

        it("does not call DEBUG handler if ERROR-level statement fails", () => {
            let debugHandlerRan = false;
            const we = WeAssert.build();
            we.setLevel("DEBUG");
            we.setDebugHandler(() => {
                debugHandlerRan = true;
            });
            we.assert.atLevel("ERROR").that("false", false);
            expect(debugHandlerRan).toBe(false);
        });
        it("does not call DEBUG handler if WARN-level statement fails", () => {
            let debugHandlerRan = false;
            const we = WeAssert.build();
            we.setLevel("DEBUG");
            we.setDebugHandler(() => {
                debugHandlerRan = true;
            });
            we.assert.atLevel("WARN").that("false", false);
            expect(debugHandlerRan).toBe(false);
        });
    });

    describe("if WARN handler defined", () => {
        test("failed WARN assertion calls WARN handler rather than default", () => {
            let warnHandlerRan = false;
            let defaultHandlerRan = false;
            const we = WeAssert.build();
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
            let warnHandlerRan = false;
            const we = WeAssert.build();
            we.setLevel("DEBUG");
            we.setWarnHandler(() => {
                warnHandlerRan = true;
            });
            we.assert.atLevel("WARN").that("true", true);
            expect(warnHandlerRan).toBe(false);
        });
        test("if debug-level statement fails then calls warn handler", () => {
            let warnHandlerRan = false;
            const we = WeAssert.build();
            we.setLevel("DEBUG");
            we.setWarnHandler(() => {
                warnHandlerRan = true;
            });
            we.assert.atLevel("WARN").that("false", false);
            expect(warnHandlerRan).toBe(true);
        });
        test("if error-level statement fails then does not call warn handler", () => {
            let warnHandlerRan = false;
            const we = WeAssert.build();
            we.setLevel("DEBUG");
            we.setWarnHandler(() => {
                warnHandlerRan = true;
            });
            we.assert.atLevel("ERROR").that("false", false);
            expect(warnHandlerRan).toBe(false);
        });
        test("if debug-level statement fails then does not call warn handler", () => {
            let warnHandlerRan = false;
            const we = WeAssert.build();
            we.setLevel("DEBUG");
            we.setWarnHandler(() => {
                warnHandlerRan = true;
            });
            we.assert.atLevel("DEBUG").that("false", false);
            expect(warnHandlerRan).toBe(false);
        });
    });



    describe("if ERROR handler defined", () => {
        test("failed ERROR assertion calls ERROR handler rather than default", () => {
            let errorHandlerRan = false;
            let defaultHandlerRan = false;
            const we = WeAssert.build();
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
            const we = WeAssert.build();
            we.setLevel("DEBUG");
            we.setErrorHandler(() => {
                functionRan = true;
            });
            we.assert.atLevel("ERROR").that("true", true);
            expect(functionRan).toBe(false);
        });
        test("if ERROR-level statement fails then calls ERROR handler", () => {
            let functionRan = false;
            const we = WeAssert.build();
            we.setLevel("DEBUG");
            we.setErrorHandler(() => {
                functionRan = true;
            });
            we.assert.atLevel("ERROR").that("false", false);
            expect(functionRan).toBe(true);
        });
        test("if DEBUG-level statement fails then does not call ERROR handler", () => {
            let functionRan = false;
            const we = WeAssert.build();
            we.setLevel("DEBUG");
            we.setErrorHandler(() => {
                functionRan = true;
            });
            we.assert.atLevel("DEBUG").that("false", false);
            expect(functionRan).toBe(false);
        });
        test("if WARN-level statement fails then does not call ERROR handler", () => {
            let functionRan = false;
            const we = WeAssert.build();
            we.setLevel("DEBUG");
            we.setErrorHandler(() => {
                functionRan = true;
            });
            we.assert.atLevel("WARN").that("false", false);
            expect(functionRan).toBe(false);
        });
    });
});