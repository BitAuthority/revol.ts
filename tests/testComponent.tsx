import Revol, { RevolElement } from '../src/revol';
import { Component, ComponentOptions, IStaticComponent } from '../src/component/component';

@ComponentOptions({
    elementTag: 'test'
})
export default class testComponent extends Component {
    private idk: string = 'IDK!';
    template(): RevolElement[] {
        return [
            <idk>
                { this.idk }
                <idk />
            </idk>
        ];
    }
}