import WeAssert from "./we-assert";

describe("the function we.check.typeOf", () => {
    it("evaluates true if the type definition function evals true", () => {
        const we = WeAssert.build();
        we.define.type("number", () => true);
        const x = 5;
        expect(we.check.thatTypeOf(x).is("number")).toBeTruthy();
    });
    it("evaluates false if the type definition function evals false", () => {
        const we = WeAssert.build();
        we.define.type("number", () => false);
        const x = 5;
        expect(we.check.thatTypeOf(x).is("number")).toBeFalsy();
    });
    it("throws if type string is not a defined type", () => {
        const we = WeAssert.build();
        const x = 5;
        expect(() => {
            we.check.thatTypeOf(x).is("number");
        }).toThrow();
    });
});