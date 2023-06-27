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