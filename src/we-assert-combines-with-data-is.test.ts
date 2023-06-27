import WeAssert from "./we-assert";
import DataIs from "@xerocross/data-is";

describe(`we-assert combines with @xerocross/data-is`, () => {
    
    describe(`given a defined data type 'number'`, () => {
        const data = DataIs.build();
        data.define.type("number", (x:any) => typeof x == "number");
        describe(`declaring we.assert.atLevel("ERROR").that(data([data]).is([typeString])`, () => {
            it("calls handler if type doesn't validate", () => {
                const we = WeAssert.build();
                let handlerRan = false;
                we.setHandler(() => {
                    handlerRan = true;
                });
                const invalidTestData = "string";
                we.assert.atLevel("ERROR").that("invalidTestData is a number", data(invalidTestData).is("number"));
                expect(handlerRan).toBeTruthy();
            });
            it("does not call handler if type validates", () => {
                const we = WeAssert.build();
                let handlerRan = false;
                we.setHandler(() => {
                    handlerRan = true;
                });
                const validTestData = 5;
                we.assert.atLevel("ERROR").that("validTestData is a number", data(validTestData).is("number"));
                expect(handlerRan).toBeFalsy();
            });
        });
    });
});
