<template>
    <div>
        <Home />
        <Navbar />
        <main>
            <router-view />
        </main>
        footer
    </div>
</template>

<script>
import Navbar from "../../components/Navbar/Navbar.vue";
import Home from "../../components/Home/Home.vue";

export default {
    name: 'Layout',
    components: {
        Navbar,
        Home
    }
}
</script>

<style></style>