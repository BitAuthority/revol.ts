import { Injectable, InjectableArray } from "./injectable";
import { IStaticComponent, getComponentByTag, Component } from "./component/component";
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

export default function App(options: IAppOptions) {
    return function<T extends {new(...args:any[]):{}}>(constructor: T) {
        return class implements IApp {
            run = (...array: any[]) => new InjectableArray(array).call();
            injectables: Injectable[] = [];

            render = () => {
                document.body.addEventListener('revol.ComponentCreatedEvent', (event: Event) => {
                    // const el: HTMLElement = (event.target as HTMLElement);
                    // console.log(el.tagName);

                    // TODO: Bind element to component instance
                }, true);

                const initEl: any = document.querySelector(options.root);
                const root: HTMLElement = initEl instanceof HTMLElement ? initEl : initEl[0];

                const el: HTMLElement = options.bootstrap.render(root, true);
                const IComp: IStaticComponent = getComponentByTag(options.bootstrap.getTag());
                    if(IComp != null) {
                        const comp: Component = new IComp();
                        comp.template().forEach((child: RevolElement) => child.render(el));
                    }
            }
        }
    }
}
