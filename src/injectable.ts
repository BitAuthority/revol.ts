export const injectables: Injectable[] = [];

export enum InjectableType {
    SINGLETON,
    BINDING
}

export interface Injectable {
    name: string;
    data: any;
}

function Injectable(type: InjectableType, name: string) {
    return function<T extends {new(...args:any[]):{}}>(constructor: T) {
        injectables.push({
            name: '@' + name, data: (type == InjectableType.SINGLETON ? new constructor() : constructor)
        });
    }
}

export const Singleton = Injectable.bind(null, InjectableType.SINGLETON);
export const Binding = Injectable.bind(null, InjectableType.BINDING);

export class InjectableArray {
    private deps: any[] = [];
    private func: Function = null;

    constructor(array: any[]) {
        const last: any = array.pop();
        if(typeof last === 'function') {
            this.func = last;
            this.deps = array.map(dep => injectables.find((inj: Injectable) => inj.name === dep).data);
        }
    }

    call: any = () => this.func != null ? this.func.apply(null, this.deps) : null;
}