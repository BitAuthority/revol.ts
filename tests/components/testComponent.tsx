import Revol, { RevolElement } from '../../src/revol';
import { Component, ComponentOptions, rerender } from '../../src/component/component';
import { onInit } from '../../src/component/interfaces';

interface ITestComponentProps {
    text: string;
}

@ComponentOptions({
    elementTag: 'test'
})
export default class testComponent extends Component<ITestComponentProps> implements onInit {
    @rerender
    private idk: string = 'IDK!';

    template(): RevolElement[] {
        return [
            <idk>
                { this.props ?  this.props.text : 'textless' }<br />
                { this.idk }
            </idk>
        ];
    }

    onInit() {
        for(let i = 1; i <= 10; i++) setTimeout(() => this.idk = 'Rerender ' + i + '!', i*1000);
    }
}