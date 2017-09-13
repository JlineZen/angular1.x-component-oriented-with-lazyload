export default class AdvertiseService {
    constructor($http, Resource) {
        'ngInject';
        this.$http = $http;
        this.Resource = Resource;
    }

    getAdvertise(params) {
        return this.$http({
            url: this.Resource.API.AD,
            method: 'GET',
            params: params
        });
    }
}