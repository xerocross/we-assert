type JavaScript = { [key: string]: any };
type HandlerFunction = (message:string, level:string, payload?: JavaScript) => void;
type LevelSpecificHandlerFunction = (message:string, payload?: JavaScript) => void;
type EvalFunction = (...args:any) => boolean;
type ValidationData = {
    level:string,
    payload:JavaScript | undefined,
    message:string,
    statement:boolean | (() => boolean)
}
type verifyFunction = (x:any) => boolean;
type prop = [EvalFunction, any[], string];
const validLevels = ["DEBUG", "WARN", "ERROR"];
const levels: JavaScript = {
    0 : validLevels[0],
    1 : validLevels[1],
    2 : validLevels[2]
};
type DataTypes = {
    [key: string] : (arg:any) => boolean
}
const levelStringToInt = function (levelString:string) :number {
    switch (levelString) {
    case "DEBUG":
        return 0;
    case "WARN":
        return 1;
    case "ERROR":
        return 2;
    default:
        throw new Error("we-assert: invalid error level");
    }
};

export default {
    build : function () {
        let currentLevel = 2;
        const propositions :{ [key: string]: prop } = {};
        const types:DataTypes = {};
        const factBase: string[] = [];
        let errorHandler:LevelSpecificHandlerFunction;
        let warnHandler:LevelSpecificHandlerFunction;
        let debugHandler:LevelSpecificHandlerFunction;
        let handler:HandlerFunction = () => {};
        let isLogToConsole = false;


        
        const $that = (args:ValidationData) => {
            const level = levelStringToInt(args.level);
            if (level >= currentLevel) {
                const evaluatedValue = (typeof args.statement === "function") ? args.statement() : args.statement;
                if (!evaluatedValue) {
                    if (isLogToConsole) {
                        console.debug(`failed: "${args.message}"`);
                    }
                    if (args.level == "ERROR") {
                        typeof errorHandler == "function" ? errorHandler(args.message, args.payload) : handler(args.message, args.level, args.payload);
                    } else if (args.level === "WARN") {
                        typeof warnHandler == "function" ? warnHandler(args.message, args.payload) : handler(args.message, args.level, args.payload);
                    } else if (args.level == "DEBUG") {
                        typeof debugHandler == "function" ? debugHandler(args.message, args.payload) : handler(args.message, args.level, args.payload);
                    } else {
                        handler(args.message, args.level, args.payload);
                    }
                    return false;
                } else {
                    if (isLogToConsole) {
                        console.debug(`validated: "${args.message}"`);
                    }
                    return true;
                }
            }
            return true;
        };

        const we = {
            define : {
                type : function (typeName:string, vEval :verifyFunction ) :void {
                    types[typeName] = vEval;
                }
            },
            logToConsole (val:boolean) {
                isLogToConsole = val;
            },
            assume : function (logicSentence:string) :void {
                factBase.push(logicSentence);
            },
            setLevel : function (levelString:string) {
                const newLevel = levelStringToInt(levelString);
                if (newLevel == 0 || newLevel == 1 || newLevel == 2) {
                    currentLevel = newLevel;
                } else {
                    throw new Error("we-assert: invalid error level");
                }
            },
            getLevel : function () :string {
                return levels[currentLevel];
            },
            setHandler : function (newHandler:HandlerFunction) {
                handler = newHandler;
            },
            setErrorHandler : (newHandler:LevelSpecificHandlerFunction) => {
                errorHandler = newHandler;
            },
            setWarnHandler : (newHandler:LevelSpecificHandlerFunction) => {
                warnHandler = newHandler;
            },
            setDebugHandler : (newHandler:LevelSpecificHandlerFunction) => {
                debugHandler = newHandler;
            },
            getProposition : function (symbol:string) {
                return propositions[symbol];
            },
            defineProposition : function (symbol:string, prop:prop) {
                propositions[symbol] = prop;
            },
            check : {
                typeOf : function (data:any) {
                    return {
                        is : function (dataTypeString:string) {
                            if (types[dataTypeString]) {
                                return types[dataTypeString](data);
                            } else {
                                throw new Error("we-assert: typeString is not defined");
                            }
                        }
                    };
                }
            },
            assert : {
                that : function (message:string, statement:boolean, payload?: JavaScript) {
                    console.warn("we-assert: assert.that(...) is deprecated in favor of assert.atLevel[assertionLevel].that(...); in future versions this functionality may be removed.");
                    return $that({
                        statement,
                        message,
                        payload,
                        level : "ERROR"
                    });
                },
                proposition : function (symbol:string, prop:prop) {
                    we.defineProposition(symbol, prop);
                    const propFunction = prop[0];
                    const propArgs = prop[1];
                    const propMessage = prop[2];
                    const truthValue = propFunction(...propArgs);
    
                    if (truthValue) {
                        factBase.push(symbol);
                    }
                    return this.that(propMessage, truthValue);
                },
                forXBetween : function (min:number, max:number) {
                    console.warn("we-assert: assert.forXBetween(...) is deprecated in favor of assert.atLevel[level].that(...); in future versions this functionality may be removed.");
                    const that = this.that;
                    const obj = {
                        that : function (message:string, evalFunction:EvalFunction,) :void {
                            for (let x = min; x < max; x++) {
                                that(message, evalFunction(x));
                            }
                        }
                    };
                    return obj;
                },
                typeOf (data:any) {
                    return {
                        is : (dataType:string, message:string) => {
                            if (types[dataType]) {
                                this.that(message, types[dataType](data));
                            } else {
                                throw new Error("we-assert: undefined type");
                            }
                        }
                    };
                },
                atLevel : function (levelString:string) {
                    if (!validLevels.includes(levelString)) {
                        throw new Error("we-assert: invalid error level");
                    }
                    class AtLevelObject {
                        that (message:string, statement:boolean | EvalFunction, payload? :JavaScript) : boolean {
                            return $that({
                                statement,
                                message,
                                payload,
                                level : levelString
                            });
                        }

                        thatTypeOf (data:any) {
                            return {
                                is (dataType : string) : boolean {
                                    const level = levelStringToInt(levelString);
                                    if (types[dataType]) {
                                        return $that({
                                            statement : () => types[dataType](data),
                                            message : `${data} is of type ${dataType}`,
                                            level : levels[level],
                                            payload : {}
                                        });
                                    } else {
                                        throw new Error("we-assert: undefined type");
                                    }
                                }
                            };
                        }

                        forXBetween (min:number, max:number, payload?:JavaScript) {
                            const obj = {
                                that : function (message:string, evalFunction:EvalFunction,) :void {
                                    const level = levelStringToInt(levelString);
                                    for (let x = min; x < max; x++) {
                                        $that({
                                            message,
                                            statement : evalFunction(x),
                                            payload : payload,
                                            level : levels[level]
                                        });
                                    }
                                }
                            };
                            return obj;
                        }
                    }
                    return new AtLevelObject();
                }
            }
        };
        return we;
    }
};