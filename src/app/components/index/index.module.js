import angular from 'angular';
import { IndexComponent } from './index.component.js';
import { AdvertiseModule } from '../advertise/advertise.module';

export default angular
    .module('app.module.index', [AdvertiseModule])
    .component('index', IndexComponent)
    .name;