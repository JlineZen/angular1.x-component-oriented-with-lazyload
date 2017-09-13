import Swiper from 'swiper';
import advertise from './advertise.component.html';
import './advertise.component.scss';
import 'swiper.css';

export const advertiseComponent = {
    bindings: {
        adParams: '<'
    },
    template: advertise,
    controller: class AdvertiseComponent {
        constructor(AdvertiseService) {
            'ngInject';
            this.AdvertiseService = AdvertiseService;
        }

        $onInit() {
            this.ads = [];
            this.AdvertiseService.getAdvertise(this.adParams)
                .then((response) => {
                    let data = response.data;
                    if (data.success) {
                        this.processAds(data.valueObject.items);
                    }
                });

        }

        processAds(data) {
            this.ads = data.map((item) => {
                item.content = item.content;
                item.detailUrl = item.detailUrl === 'http://' ? '' : item.detailUrl;
                return item;
            });
        }

        $postLink() {
            if (this.ads.length > 1) {
                this.swiper = new Swiper('.swiper-container', {
                    speed: 400,
                    loop: true,
                    autoplay: 3000,
                    pagination: '.swiper-pagination',
                    autoplayDisableOnInteraction: false
                });
            }
        }

        $onDestroy() {
            this.swiper && this.swiper.destroy();
        }
    }
};