export default class Revol {
    static createComponent(tag: string, props?, ...children: any[]): RevolElement {
        return new RevolElement(tag, props, children);
    }
}

export class RevolElement {
    constructor(private tag: string, private props?: any, private children?: any[]) { }

    getTag = (): string => this.tag;
    getProps = (): any => this.props;
    getChildren = (): any[] => this.children;

    render(render: HTMLElement, replace: boolean = false): HTMLElement {
        const el: HTMLElement = document.createElement(this.tag);
        if(replace) {
            render.parentNode.replaceChild(el, render);
        } else {
            render.appendChild(el);
        }
        el.dispatchEvent(new Event('revol.ComponentCreatedEvent'));

        this.children.forEach(child => {
            if(child instanceof RevolElement) {
                (child as RevolElement).render(el);
            } else if(typeof child === 'string') {
                el.appendChild(document.createTextNode(child));
            } else {
                console.log(child);
            }
        });

        return el;
    }
}