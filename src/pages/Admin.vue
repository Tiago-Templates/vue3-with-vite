<script setup lang="ts">
import { useAuth } from '@/composables/useAuth';

const { user } = useAuth();
</script>

<template>
    <div class="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100 py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Welcome Card -->
            <div class="bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl shadow-lg p-12 text-white mb-12">
                <div class="flex items-center gap-4 mb-4">
                    <span class="text-4xl">👑</span>
                    <h1 class="text-4xl font-bold">Admin Panel</h1>
                </div>
                <p class="text-purple-100 text-lg">Welcome {{ user?.name }}! Only administrators can access this page.</p>
            </div>

            <!-- Info Alert -->
            <div class="bg-yellow-50 border border-yellow-300 rounded-xl p-6 mb-12">
                <div class="flex gap-3">
                    <span class="text-2xl">⚠️</span>
                    <div>
                        <h3 class="font-bold text-yellow-900 mb-2">Admin Role Required</h3>
                        <p class="text-yellow-800">
                            This page is only accessible to users with the <code class="bg-yellow-100 px-2 py-1 rounded">admin</code> role.
                            Try logging in with: <strong>admin@example.com</strong>
                        </p>
                    </div>
                </div>
            </div>

            <!-- Admin Dashboard Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <div class="text-2xl mb-2">👥</div>
                    <p class="text-gray-500 text-sm mb-2">Total Users</p>
                    <p class="text-3xl font-bold text-gray-900">1,234</p>
                </div>
                <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <div class="text-2xl mb-2">📊</div>
                    <p class="text-gray-500 text-sm mb-2">Active Sessions</p>
                    <p class="text-3xl font-bold text-gray-900">456</p>
                </div>
                <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <div class="text-2xl mb-2">💰</div>
                    <p class="text-gray-500 text-sm mb-2">Revenue</p>
                    <p class="text-3xl font-bold text-gray-900">€84K</p>
                </div>
                <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <div class="text-2xl mb-2">⭐</div>
                    <p class="text-gray-500 text-sm mb-2">Rating</p>
                    <p class="text-3xl font-bold text-gray-900">4.8</p>
                </div>
            </div>

            <!-- Admin Features -->
            <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-8 mb-12">
                <h2 class="text-2xl font-bold text-gray-900 mb-8">Admin Features</h2>
                <div class="space-y-4">
                    <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                        <span class="text-2xl">✓</span>
                        <div>
                            <h3 class="font-semibold text-gray-900">User Management</h3>
                            <p class="text-gray-600 text-sm">View, edit, and delete user accounts. Manage roles and permissions.</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                        <span class="text-2xl">✓</span>
                        <div>
                            <h3 class="font-semibold text-gray-900">Analytics Dashboard</h3>
                            <p class="text-gray-600 text-sm">Track user behavior, revenue, and system performance metrics.</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                        <span class="text-2xl">✓</span>
                        <div>
                            <h3 class="font-semibold text-gray-900">Content Moderation</h3>
                            <p class="text-gray-600 text-sm">Review and moderate user-generated content and comments.</p>
                        </div>
                    </div>
                    <div class="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                        <span class="text-2xl">✓</span>
                        <div>
                            <h3 class="font-semibold text-gray-900">System Settings</h3>
                            <p class="text-gray-600 text-sm">Configure application settings and manage system maintenance.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Role-Based Access -->
            <div class="bg-purple-50 border border-purple-200 rounded-xl p-8">
                <h2 class="text-xl font-bold text-purple-900 mb-4">Role-Based Access Control</h2>
                <div class="space-y-4 text-purple-800">
                    <p>
                        This application demonstrates RBAC (Role-Based Access Control) with route-level permissions:
                    </p>
                    <ul class="space-y-2 ml-4">
                        <li><strong>User Role:</strong> Can access Home, About, and Dashboard</li>
                        <li><strong>Admin Role:</strong> Can access all pages including Admin Panel</li>
                    </ul>
                    <p class="mt-4 pt-4 border-t border-purple-200">
                        The route guard checks the user's role before allowing access. See <code class="bg-purple-100 px-2 py-1 rounded">src/router/guards.ts</code> for implementation.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
