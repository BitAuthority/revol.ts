export { Component, ComponentOptions, rerender } from './component/component';
export { onInit, onDestroy } from './component/interfaces';
export { Binding, Singleton } from './injectable';
export { App, IApp } from './app';

import { getComponentByTag, IStaticComponent, Component, componentInstances } from "./component/component";

export default class Revol {
    static createComponent(tag: string, props?, ...children: any[]): RevolElement {
        return new RevolElement(tag, props, children);
    }
}

export class RevolElement {
    constructor(private tag: string, private props: Object = {}, private children?: any[]) { }

    getTag = (): string => this.tag;
    getProps = (): Object => this.props;
    getChildren = (): any[] => this.children;

    render(render: HTMLElement, replace: boolean = false): HTMLElement {
        const el: HTMLElement = document.createElement(this.tag);
        for (let [ name, val ] of Object.entries(this.props || {})) {
            name = escapeHtml(AttributeMapper(name))
        
            if (val === true) {
              el.setAttribute(name, name)
            } else if (val !== false && val != null) {
                el.setAttribute(name, escapeHtml(val))
            } else if (val === false) {
                el.removeAttribute(name)
            }
        }

        if(replace) {
            render.parentNode.replaceChild(el, render);
        } else {
            render.appendChild(el);
        }

        const IComp: IStaticComponent = getComponentByTag(this.getTag());
        if(IComp != null) {
            const comp: Component = new IComp(el, this.getProps());
            if(typeof (comp as any).onInit === 'function') (comp as any).onInit();
            componentInstances.push(comp);
        }

        this.children.forEach(child => {
            if(child instanceof RevolElement) {
                (child as RevolElement).render(el);
            } else if(typeof child === 'string') {
                el.appendChild(document.createTextNode(child));
            }
        });

        return el;
    }
}

const AttributeMapper = val => ({
    tabIndex: 'tabindex',
    className: 'class',
    readOnly: 'readonly'
}[val] || val);

const entityMap = { '&': 'amp', '<': 'lt', '>': 'gt', '"': 'quot', '\'': '#39', '/': '#x2F' }

const escapeHtml = str => String(str).replace(/[&<>"'\/\\]/g, s => `&${entityMap[s]};`)