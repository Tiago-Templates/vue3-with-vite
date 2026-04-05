<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const { user, isLoggedIn, logout } = useAuth();
const mobileMenuOpen = ref(false);

const handleLogout = () => {
    logout();
    mobileMenuOpen.value = false;
    router.push({ name: 'login' });
};

const closeMobileMenu = () => {
    mobileMenuOpen.value = false;
};

const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
};
</script>

<template>
    <header class="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Desktop Header -->
            <div class="flex items-center justify-between h-16">
                <!-- Logo/Brand -->
                <router-link
                    :to="{ name: 'home' }"
                    @click="closeMobileMenu"
                    class="flex items-center gap-2 font-bold text-xl text-gray-900 hover:text-blue-600 transition-colors flex-shrink-0"
                >
                    <div class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white text-sm font-bold">
                        V
                    </div>
                    <span class="hidden sm:inline">Vue Router App</span>
                </router-link>

                <!-- Desktop Navigation Links -->
                <nav class="hidden md:flex items-center gap-8">
                    <router-link
                        :to="{ name: 'home' }"
                        active-class="text-blue-600 font-semibold"
                        class="text-gray-700 hover:text-blue-600 transition-colors text-sm"
                    >
                        Home
                    </router-link>

                    <router-link
                        :to="{ name: 'about' }"
                        active-class="text-blue-600 font-semibold"
                        class="text-gray-700 hover:text-blue-600 transition-colors text-sm"
                    >
                        About
                    </router-link>

                    <!-- Protected links - only show if logged in -->
                    <template v-if="isLoggedIn">
                        <router-link
                            :to="{ name: 'dashboard' }"
                            active-class="text-blue-600 font-semibold"
                            class="text-gray-700 hover:text-blue-600 transition-colors text-sm"
                        >
                            Dashboard
                        </router-link>

                        <!-- Admin only -->
                        <router-link
                            v-if="user?.role === 'admin'"
                            :to="{ name: 'admin' }"
                            active-class="text-blue-600 font-semibold"
                            class="text-gray-700 hover:text-blue-600 transition-colors text-sm"
                        >
                            Admin
                        </router-link>
                    </template>
                </nav>

                <!-- Desktop User Section & Mobile Menu Toggle -->
                <div class="flex items-center gap-2 sm:gap-4">
                    <!-- User Info / Logout (Desktop) -->
                    <template v-if="isLoggedIn">
                        <div class="hidden sm:flex items-center gap-3">
                            <div class="text-right">
                                <p class="text-sm font-medium text-gray-900">{{ user?.name }}</p>
                                <p class="text-xs text-gray-500">{{ user?.role }}</p>
                            </div>
                            <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                {{ user?.name?.charAt(0).toUpperCase() }}
                            </div>
                        </div>
                        <button
                            @click="handleLogout"
                            class="hidden sm:block px-3 sm:px-4 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors"
                        >
                            Logout
                        </button>
                    </template>

                    <!-- Login Button (Desktop) -->
                    <template v-else>
                        <router-link
                            :to="{ name: 'login' }"
                            class="hidden sm:block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Login
                        </router-link>
                    </template>

                    <!-- Mobile Menu Toggle -->
                    <button
                        @click="toggleMobileMenu"
                        class="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <!-- Hamburger Icon -->
                        <svg
                            v-if="!mobileMenuOpen"
                            class="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        <!-- Close Icon -->
                        <svg
                            v-else
                            class="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- Mobile Menu -->
            <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="transform opacity-0 -translate-y-2"
                enter-to-class="transform opacity-100 translate-y-0"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="transform opacity-100 translate-y-0"
                leave-to-class="transform opacity-0 -translate-y-2"
            >
                <nav v-if="mobileMenuOpen" class="md:hidden border-t border-gray-200 bg-white py-4 space-y-1">
                    <!-- Mobile Navigation Links -->
                    <router-link
                        :to="{ name: 'home' }"
                        @click="closeMobileMenu"
                        active-class="bg-blue-50 text-blue-600"
                        class="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors first-letter:font-medium rounded-lg"
                    >
                        Home
                    </router-link>

                    <router-link
                        :to="{ name: 'about' }"
                        @click="closeMobileMenu"
                        active-class="bg-blue-50 text-blue-600"
                        class="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors font-medium rounded-lg"
                    >
                        About
                    </router-link>

                    <!-- Protected Mobile Links -->
                    <template v-if="isLoggedIn">
                        <router-link
                            :to="{ name: 'dashboard' }"
                            @click="closeMobileMenu"
                            active-class="bg-blue-50 text-blue-600"
                            class="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors font-medium rounded-lg"
                        >
                            Dashboard
                        </router-link>

                        <router-link
                            v-if="user?.role === 'admin'"
                            :to="{ name: 'admin' }"
                            @click="closeMobileMenu"
                            active-class="bg-blue-50 text-blue-600"
                            class="block px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors font-medium rounded-lg"
                        >
                            Admin
                        </router-link>
                    </template>

                    <!-- Mobile Divider -->
                    <div class="my-2 border-t border-gray-200"></div>

                    <!-- Mobile User Section -->
                    <template v-if="isLoggedIn">
                        <div class="px-4 py-3 bg-gray-50 rounded-lg">
                            <div class="flex items-center gap-3 mb-3">
                                <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                    {{ user?.name?.charAt(0).toUpperCase() }}
                                </div>
                                <div>
                                    <p class="text-sm font-medium text-gray-900">{{ user?.name }}</p>
                                    <p class="text-xs text-gray-500">{{ user?.email }}</p>
                                </div>
                            </div>
                            <button
                                @click="handleLogout"
                                class="w-full px-3 py-2 bg-red-50 text-red-600 text-sm font-medium rounded-lg hover:bg-red-100 transition-colors"
                            >
                                Logout
                            </button>
                        </div>
                    </template>

                    <!-- Mobile Login Button -->
                    <template v-else>
                        <router-link
                            :to="{ name: 'login' }"
                            @click="closeMobileMenu"
                            class="block px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors text-center"
                        >
                            Login
                        </router-link>
                    </template>
                </nav>
            </transition>
        </div>
    </header>
</template>
