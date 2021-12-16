import Engine from "../engine";
declare type OperationHelp = {
    desc: string;
    parms?: string[][];
    [key: string]: any;
};
export declare type OptHistory = {
    lastExecTime: number;
    id: string;
    cooldown: number;
    cooldownAt: number;
};
export declare type Operation = {
    id: string;
    name: string;
    exec: (engine: Engine, operation: Operation, ...args: any[]) => Promise<any>;
    desc?: string;
    isAvailable?: (engine: Engine, operation: Operation) => boolean;
    meta?: any;
    deps?: string[];
    cooldown?: (engine: Engine, operation: Operation) => number;
    help?: (engine: Engine, operation: Operation) => OperationHelp;
};
declare type OperationCallback = (operationResp: any) => void;
export declare class OperationExecutor {
    manager: OperationManager;
    engine: Engine;
    listeners: {
        [id: string]: OperationCallback[];
    };
    constructor(engine: Engine, manager: OperationManager);
    clearCooldown(id: string): Promise<void>;
    cooldown(id: string): Promise<void>;
    availableOperations(): {
        name: string;
        desc?: string | undefined;
        id: string;
        help?: OperationHelp | undefined;
        history?: OptHistory | undefined;
        cooldown: number;
        meta?: any;
    }[];
    on(operationId: string, callback: OperationCallback): void;
    off(operationId: string, callback: OperationCallback): void;
    emit(operationId: string, resp: any): void;
    exec(id: string, ...args: any[]): Promise<any>;
}
declare class OperationManager {
    operations: Operation[];
    constructor();
    findById(id: string): Operation | undefined;
    add(operation: Operation): Operation;
}
export declare const operationManager: OperationManager;
export {};
