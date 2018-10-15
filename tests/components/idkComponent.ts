import { Component, ComponentOptions } from '../../src/component/component';
import { RevolElement } from '../../src/revol';

@ComponentOptions({
    elementTag: 'idk'
})
export class idkComponent extends Component {
    template(): RevolElement[] {
        return [];
    }
}