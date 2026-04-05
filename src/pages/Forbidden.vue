<script setup lang="ts">
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-red-50 to-red-100 flex items-center justify-center px-4 py-12">
        <div class="text-center">
            <!-- Icon -->
            <div class="text-8xl mb-6">🚫</div>

            <!-- Title -->
            <h1 class="text-5xl font-bold text-red-900 mb-4">Access Denied</h1>

            <!-- Message -->
            <p class="text-xl text-red-700 mb-8 max-w-md">
                You don't have permission to access this page. Your current role doesn't allow you to view this content.
            </p>

            <!-- Details -->
            <div class="bg-red-100 border border-red-300 rounded-lg p-6 mb-8 max-w-md mx-auto text-left">
                <h2 class="font-semibold text-red-900 mb-3">What happened?</h2>
                <ul class="text-red-800 space-y-2 text-sm">
                    <li>✗ You are not authorized for this action</li>
                    <li>✗ Your role lacks the required permissions</li>
                    <li>✗ This page is restricted to specific users</li>
                </ul>
            </div>

            <!-- Actions -->
            <div class="space-y-4">
                <button
                    @click="$router.back()"
                    class="inline-block px-8 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
                >
                    Go Back
                </button>
                <div>
                    <router-link
                        :to="{ name: 'home' }"
                        class="inline-block px-8 py-3 bg-white text-red-600 font-semibold rounded-lg border border-red-300 hover:bg-red-50 transition-colors"
                    >
                        Back to Home
                    </router-link>
                </div>
            </div>

            <!-- Help Text -->
            <p class="text-red-700 text-sm mt-8 max-w-md mx-auto">
                If you believe this is a mistake, please contact support or try logging in with an admin account.
            </p>
        </div>
    </div>
</template>
