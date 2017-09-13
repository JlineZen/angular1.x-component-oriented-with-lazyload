export default class ResourceService {
    constructor() {
        this.environment = 'production';
    }

    setEnvironment(options) {
        this.environment = options.environment;
    }

    getApi() {
        return this.environment === 'development' ? {
            AD: 'http://test.s.phone580.com:8000/openapi/fzsad/ads'
        } : {
            AD: 'https://s.phone580.com/openapi/fzsad/ads'
        };
    }

    $get() {
        return {
            API: this.getApi()
        };
    }
}