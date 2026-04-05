<script setup lang="ts">
import Header from '@/components/Header.vue';
</script>

<template>
    <div class="min-h-screen bg-gray-50">
        <Header />

        <!-- Router Views -->
        <main>
            <router-view v-slot="{ Component, route }">
                <Transition
                    :key="route.path"
                    name="fade"
                    mode="out-in"
                >
                    <component :is="Component" />
                </Transition>
            </router-view>
        </main>
    </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
