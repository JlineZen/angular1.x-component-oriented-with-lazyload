import indexTemplate from './index.componnet.html';

export const IndexComponent = {
    template: indexTemplate,
    controller: class IndexComponent {
        $onInit() {
            this.adParams = {
                channel: 0,
                client: 197,
                h: 200,
                model: 2,
                pos: 'FJJHCZZX',
                w: 1080
            };
        }
    }
};