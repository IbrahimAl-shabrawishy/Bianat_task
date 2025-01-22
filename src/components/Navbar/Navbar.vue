/** ============================================
table of contents
================================================

1. Navbar using Tailwind
2. javaScript code using vue js
3.CSS code


*/

/* *=======================================
1. Navbar using Tailwind
*========================================== */




<template>
    <div v-if="loading">

        <Loading />


    </div>
    <div class="text-center font-bold">
        <h1>BEST SELLER</h1>
    </div>
    <header class="lg:px-16 px-4 bg-white flex items-center justify-center py-4 shadow-md relative">

        <label for="menu-toggle" class="pointer-cursor md:hidden block absolute left-4">
            <svg class="fill-current text-gray-900" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                viewBox="0 0 20 20">
                <title>menu</title>
                <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
            </svg>
        </label>


        <input class="hidden" type="checkbox" v-model="isMenuOpen" id="menu-toggle" />


        <div :class="{
            'translate-x-0': isMenuOpen,
            '-translate-x-full': !isMenuOpen
        }" class="absolute top-10 left-5 w-full bg-white transform transition-transform duration-300 md:static md:transform-none md:w-auto md:bg-transparent md:z-auto z-10"
            id="menu">
            <nav>
                <ul
                    class="md:flex items-center transition duration-500 ease-in-out justify-center text-sm font-bold text-gray-700 pt-4 md:pt-0">
                    <li><router-link to="/all"
                            class="md:p-4 py-3 px-0 block  hover:underline active decoration-blue-500 decoration-2 ">All</router-link>
                    </li>
                    <li><router-link to="/clothes"
                            class="md:p-4 py-3 px-0 block hover:underline decoration-blue-500 decoration-2">Clothes</router-link>
                    </li>
                    <li><router-link to="/electronics"
                            class="md:p-4 py-3 px-0 block hover:underline decoration-blue-500 decoration-2 ">Electronics</router-link>
                    </li>
                    <li><router-link to="/change"
                            class="md:p-4 py-3 px-0 block md:mb-0 mb-2 hover:underline decoration-blue-500 decoration-2 ">Change
                            Title</router-link>
                    </li>
                    <li><router-link to="/shoes"
                            class="md:p-4 py-3 px-0 block md:mb-0 mb-2 hover:underline decoration-blue-500 decoration-2 ">Shoes</router-link>
                    </li>
                    <li><router-link to="/miscellaneous"
                            class="md:p-4 py-3 px-0 block md:mb-0 mb-2 hover:underline decoration-blue-500 decoration-2 ">Miscellaneous</router-link>
                    </li>
                </ul>
            </nav>
        </div>
    </header>
</template>



/* *=======================================
2. javaScript code using vue js
*========================================== */





<script>
import Loading from '../../components/Loading/Loading.vue';
export default {
    components: {
        Loading
    },
    data() {
        return {
            isMenuOpen: false,
        }
    }
}
</script>



/* *=======================================
3. CSS Code
*========================================== */



<style scoped>
/* mobile menu */
#menu {
    background-color: #ffffff;
    z-index: 99999;
    padding: 10px;

}



#menu.translate-x-0 {
    background-color: #f1f1f1;

}
</style>
