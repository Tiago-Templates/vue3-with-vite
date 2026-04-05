<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div class="bg-white rounded-2xl border border-gray-200 shadow-lg p-12">
                <!-- Breadcrumb -->
                <nav class="mb-8 flex items-center gap-2 text-sm text-gray-600">
                    <button @click="router.go(-1)" class="hover:text-gray-900">← Back</button>
                    <span>/</span>
                    <span class="text-gray-900 font-medium">About</span>
                </nav>

                <!-- Title -->
                <h1 class="text-4xl font-bold text-gray-900 mb-6">About Vue Router</h1>

                <!-- Content -->
                <div class="prose max-w-none space-y-6 text-gray-700">
                    <section>
                        <h2 class="text-2xl font-semibold text-gray-900 mb-4">What is Vue Router?</h2>
                        <p class="text-lg leading-relaxed">
                            Vue Router is the official router for Vue.js. It deeply integrates with Vue.js core to make building single-page applications with Vue.js is easy. Features include:
                        </p>
                        <ul class="list-disc list-inside mt-4 space-y-2 ml-4">
                            <li>Nested route/view mapping</li>
                            <li>Modular, component-based router configuration</li>
                            <li>Route params, query, wildcards</li>
                            <li>View transition effects powered by Vue.js's transition system</li>
                            <li>Fine-grained navigation control</li>
                            <li>Links with automatic active CSS classes</li>
                            <li>HTML5 history mode and hash mode</li>
                        </ul>
                    </section>

                    <section class="pt-6">
                        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Project Structure</h2>
                        <p class="text-lg leading-relaxed mb-4">
                            This application demonstrates best practices for structuring a Vue.js SPA with Vue Router:
                        </p>
                        <pre class="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm"><code>src/
├── router/
│   ├── index.ts        # Router configuration
│   └── guards.ts       # Route guards & middleware
├── pages/              # Page components
│   ├── Home.vue
│   ├── Dashboard.vue
│   └── Login.vue
├── composables/        # Composition API composables
│   └── useAuth.ts      # Authentication composable
├── utils/              # Utility functions
│   └── auth.ts         # Auth service
└── components/
    └── Header.vue      # Navigation header</code></pre>
                    </section>

                    <section class="pt-6">
                        <h2 class="text-2xl font-semibold text-gray-900 mb-4">Key Concepts</h2>

                        <div class="space-y-4">
                            <div class="bg-blue-50 p-4 rounded-lg border border-blue-200">
                                <h3 class="font-semibold text-blue-900 mb-2">Route Guards (Middleware)</h3>
                                <p class="text-blue-800">
                                    Route guards allow you to protect routes from unauthorized access. They run before navigation occurs, allowing you to check authentication status and user permissions.
                                </p>
                            </div>

                            <div class="bg-green-50 p-4 rounded-lg border border-green-200">
                                <h3 class="font-semibold text-green-900 mb-2">Lazy Loading</h3>
                                <p class="text-green-800">
                                    Routes are lazy-loaded using dynamic imports, which reduces the initial bundle size and improves performance.
                                </p>
                            </div>

                            <div class="bg-purple-50 p-4 rounded-lg border border-purple-200">
                                <h3 class="font-semibold text-purple-900 mb-2">Composables</h3>
                                <p class="text-purple-800">
                                    The useAuth composable provides reactive access to authentication state throughout your application without props drilling.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>

                <!-- CTA -->
                <div class="mt-12 pt-8 border-t border-gray-200">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Ready to explore?</h3>
                    <button
                        @click="router.push({ name: 'home' })"
                        class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
