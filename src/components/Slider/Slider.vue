<template>
    <div class="swiper-container">
        <swiper :slides-per-view="1" :space-between="0" :centeredSlides="true" :loop="true" :navigation="true"
            :modules="[Navigation]">

            <swiper-slide>
                <img :src="slid2" alt="Slide 2" class="carousel-image" />
            </swiper-slide>
            <swiper-slide>
                <img :src="slid1" alt="Slide 1" class="carousel-image" />
            </swiper-slide>

        </swiper>
    </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import slid1 from '../../assets/banner-15.jpg';
import slid2 from '../../assets/banner-25.jpg';

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        return {
            slid1,
            slid2,
            Navigation
        };
    },
};
</script>

<style scoped>
.swiper-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 400px;

    padding: 20px 0;
}


:deep(.swiper-button-prev),
:deep(.swiper-button-next) {
    color: white;
    background-color: blanchedalmond;
    padding: 10px;
    border-radius: 50%;
    transition: 0.3s ease-in-out;
}

:deep(.swiper-button-prev:hover),
:deep(.swiper-button-next:hover) {
    background: rgba(0, 0, 0, 0.8);
}

.carousel-image {
    width: 100%;
    height: 400px;
    background-size: 100%;
    border-radius: 10px;
}
</style>
