import { IComponentOptions } from './interfaces';
import { RevolElement } from '../revol';

export interface IStaticComponent {
    options: IComponentOptions
    new(): Component;
}

export const components: IStaticComponent[] = [];

export function getComponentByTag(tag: string): IStaticComponent {
    return components.find((comp: IStaticComponent) => comp.options.elementTag.toLowerCase() === tag.toLowerCase());
}

export abstract class Component {
    public static options: IComponentOptions;

    isComponent = (): boolean => true;
    getOptions = (): IComponentOptions => this.constructor['options'];

    abstract template(): RevolElement[];
}

export function ComponentOptions(options: IComponentOptions) {
    return function<T extends IStaticComponent>(constructor: T) {
        constructor.options = options;
        components.push(constructor);
        return constructor;
    }
}