import RevoltsApp from './main';
import { IApp } from './app';

const rApp: RevoltsApp = new RevoltsApp();
const app: IApp = (rApp as IApp);

app.render();
