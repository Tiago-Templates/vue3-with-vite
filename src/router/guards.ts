/**
 * Route Guards and Middleware
 *
 * Examples:
 * - requireAuth: Redirect to login if not authenticated
 * - requireGuest: Redirect to home if already authenticated
 * - requireRole: Check if user has specific role
 */

import type { Router, RouteLocationNormalized } from 'vue-router';
import { isAuthenticated, hasRole } from '@/utils/auth';

/**
 * Setup all route guards
 */
export function setupRouteGuards(router: Router): void {
    router.beforeEach((_to, _from, next) => {
        // Global guard logic can go here
        // For example: logging, analytics, etc.

        next();
    });
}

/**
 * Check if route requires authentication
 */
export function requireAuth(to: RouteLocationNormalized): boolean {
    return to.matched.some(record => record.meta?.requiresAuth);
}

/**
 * Check if route requires guest (not authenticated)
 */
export function requireGuest(to: RouteLocationNormalized): boolean {
    return to.matched.some(record => record.meta?.requiresGuest);
}

/**
 * Check if user has required role
 */
export function checkRole(to: RouteLocationNormalized): boolean {
    const requiredRole = to.matched.find(record => record.meta?.role)?.meta?.role as string | undefined;

    if (!requiredRole) {
        return true;
    }

    return hasRole(requiredRole);
}

/**
 * Route guard to be used in router configuration
 * Handles authentication and role-based access
 */
export async function createAuthGuard(router: Router): Promise<void> {
    router.beforeEach((to, _from, next) => {
        const authenticated = isAuthenticated();

        // Require auth routes
        if (requireAuth(to) && !authenticated) {
            next({
                name: 'login',
                query: { redirect: to.fullPath },
            });

            return;
        }

        // Require guest routes (like login/register)
        if (requireGuest(to) && authenticated) {
            next({ name: 'home' });

            return;
        }

        // Check role-based access
        if (!checkRole(to)) {
            next({ name: 'forbidden' });

            return;
        }

        next();
    });
}

/**
 * After navigation guard for analytics, etc.
 */
export function createAfterGuard(router: Router): void {
    router.afterEach((to) => {
        // Update page title
        document.title = `${to.meta?.title || 'App'} - Vue Router SPA`;

        // You could add analytics here
        console.log(`Navigated to ${to.path}`);
    });
}
