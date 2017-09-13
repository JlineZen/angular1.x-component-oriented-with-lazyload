import angular from 'angular';
import UtilService from './util.service';

export const UtilModule = angular
    .module('app.util.module', [])
    .service('UtilService', UtilService)
    .name;