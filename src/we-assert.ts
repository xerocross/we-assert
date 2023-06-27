type JavaScript = { [key: string]: any };
type HandlerFunction = (message:string, level:string, payload?: JavaScript) => void;
type LevelSpecificHandlerFunction = (message:string, payload?: JavaScript) => void;
type EvalFunction = (...args:any) => boolean;
type HigherEvalFunction = (x:any) => EvalFunction
type ValidationData = {
    level:string,
    payload:JavaScript | undefined,
    message:string,
    statement:boolean | (() => boolean)
}

const validLevels = ["DEBUG", "WARN", "ERROR"];
const levels: JavaScript = {
    0 : validLevels[0],
    1 : validLevels[1],
    2 : validLevels[2]
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

const InvalidAssertionLevel = new Error("we-assert: invalid assertion level");

export default {
    build : function () {
        let currentLevel = 2;
        // const types:DataTypes = {};
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
                    } else if (args.level == "WARN") {
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
                    throw InvalidAssertionLevel;
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
            assert : {
                atLevel : function (levelString:string) {
                    if (!validLevels.includes(levelString)) {
                        throw InvalidAssertionLevel;
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
                        forXin (data: any[]) {
                            return {
                                that (message:string, statementFunction : HigherEvalFunction | ((arg:any) => boolean), payload? :JavaScript) : boolean {
                                    const level = levelStringToInt(levelString);
                                    let finalBoolean = true;
                                    for (const x of data) {
                                        const xResult = $that({
                                            statement : statementFunction(x),
                                            message,
                                            level : levels[level],
                                            payload : payload
                                        });
                                        finalBoolean = xResult && finalBoolean;
                                    }
                                    return finalBoolean;
                                }
                            };
                        }
                    }
                    return new AtLevelObject();
                }
            }
        };
        return we;
    }
};