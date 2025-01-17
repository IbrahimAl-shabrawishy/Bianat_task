<template>
    <div class="loader-container">
        <span class="loader flex-col justify-center"></span>
    </div>
</template>

<script>
export default {

};
</script>

<style scoped>
.loader-container {
    position: fixed;
    /* يجعل العنصر ثابتًا بالنسبة للنافذة */
    top: 0;
    left: 0;
    width: 100vw;
    /* عرض الحاوية على كامل الشاشة */
    height: 100vh;
    /* ارتفاع الحاوية على كامل الشاشة */
    display: flex;
    /* لتوسيط العنصر */
    justify-content: center;
    /* توسيط أفقي */
    align-items: center;
    /* توسيط عمودي */
    background-color: rgba(0, 0, 0, 0.5);
    /* لون خلفية شفاف */
    z-index: 9999;
    /* اجعلها فوق باقي العناصر */
}

.loader {
    position: relative;
    font-size: 48px;
    letter-spacing: 2px;
}

.loader:before {
    content: "Loading";
    color: #fff;
}

.loader:after {
    content: "";
    width: 20px;
    height: 20px;
    background-color: #ff3d00;
    border-radius: 50%;
    position: absolute;
    inset: 0;
    margin: auto;
    top: -70px;
    animation: motion 3s ease-in-out infinite;
}

@keyframes motion {

    0%,
    50%,
    100% {
        transform: translateX(0) scale(1);
    }

    25% {
        transform: translateX(-100px) scale(0.3);
    }

    75% {
        transform: translateX(100px) scale(0.3);
    }
}
</style>
