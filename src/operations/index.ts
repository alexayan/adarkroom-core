import Engine from "../engine";
import logger from '../logger';

type OperationHelp =  {desc: string, parms?: string[][], [key: string]: any}

export type OptHistory = {
    lastExecTime: number,
    id: string,
    cooldown: number,
    cooldownAt: number
}

export type Operation = {
    id: string,
    name: string,
    exec: (engine: Engine, operation: Operation, ...args: any[]) => Promise<any>
    desc?: string,
    isAvailable?: (engine: Engine, operation: Operation) => boolean
    meta?: any,
    deps?: string[],
    cooldown?: (engine: Engine, operation: Operation) => number,
    help?: (engine: Engine, operation: Operation) => OperationHelp
}

type OperationCallback = (operationResp: any) => void

export class OperationExecutor {
    manager: OperationManager;
    engine: Engine;
    listeners: {[id: string]: OperationCallback[]};

    constructor(engine: Engine, manager: OperationManager) {
        this.engine = engine;
        this.manager = manager;
        this.listeners = {};
    }

    async clearCooldown(id: string) {
        const opt = this.manager.findById(id);
        if (opt) {
            await this.engine.dispatch(this.engine.actions.operation.clearCooldown(opt.id));
        }
    }

    async cooldown(id: string) {
        const opt = this.manager.findById(id);
        if (opt) {
            await this.engine.dispatch(this.engine.actions.operation.record(opt));
        }
    }

    availableOperations() {
        const rtn = [] as {
            name: string,
            desc?: string,
            id: string,
            help?: OperationHelp,
            history?: OptHistory,
            cooldown: number,
            meta?: any
        }[];
        const state = this.engine.getState();
        this.manager.operations.forEach((opt) => {
            if (!opt.isAvailable || opt.isAvailable(this.engine, opt)) {
                const item = {
                    name: opt.name,
                    id: opt.id,
                } as any
                if (opt.desc) {
                    item.desc = opt.desc;
                }
                if (opt.help) {
                    item.help = opt.help(this.engine, opt)
                }
                item.history = state.operation[opt.id];
                item.cooldown = opt.cooldown ? opt.cooldown(this.engine, opt) : 0
                item.meta = opt.meta;
                rtn.push(item)
            }
        })
        return rtn;
    }

    on(operationId: string, callback: OperationCallback) {
        if (!this.listeners[operationId]) {
            this.listeners[operationId] = [];
        }
        this.listeners[operationId].push(callback);
    }

    off(operationId: string, callback: OperationCallback) {
        if (this.listeners[operationId]) {
            const index = this.listeners[operationId].indexOf(callback);
            if (index > -1) {
                this.listeners[operationId].splice(index, 1);
            }
        }
    }

    emit(operationId: string, resp: any) {
        const listeners = this.listeners[operationId] || [];
        listeners.forEach((callback) => {
            callback(resp);
        })
    }

    async exec(id: string, ...args: any[]) {
        const opt = this.manager.findById(id);
        const state = this.engine.getState();
        if (opt) {
            let optHistory = state.operation[id];
            if (optHistory && opt.cooldown) {
                if (Date.now() <= optHistory.cooldownAt) {
                    return;
                }
            }

            if (opt.isAvailable && !opt.isAvailable(this.engine, opt)) {
                return;
            }

            await this.engine.dispatch(this.engine.actions.operation.record(opt));
            
            logger(`operation ${id} start`, args);

            const resp = await opt.exec(this.engine, opt, ...args);

            this.emit(id, resp);

            logger(`operation ${id} finish`, resp);
            return resp;
        }
    }
}

class OperationManager {
    operations: Operation[];

    constructor() {
        this.operations = [];
    }

    findById(id: string) {
        return this.operations.find((opt) => {
            return opt.id === id;
        })
    }

    add(operation: Operation) {
        const exist = this.findById(operation.id);
        if (exist) {
            return exist;
        }
        this.operations.push(operation);
        return operation;
    }
}

export const operationManager = new OperationManager();