import Revol from '../src/revol';
import App from '../src/app';
import testComponent from './testComponent';
import { idkComponent } from './idkComponent';

@App({
    root: '#root',
    load: [testComponent, idkComponent],
    bootstrap: <test />
})
export default class RevoltsApp { }
