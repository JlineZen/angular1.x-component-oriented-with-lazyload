import angular from 'angular';
import ocLazyLoad from 'ocLazyLoad';
import uiRouter from 'angular-ui-router';
import ResourceModule from './common/resource/resource.module';
import IndexModule from './components/index/index.module';

import './app.scss';

export const AppModule = angular
    .module('app', [uiRouter, ocLazyLoad, IndexModule, ResourceModule])
    .config(($urlRouterProvider, $stateProvider) => {
        'ngInject';
        $urlRouterProvider.otherwise('/index');
        $stateProvider
            .state('index', {
                url: '/index',
                component: 'index'
            })
            .state('faq', {
                url: '/faq',
                component: 'faq',
                resolve: {
                    loadFaqModule: ($q, $ocLazyLoad) => {
                        var deferred = $q.defer();
                        require.ensure([], function(require) {
                            var mod = require('./components/faq/faq.module');
                            $ocLazyLoad.load({
                                name: mod.default.name,
                            });
                            deferred.resolve(mod.default.component);
                        });
                        return deferred.promise;
                    }
                }
            });
    })
    .name;