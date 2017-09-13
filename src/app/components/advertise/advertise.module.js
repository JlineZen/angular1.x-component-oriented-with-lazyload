import angular from 'angular';
import advertiseService from './advertise.services';
import { advertiseComponent } from './advertise.component';

export const AdvertiseModule = angular
    .module('app.module.advertise', [])
    .service('AdvertiseService', advertiseService)
    .component('adBanner', advertiseComponent)
    .name;