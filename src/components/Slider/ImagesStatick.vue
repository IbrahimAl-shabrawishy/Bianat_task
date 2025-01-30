<template>
    <swiper class="mt-5" :slides-per-view="3" :space-between="20" @swiper="onSwiper" @slideChange="onSlideChange">
        <swiper-slide>
            <img :src="img1" alt="img1" class="carousel-image" />
        </swiper-slide>
        <swiper-slide>
            <img :src="img2" alt="img2" class="carousel-image" />
        </swiper-slide>
        <swiper-slide>
            <img :src="img3" alt="img3" class="carousel-image" />
        </swiper-slide>
    </swiper>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import img1 from '../../assets/wow-amazing-astonished-surprised-redhead-girl-checkingout-holiday-special-promo-woman-stare_1258-143212.jpg';
import img2 from '../../assets/shocked-tensed-redhead-woman-seeing-intense-fight-screen-as-watching-movie-cinema-wear-d-g_1258-126203.jpg';
import img3 from '../../assets/lets-dance-cheerful-carefree-modern-hipster-girl-with-red-curly-hair-freckles-dancing-lift-hand_1258-126221.jpg'
import 'swiper/css';

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        const onSwiper = (swiper) => {
            console.log(swiper);
        };
        const onSlideChange = () => {
            console.log('slide change');
        };
        return {
            onSwiper,
            onSlideChange,
            img1,
            img2,
            img3
        };
    },
};
</script>

<style scoped>
.carousel-image {
    width: 100%;
    height: auto;
    object-fit: cover;
    border-radius: 10px;
}

.swiper-container {
    padding: 20px 0;
}

.swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
