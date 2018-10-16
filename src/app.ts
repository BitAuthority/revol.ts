import { Injectable, InjectableArray } from "./injectable";
import { Component, getComponentByHTMLElement } from "./component/component";
import { RevolElement } from "./revol";

interface IAppOptions {
    root: string;
    load?: any;
    bootstrap: RevolElement;
}

export interface IApp {
    run(...array: any[]): void;
    injectables: Injectable[];
    render(): void;
}

export function App(options: IAppOptions) {
    return function<T extends {new(...args:any[]):{}}>(constructor: T) {
        return class implements IApp {
            run = (...array: any[]) => new InjectableArray(array).call();
            injectables: Injectable[] = [];

            render = () => {
                const initEl: any = document.querySelector(options.root);
                const root: HTMLElement = initEl instanceof HTMLElement ? initEl : initEl[0];

                const el: HTMLElement = options.bootstrap.render(root, true);
                const comp: Component = getComponentByHTMLElement(el);
                if(comp != null) {
                    comp.template().forEach((child: RevolElement) => child.render(el));
                }
            }
        }
    }
}

export default App;