<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useAuth } from '@/composables/useAuth';

const router = useRouter();
const route = useRoute();
const { login, isLoading, error, clearError } = useAuth();

const email = ref('');
const password = ref('');
const rememberMe = ref(false);

const handleLogin = async () => {
    clearError();

    const success = await login(email.value, password.value, rememberMe.value);

    if (success) {
        const redirect = route.query.redirect as string | undefined;
        router.push(redirect || { name: 'home' });
    }
};

const loginAsUser = async () => {
    email.value = 'user@example.com';
    password.value = 'password';
    clearError();

    const success = await login('user@example.com', 'password', false);

    if (success) {
        router.push({ name: 'home' });
    }
};

const loginAsAdmin = async () => {
    email.value = 'admin@example.com';
    password.value = 'password';
    clearError();

    const success = await login('admin@example.com', 'password', false);

    if (success) {
        router.push({ name: 'home' });
    }
};
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center px-4 py-12">
        <div class="w-full max-w-md">
            <!-- Card -->
            <div class="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
                <!-- Header -->
                <div class="text-center mb-8">
                    <div class="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center text-white text-lg font-bold mx-auto mb-4">
                        V
                    </div>
                    <h1 class="text-2xl font-bold text-gray-900">Welcome Back</h1>
                    <p class="mt-2 text-sm text-gray-600">Sign in to your account</p>
                </div>

                <!-- Error Alert -->
                <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p class="text-sm text-red-700 font-medium">{{ error }}</p>
                </div>

                <!-- Form -->
                <form @submit.prevent="handleLogin" class="space-y-4">
                    <!-- Email -->
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                        <input
                            id="email"
                            v-model="email"
                            type="email"
                            required
                            placeholder="you@example.com"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>

                    <!-- Password -->
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <input
                            id="password"
                            v-model="password"
                            type="password"
                            required
                            placeholder="••••••••"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>

                    <!-- Remember Me -->
                    <div class="flex items-center">
                        <input
                            id="remember"
                            v-model="rememberMe"
                            type="checkbox"
                            class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                        />
                        <label for="remember" class="ml-2 text-sm text-gray-600">Remember me for 24 hours</label>
                    </div>

                    <!-- Submit Button -->
                    <button
                        type="submit"
                        :disabled="isLoading"
                        class="w-full py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors duration-200"
                    >
                        <span v-if="isLoading">Logging in...</span>
                        <span v-else>Sign in</span>
                    </button>
                </form>

                <!-- Divider -->
                <div class="relative my-6">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-300"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-white text-gray-500">Demo accounts</span>
                    </div>
                </div>

                <!-- Quick Login Buttons -->
                <div class="space-y-3">
                    <button
                        @click="loginAsUser"
                        type="button"
                        :disabled="isLoading"
                        class="w-full py-2 px-4 bg-gray-100 text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
                    >
                        Login as User
                    </button>

                    <button
                        @click="loginAsAdmin"
                        type="button"
                        :disabled="isLoading"
                        class="w-full py-2 px-4 bg-gray-100 text-gray-900 text-sm font-medium rounded-lg hover:bg-gray-200 disabled:opacity-50 transition-colors"
                    >
                        Login as Admin
                    </button>
                </div>

                <!-- Footer Link -->
                <p class="mt-6 text-center text-sm text-gray-600">
                    Just want to browse?
                    <router-link :to="{ name: 'home' }" class="font-medium text-blue-600 hover:text-blue-700">Back to home</router-link>
                </p>
            </div>

            <!-- Info Box -->
            <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p class="text-xs text-blue-700 font-medium mb-2">📝 Demo Credentials:</p>
                <p class="text-xs text-blue-600 mb-2"><strong>User:</strong> user@example.com / password</p>
                <p class="text-xs text-blue-600"><strong>Admin:</strong> admin@example.com / password</p>
            </div>
        </div>
    </div>
</template>
