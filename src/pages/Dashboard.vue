<script setup lang="ts">
import { computed } from 'vue';
import { useAuth } from '@/composables/useAuth';

const { user } = useAuth();

const sessionInfo = computed(() => {
    if (!user.value) {
        return null;
    }

    return {
        name: user.value.name,
        email: user.value.email,
        role: user.value.role,
        id: user.value.id,
    };
});
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Welcome Card -->
            <div class="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-12 text-white mb-12">
                <h1 class="text-4xl font-bold mb-4">Welcome {{ user?.name }}! 👋</h1>
                <p class="text-blue-100 text-lg">You are viewing the protected dashboard page. Only authenticated users can access this page.</p>
            </div>

            <!-- Dashboard Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <!-- User Info Card -->
                <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h2 class="text-sm font-semibold text-gray-500 uppercase mb-4">Your Profile</h2>
                    <div class="space-y-3">
                        <div>
                            <p class="text-xs text-gray-500">Name</p>
                            <p class="text-lg font-bold text-gray-900">{{ user?.name }}</p>
                        </div>
                        <div>
                            <p class="text-xs text-gray-500">Email</p>
                            <p class="text-lg font-bold text-gray-900">{{ user?.email }}</p>
                        </div>
                        <div>
                            <p class="text-xs text-gray-500">Role</p>
                            <span class="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                                {{ user?.role }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Stats Card 1 -->
                <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h2 class="text-sm font-semibold text-gray-500 uppercase mb-4">Session Type</h2>
                    <div class="text-center py-4">
                        <div class="text-2xl mb-2">🔐</div>
                        <p class="text-lg font-bold text-gray-900 mb-2">Active Session</p>
                        <p class="text-xs text-gray-500">Stored in sessionStorage</p>
                    </div>
                </div>

                <!-- Stats Card 2 -->
                <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h2 class="text-sm font-semibold text-gray-500 uppercase mb-4">Access Level</h2>
                    <div class="text-center py-4">
                        <div class="text-2xl mb-2">✅</div>
                        <p class="text-lg font-bold text-gray-900 mb-2">Authenticated</p>
                        <p class="text-xs text-gray-500">Route guard verified</p>
                    </div>
                </div>
            </div>

            <!-- Session Info -->
            <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-8 mb-12">
                <h2 class="text-xl font-bold text-gray-900 mb-6">Session Information</h2>

                <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <!-- Session Data -->
                    <div>
                        <h3 class="text-sm font-semibold text-gray-700 mb-4">Current User Data</h3>
                        <div class="space-y-2 text-sm font-mono text-gray-700">
                            <div class="flex justify-between">
                                <span class="text-gray-500">ID:</span>
                                <span class="font-semibold">{{ user?.id }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500">Name:</span>
                                <span class="font-semibold">{{ user?.name }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500">Email:</span>
                                <span class="font-semibold">{{ user?.email }}</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="text-gray-500">Role:</span>
                                <span class="font-semibold">{{ user?.role }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Storage Info -->
                    <div>
                        <h3 class="text-sm font-semibold text-gray-700 mb-4">Storage Details</h3>
                        <div class="space-y-2 text-sm text-gray-600">
                            <div class="flex items-center gap-2">
                                <span class="text-green-600 font-bold">✓</span>
                                <span>Session stored in <code class="bg-gray-100 px-1 rounded">sessionStorage</code></span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="text-blue-600 font-bold">ℹ</span>
                                <span>Session cleared on browser close</span>
                            </div>
                            <div class="flex items-center gap-2">
                                <span class="text-blue-600 font-bold">ℹ</span>
                                <span>Use localStorage with remember me</span>
                            </div>
                            <div class="text-xs text-gray-500 mt-4">
                                Open DevTools → Application → Session Storage to inspect
                            </div>
                        </div>
                    </div>
                </div>

                <!-- JSON Display -->
                <div class="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <p class="text-xs font-semibold text-gray-600 mb-2">Raw Session JSON:</p>
                    <pre class="text-xs overflow-auto text-gray-700"><code>{{ JSON.stringify(sessionInfo, null, 2) }}</code></pre>
                </div>
            </div>

            <!-- Route Guards Info -->
            <div class="bg-blue-50 border border-blue-200 rounded-xl p-8">
                <h2 class="text-xl font-bold text-blue-900 mb-4">How Route Guards Work</h2>
                <div class="space-y-4 text-blue-800">
                    <p>
                        <strong>This page is protected</strong> by a route guard defined in <code class="bg-blue-100 px-2 py-1 rounded">src/router/index.ts</code>
                    </p>
                    <ol class="list-decimal list-inside space-y-2 ml-4">
                        <li>Guard checks if user is authenticated before allowing access</li>
                        <li>If not authenticated, redirects to login page with return URL</li>
                        <li>After login, user returns to this protected page</li>
                        <li>Role-based access control prevents unauthorized access</li>
                    </ol>
                    <p class="mt-4 pt-4 border-t border-blue-200">
                        Check the router configuration to see <code class="bg-blue-100 px-2 py-1 rounded">requiresAuth</code> meta field.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
