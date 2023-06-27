import WeAssert from "./we-assert";

describe("we.assert.atLevel[assertionLevel].forXin(...).that", () => {
    describe("for default handler", () => {
        describe("for DEBUG level", () => {
            function getWe () {
                const we = WeAssert.build();
                we.setLevel("DEBUG");
                return we;
            }
            describe("at assertion level DEBUG", () => {
                const assertionLevel = "DEBUG";
                describe("for higher-order eval function", () => {
                    it("evaluates the test boolean", () => {
                        const we = getWe();
                        const testData = [1, "apple", 3];
                        let testFunctionRan = false;
                        const testFunction = () => {
                            testFunctionRan = true;
                            return true;
                        };
                        we.assert.atLevel(assertionLevel).forXin(testData).that("x is a number", () => (testFunction));
                        expect(testFunctionRan).toBe(true);
                    });
                });
                describe("for trivial test", () => {
                    it("fails on false statement", () => {
                        const we = getWe();
                        const testData = [1, "apple", 3];
                        let handlerRan = false;
                        we.setHandler(() => {
                            handlerRan = true;
                        });
                        we.assert.atLevel(assertionLevel).forXin(testData).that("x is a number", () => false);
                        expect(handlerRan).toBe(true);
                    });
                    it("passes on true statement", () => {
                        const we = getWe();
                        const testData = [1, 8, 3];
                        let handlerRan = false;
                        we.setHandler(() => {
                            handlerRan = true;
                        });
                        we.assert.atLevel(assertionLevel).forXin(testData).that("x is a number", () => true);
                        expect(handlerRan).toBe(false);
                    });
                });
            });
            describe("at assertion level WARN", () => {
                const assertionLevel = "WARN";
                describe("for higher-order eval function", () => {
                    it("evaluates the test boolean", () => {
                        const we = getWe();
                        const testData = [1, "apple", 3];
                        let testFunctionRan = false;
                        const testFunction = () => {
                            testFunctionRan = true;
                            return true;
                        };
                        we.assert.atLevel(assertionLevel).forXin(testData).that("x is a number", () => (testFunction));
                        expect(testFunctionRan).toBe(true);
                    });
                });
                describe("for trivial test", () => {
                    it("fails on false statement", () => {
                        const we = getWe();
                        const testData = [1, "apple", 3];
                        let handlerRan = false;
                        we.setHandler(() => {
                            handlerRan = true;
                        });
                        we.assert.atLevel(assertionLevel).forXin(testData).that("x is a number", () => false);
                        expect(handlerRan).toBe(true);
                    });
                    it("passes on true statement", () => {
                        const we = getWe();
                        const testData = [1, 8, 3];
                        let handlerRan = false;
                        we.setHandler(() => {
                            handlerRan = true;
                        });
                        we.assert.atLevel(assertionLevel).forXin(testData).that("x is a number", () => true);
                        expect(handlerRan).toBe(false);
                    });
                });
            });
            describe("at assertion level ERROR", () => {
                const assertionLevel = "ERROR";
                describe("for higher-order eval function", () => {
                    it("evaluates the test boolean", () => {
                        const we = getWe();
                        const testData = [1, "apple", 3];
                        let testFunctionRan = false;
                        const testFunction = () => {
                            testFunctionRan = true;
                            return true;
                        };
                        we.assert.atLevel(assertionLevel).forXin(testData).that("x is a number", () => (testFunction));
                        expect(testFunctionRan).toBe(true);
                    });
                });
                describe("for trivial test", () => {
                    it("fails on false statement", () => {
                        const we = getWe();
                        const testData = [1, "apple", 3];
                        let handlerRan = false;
                        we.setHandler(() => {
                            handlerRan = true;
                        });
                        we.assert.atLevel(assertionLevel).forXin(testData).that("x is a number", () => false);
                        expect(handlerRan).toBe(true);
                    });
                    it("passes on true statement", () => {
                        const we = getWe();
                        const testData = [1, 8, 3];
                        let handlerRan = false;
                        we.setHandler(() => {
                            handlerRan = true;
                        });
                        we.assert.atLevel(assertionLevel).forXin(testData).that("x is a number", () => true);
                        expect(handlerRan).toBe(false);
                    });
                });
            });
        });
        describe("for WARN level", () => {
            function getWe () {
                const we = WeAssert.build();
                we.setLevel("WARN");
                return we;
            }
            describe("at assertion level DEBUG", () => {
                const assertionLevel = "DEBUG";
                describe("for higher-order eval function", () => {
                    it("does not evaluate the test boolean", () => {
                        const we = getWe();
                        const testData = [1, "apple", 3];
                        let testFunctionRan = false;
                        const testFunction = () => {
                            testFunctionRan = true;
                            return true;
                        };
                        we.assert.atLevel(assertionLevel).forXin(testData).that("x is a number", () => (testFunction));
                        expect(testFunctionRan).toBe(false);
                    });
                });
                describe("for trivial test", () => {
                    it("passes on false statement", () => {
                        const we = getWe();
                        const testData = [1, "apple", 3];
                        let handlerRan = false;
                        we.setHandler(() => {
                            handlerRan = true;
                        });
                        we.assert.atLevel(assertionLevel).forXin(testData).that("x is a number", () => false);
                        expect(handlerRan).toBe(false);
                    });
                    it("passes on true statement", () => {
                        const we = getWe();
                        const testData = [1, 8, 3];
                        let handlerRan = false;
                        we.setHandler(() => {
                            handlerRan = true;
                        });
                        we.assert.atLevel(assertionLevel).forXin(testData).that("x is a number", () => true);
                        expect(handlerRan).toBe(false);
                    });
                });
            });
            describe("at assertion level WARN", () => {
                const assertionLevel = "WARN";
                describe("for higher-order eval function", () => {
                    it("evaluates the test boolean", () => {
                        const we = getWe();
                        const testData = [1, "apple", 3];
                        let testFunctionRan = false;
                        const testFunction = () => {
                            testFunctionRan = true;
                            return true;
                        };
                        we.assert.atLevel(assertionLevel).forXin(testData).that("x is a number", () => (testFunction));
                        expect(testFunctionRan).toBe(true);
                    });
                });
                describe("for trivial test", () => {
                    it("fails on false statement", () => {
                        const we = getWe();
                        const testData = [1, "apple", 3];
                        let handlerRan = false;
                        we.setHandler(() => {
                            handlerRan = true;
                        });
                        we.assert.atLevel(assertionLevel).forXin(testData).that("x is a number", () => false);
                        expect(handlerRan).toBe(true);
                    });
                    it("passes on true statement", () => {
                        const we = getWe();
                        const testData = [1, 8, 3];
                        let handlerRan = false;
                        we.setHandler(() => {
                            handlerRan = true;
                        });
                        we.assert.atLevel(assertionLevel).forXin(testData).that("x is a number", () => true);
                        expect(handlerRan).toBe(false);
                    });
                });
            });
            describe("at assertion level ERROR", () => {
                const assertionLevel = "ERROR";
                describe("for higher-order eval function", () => {
                    it("evaluates the test boolean", () => {
                        const we = getWe();
                        const testData = [1, "apple", 3];
                        let testFunctionRan = false;
                        const testFunction = () => {
                            testFunctionRan = true;
                            return true;
                        };
                        we.assert.atLevel(assertionLevel).forXin(testData).that("x is a number", () => (testFunction));
                        expect(testFunctionRan).toBe(true);
                    });
                });
                describe("for trivial test", () => {
                    it("fails on false statement", () => {
                        const we = getWe();
                        const testData = [1, "apple", 3];
                        let handlerRan = false;
                        we.setHandler(() => {
                            handlerRan = true;
                        });
                        we.assert.atLevel(assertionLevel).forXin(testData).that("x is a number", () => false);
                        expect(handlerRan).toBe(true);
                    });
                    it("passes on true statement", () => {
                        const we = getWe();
                        const testData = [1, 8, 3];
                        let handlerRan = false;
                        we.setHandler(() => {
                            handlerRan = true;
                        });
                        we.assert.atLevel(assertionLevel).forXin(testData).that("x is a number", () => true);
                        expect(handlerRan).toBe(false);
                    });
                });
            });
        });
        describe("for ERROR level", () => {
            function getWe () {
                const we = WeAssert.build();
                we.setLevel("ERROR");
                return we;
            }
            describe("at assertion level DEBUG", () => {
                const assertionLevel = "DEBUG";
                describe("for higher-order eval function", () => {
                    it("does not evaluate the test boolean", () => {
                        const we = getWe();
                        const testData = [1, "apple", 3];
                        let testFunctionRan = false;
                        const testFunction = () => {
                            testFunctionRan = true;
                            return true;
                        };
                        we.assert.atLevel(assertionLevel).forXin(testData).that("x is a number", () => (testFunction));
                        expect(testFunctionRan).toBe(false);
                    });
                });
                describe("for trivial test", () => {
                    it("passes on false statement", () => {
                        const we = getWe();
                        const testData = [1, "apple", 3];
                        let handlerRan = false;
                        we.setHandler(() => {
                            handlerRan = true;
                        });
                        we.assert.atLevel(assertionLevel).forXin(testData).that("x is a number", () => false);
                        expect(handlerRan).toBe(false);
                    });
                    it("passes on true statement", () => {
                        const we = getWe();
                        const testData = [1, 8, 3];
                        let handlerRan = false;
                        we.setHandler(() => {
                            handlerRan = true;
                        });
                        we.assert.atLevel(assertionLevel).forXin(testData).that("x is a number", () => true);
                        expect(handlerRan).toBe(false);
                    });
                });
            });
            describe("at assertion level WARN", () => {
                const assertionLevel = "WARN";
                describe("for higher-order eval function", () => {
                    it("does not evaluate the test boolean", () => {
                        const we = getWe();
                        const testData = [1, "apple", 3];
                        let testFunctionRan = false;
                        const testFunction = () => {
                            testFunctionRan = true;
                            return true;
                        };
                        we.assert.atLevel(assertionLevel).forXin(testData).that("x is a number", () => (testFunction));
                        expect(testFunctionRan).toBe(false);
                    });
                });
                describe("for trivial test", () => {
                    it("passes on false statement", () => {
                        const we = getWe();
                        const testData = [1, "apple", 3];
                        let handlerRan = false;
                        we.setHandler(() => {
                            handlerRan = true;
                        });
                        we.assert.atLevel(assertionLevel).forXin(testData).that("x is a number", () => false);
                        expect(handlerRan).toBe(false);
                    });
                    it("passes on true statement", () => {
                        const we = getWe();
                        const testData = [1, 8, 3];
                        let handlerRan = false;
                        we.setHandler(() => {
                            handlerRan = true;
                        });
                        we.assert.atLevel(assertionLevel).forXin(testData).that("x is a number", () => true);
                        expect(handlerRan).toBe(false);
                    });
                });
            });
            describe("at assertion level ERROR", () => {
                const assertionLevel = "ERROR";
                describe("for higher-order eval function", () => {
                    it("evaluates the test boolean", () => {
                        const we = getWe();
                        const testData = [1, "apple", 3];
                        let testFunctionRan = false;
                        const testFunction = () => {
                            testFunctionRan = true;
                            return true;
                        };
                        we.assert.atLevel(assertionLevel).forXin(testData).that("x is a number", () => (testFunction));
                        expect(testFunctionRan).toBe(true);
                    });
                });
                describe("for trivial test", () => {
                    it("fails on false statement", () => {
                        const we = getWe();
                        const testData = [1, "apple", 3];
                        let handlerRan = false;
                        we.setHandler(() => {
                            handlerRan = true;
                        });
                        we.assert.atLevel(assertionLevel).forXin(testData).that("x is a number", () => false);
                        expect(handlerRan).toBe(true);
                    });
                    it("passes on true statement", () => {
                        const we = getWe();
                        const testData = [1, 8, 3];
                        let handlerRan = false;
                        we.setHandler(() => {
                            handlerRan = true;
                        });
                        we.assert.atLevel(assertionLevel).forXin(testData).that("x is a number", () => true);
                        expect(handlerRan).toBe(false);
                    });
                });
            });
        });
    });
    
});