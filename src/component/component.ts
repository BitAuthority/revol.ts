import { IComponentOptions } from './interfaces';
import { RevolElement } from '../revol';

export interface IStaticComponent<T = any> {
    options: IComponentOptions
    new(element: HTMLElement, props?: T): Component;
}

export const componentInstances: Component[] = [];

export const components: IStaticComponent[] = [];

export function getComponentByTag(tag: string): IStaticComponent {
    return components.find((comp: IStaticComponent) => comp.options.elementTag.toLowerCase() === tag.toLowerCase());
}

export function getComponentByHTMLElement(element: HTMLElement): Component {
    return componentInstances.find((component: Component) => component.getElement() === element);
}

export abstract class Component<T = any> {
    public static options: IComponentOptions;

    constructor(protected element: HTMLElement, protected props?: T) { }

    isComponent(): boolean { return true; }

    getOptions(): IComponentOptions { return this.constructor['options']; }vbb
    getElement(): HTMLElement { return this.element; }

    rerender() {
        if(!true) {
            console.log(this);
        } else {
            const el: HTMLElement = this.element;
            unmountComponentRecurively(el);
    
            while(el.firstChild) el.removeChild(el.firstChild);
    
            this.template().forEach(child => {
                if(child instanceof RevolElement) {
                    (child as RevolElement).render(el);
                } else if(typeof child === 'string') {
                    el.appendChild(document.createTextNode(child));
                }
            });
        }
    }

    abstract template(): RevolElement[];
}

export function ComponentOptions(options: IComponentOptions) {
    return function<T extends IStaticComponent>(constructor: T) {
        constructor.options = options;
        components.push(constructor);
        return constructor;
    }
}

export function rerender(target: Component, key: string) {
    let _val;
    let changed = false;
    
    const setter = function (this: Component, newVal) {
        _val = newVal
        if(changed) this.rerender();
        if(!changed) changed = true;
    };
    
    Object.defineProperty(target, key, {
        get: () => _val,
        set: setter,
        enumerable: true,
        configurable: true
    });
}

function unmountComponentRecurively(element: Node) {
    for(let i = 0; i < element.childNodes.length; i++) {
        const el: Node = element.childNodes.item(i);
        if(el.childNodes.length > 0) unmountComponentRecurively(el);
        else {
            const comp: Component = getComponentByHTMLElement(el as HTMLElement);
            if(comp != null) {
                if(typeof (comp as any).onDestroy === 'function') (comp as any).onDestroy();

                var index = componentInstances.indexOf(comp);
                if (index !== -1) componentInstances.splice(index, 1);
            }
        }
    }
}