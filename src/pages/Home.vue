<script setup lang="ts">
import { useAuth } from '@/composables/useAuth';
import { useRouter } from 'vue-router';

const { isLoggedIn } = useAuth();
const router = useRouter();
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <!-- Hero Section -->
        <section class="relative px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
            <div class="max-w-7xl mx-auto">
                <!-- Background decoration -->
                <div class="absolute top-0 right-0 -z-10 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30"></div>
                <div class="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-30"></div>

                <div class="text-center mb-16">
                    <div class="inline-block mb-4 px-4 py-2 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        ✨ Powered by Vue Router
                    </div>
                    <h1 class="text-5xl sm:text-6xl font-bold text-gray-900 tracking-tight mb-6">
                        Vue Router SPA
                    </h1>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                        A comprehensive example of Vue Router with authentication, authorization, route guards, and best practices for single-page applications.
                    </p>

                    <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            v-if="!isLoggedIn"
                            @click="router.push({ name: 'login' })"
                            class="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Get Started
                        </button>
                        <button
                            v-else
                            @click="router.push({ name: 'dashboard' })"
                            class="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Go to Dashboard
                        </button>
                        <a
                            href="/@docs"
                            class="px-8 py-3 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                        >
                            📚 View Docs
                        </a>
                    </div>
                </div>

                <!-- Stats -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    <div class="bg-white rounded-xl border border-gray-200 p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                        <div class="text-3xl font-bold text-blue-600 mb-2">6</div>
                        <p class="text-gray-700 font-medium">Route Pages</p>
                        <p class="text-sm text-gray-500 mt-1">Home, About, Dashboard, Admin, Login, 404</p>
                    </div>
                    <div class="bg-white rounded-xl border border-gray-200 p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                        <div class="text-3xl font-bold text-blue-600 mb-2">✅</div>
                        <p class="text-gray-700 font-medium">Auth System</p>
                        <p class="text-sm text-gray-500 mt-1">With localStorage & sessionStorage</p>
                    </div>
                    <div class="bg-white rounded-xl border border-gray-200 p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                        <div class="text-3xl font-bold text-blue-600 mb-2">🛡️</div>
                        <p class="text-gray-700 font-medium">Route Guards</p>
                        <p class="text-sm text-gray-500 mt-1">Authentication & role-based access</p>
                    </div>
                </div>

                <!-- Features Section -->
                <div class="bg-white rounded-2xl border border-gray-200 p-12 shadow-sm">
                    <h2 class="text-3xl font-bold text-gray-900 mb-12 text-center">Features Included</h2>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div class="flex gap-4">
                            <div class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                                1
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-2">Route Configuration</h3>
                                <p class="text-gray-600">Well-structured router with lazy-loaded components and meta data.</p>
                            </div>
                        </div>

                        <div class="flex gap-4">
                            <div class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                                2
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-2">Authentication Guard</h3>
                                <p class="text-gray-600">Route guards that check authentication before allowing access.</p>
                            </div>
                        </div>

                        <div class="flex gap-4">
                            <div class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                                3
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-2">Role-Based Access</h3>
                                <p class="text-gray-600">Authorization based on user roles (user, admin).</p>
                            </div>
                        </div>

                        <div class="flex gap-4">
                            <div class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                                4
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-2">Session Management</h3>
                                <p class="text-gray-600">localStorage and sessionStorage with remember me option.</p>
                            </div>
                        </div>

                        <div class="flex gap-4">
                            <div class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                                5
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-2">useAuth Composable</h3>
                                <p class="text-gray-600">Reactive authentication state with login, logout, and user info.</p>
                            </div>
                        </div>

                        <div class="flex gap-4">
                            <div class="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold">
                                6
                            </div>
                            <div>
                                <h3 class="text-lg font-semibold text-gray-900 mb-2">404 & 403 Pages</h3>
                                <p class="text-gray-600">Friendly error pages for not found and access denied.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
