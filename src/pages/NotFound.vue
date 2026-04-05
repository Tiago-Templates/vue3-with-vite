<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4 py-12">
        <div class="text-center">
            <!-- Icon -->
            <div class="text-8xl mb-6 animate-bounce" style="animation-duration: 2s">
                🔍
            </div>

            <!-- Title -->
            <h1 class="text-6xl font-bold text-gray-900 mb-2">404</h1>
            <h2 class="text-3xl font-semibold text-gray-700 mb-4">Page Not Found</h2>

            <!-- Message -->
            <p class="text-xl text-gray-600 mb-8 max-w-md">
                Oops! The page you're looking for doesn't exist or has been moved.
            </p>

            <!-- Path Info -->
            <div class="bg-gray-100 border border-gray-300 rounded-lg p-4 mb-8 max-w-md mx-auto text-left">
                <p class="text-sm text-gray-600 mb-2">Requested path:</p>
                <p class="text-sm font-mono text-gray-900 break-all">{{ route.path }}</p>
            </div>

            <!-- Suggestions -->
            <div class="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 max-w-md mx-auto text-left">
                <h3 class="font-semibold text-blue-900 mb-3">What you can do:</h3>
                <ul class="text-blue-800 space-y-2 text-sm">
                    <li>✓ Check if the URL is correct</li>
                    <li>✓ Use the navigation menu to browse pages</li>
                    <li>✓ Search for what you need</li>
                    <li>✓ Contact support if the issue persists</li>
                </ul>
            </div>

            <!-- Actions -->
            <div class="space-y-4">
                <button
                    @click="router.back()"
                    class="inline-block px-8 py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-900 transition-colors"
                >
                    Go Back
                </button>
                <div>
                    <router-link
                        :to="{ name: 'home' }"
                        class="inline-block px-8 py-3 bg-white text-gray-800 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                    >
                        Back to Home
                    </router-link>
                </div>
            </div>

            <!-- Available Routes -->
            <div class="mt-12 text-left bg-white rounded-lg border border-gray-200 p-6 max-w-md mx-auto">
                <h3 class="font-semibold text-gray-900 mb-4">Available Routes:</h3>
                <ul class="space-y-2 text-sm text-gray-700">
                    <li>
                        <router-link :to="{ name: 'home' }" class="text-blue-600 hover:text-blue-700 font-medium">
                            / - Home Page
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'about' }" class="text-blue-600 hover:text-blue-700 font-medium">
                            /about - About Page
                        </router-link>
                    </li>
                    <li>
                        <router-link :to="{ name: 'login' }" class="text-blue-600 hover:text-blue-700 font-medium">
                            /login - Login Page
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>
