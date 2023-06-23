type JavaScript = { [key: string]: any };
type KeyString = { [key: string]: string };
type HandlerFunction = (message:string, payload?: JavaScript) => void;
type EvalFunction = (...args:any) => boolean;
type ValidationData = {
    level:string,
    payload:JavaScript | undefined,
    message:string,
    statement:boolean
}
type verifyFunction = (x:any) => boolean;
type prop = [EvalFunction, any[], string];

const levels: KeyString = {
    0 : "DEBUG",
    1 : "WARN",
    2 : "ERROR"
};
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
        const types:JavaScript = {};
        const factBase: string[] = [];
        let errorHandler:HandlerFunction;
        let warnHandler:HandlerFunction;
        let debugHandler:HandlerFunction;
        let handler:HandlerFunction = () => {};
        let errorHandlerSet = false;
        let debugHandlerSet = false;
        let warnHandlerSet = false;
        let isLogToConsole = false;

        const $that = (args:ValidationData) => {
            if (!args.statement) {
                if (isLogToConsole) {
                    console.debug(`failed: "${args.message}"`);
                }
                if (args.level == "ERROR") {
                    errorHandlerSet ? errorHandler(args.message, args.payload) : handler(args.message, args.payload);
                } else if (args.level === "WARN") {
                    warnHandlerSet ? warnHandler(args.message, args.payload) : handler(args.message, args.payload);
                } else if (args.level == "DEBUG") {
                    debugHandlerSet ? debugHandler(args.message, args.payload) : handler(args.message, args.payload);
                } else {
                    handler(args.message, args.payload);
                }
            } else {
                if (isLogToConsole) {
                    console.debug(`validated: "${args.message}"`);
                }
            }
            return args.statement;
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
            setErrorHandler : (newHandler:HandlerFunction) => {
                errorHandlerSet = true;
                errorHandler = newHandler;
            },
            setWarnHandler : (newHandler:HandlerFunction) => {
                warnHandlerSet = true;
                warnHandler = newHandler;
            },
            setDebugHandler : (newHandler:HandlerFunction) => {
                debugHandlerSet = true;
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
                    const obj = {
                        that : function (message:string, statement:boolean | EvalFunction, payload? :JavaScript) {
                            const level = levelStringToInt(levelString);
                            if (level >= currentLevel) {
                                const assertionVal : boolean = typeof statement === "function" ? statement() : statement;
                                return $that({
                                    statement : assertionVal,
                                    message,
                                    payload,
                                    level : levels[level]
                                });
                            }
                            return (statement);
                        }
                    };
                    return obj;
                }
            }
        };
        return we;
    }
};