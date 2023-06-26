import WeAssert from "./we-assert";
describe("we.assert.forXBetween", () => {
    it("passes on simple correct statement", () => {
        const we = WeAssert.build();
        const arr = [2, 18, 92];
        let test = false;
        we.setHandler(() => {
            test = true;
        });
        we.assert.forXBetween(0, arr.length).that("for i in arr: arr[i], true", () => true);
        expect(test).toBe(false);
    });
    test("forXBetween fails on simple false statement", () => {
        const we = WeAssert.build();
        const arr = [2, 9, 92];
        let handlerRan = false;
        we.setHandler(() => {
            handlerRan = true;
        });
        we.assert.forXBetween(0, arr.length).that("for i in arr: i = 9", (i) => { return arr[i] == 9; });
        expect(handlerRan).toBe(true);
    });
});