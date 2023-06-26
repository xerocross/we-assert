import WeAssert from "./we-assert";

describe("globally we.setLevel(...)", () => {
    it("allows you to set level DEBUG", () => {
        const we = WeAssert.build();
        we.setLevel("DEBUG");
        expect(we.getLevel()).toEqual("DEBUG");
    });
    it("allows you to set level WARN", () => {
        const we = WeAssert.build();
        we.setLevel("WARN");
        expect(we.getLevel()).toEqual("WARN");
    });
    it("allows you to set level ERROR", () => {
        const we = WeAssert.build();
        we.setLevel("ERROR");
        expect(we.getLevel()).toEqual("ERROR");
    });
    it("throws if you pass setLevel an invalid level string", () => {
        const we = WeAssert.build();
        expect(() => {
            we.setLevel("invalid");
        }).toThrow();
    });
});
describe("for we.assert.typeOf", () => {
    describe("data type validation", () => {
        test("passes if predicate evaluates true on input", () => {
            const we = WeAssert.build();
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
            const we = WeAssert.build();
            let handlerRan = false;
            we.setHandler(() => {
                handlerRan = true;
            });
            we.define.type("int", ()=>false);
            we.assert.typeOf(x).is("int", "x is an int");
            expect(handlerRan).toBe(true);
        });
    });
});

describe("for we.assert.that", () => {
    describe("assertion evaluates", () => {
        test("false on false statement", () => {
            const we = WeAssert.build();
            expect(we.assert.that("false", false)).toBe(false);
        });
        test("true on true statement", () => {
            const we = WeAssert.build();
            expect(we.assert.that("true", true)).toBe(true);
        });
    });
});