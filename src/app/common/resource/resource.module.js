import angular from 'angular';
import resourceService from './resource.service';

export default angular
    .module('app.module.Resource', [])
    .provider('Resource', resourceService)
    .name;