/**
 * useAuth Composable
 * Provides reactive access to authentication state
 *
 * Usage in components:
 * const { user, isLoggedIn, login, logout } = useAuth()
 */

import { ref, computed } from 'vue';
import {
    login as authLogin,
    logout as authLogout,
    getUser,
    initAuth,
    setSessionWithRemember,
    type User,
} from '@/utils/auth';

const user = ref<User | null>(initAuth());
const isLoading = ref(false);
const error = ref<string | null>(null);

export function useAuth() {
    const isLoggedIn = computed(() => user.value !== null);

    const login = async (email: string, password: string, rememberMe: boolean = false) => {
        isLoading.value = true;
        error.value = null;

        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 500));

            const authenticatedUser = authLogin(email, password);

            if (authenticatedUser) {
                user.value = authenticatedUser;

                // Handle remember me
                if (rememberMe) {
                    const session = {
                        user: authenticatedUser,
                        token: `token_${Date.now()}`,
                        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
                    };
                    setSessionWithRemember(session, true);
                }

                return true;
            } else {
                error.value = 'Invalid email or password';

                return false;
            }
        } catch (err) {
            error.value = err instanceof Error ? err.message : 'Login failed';

            return false;
        } finally {
            isLoading.value = false;
        }
    };

    const logout = () => {
        authLogout();
        user.value = null;
        error.value = null;
    };

    const checkAuth = () => {
        user.value = getUser();
    };

    const clearError = () => {
        error.value = null;
    };

    return {
        user,
        isLoggedIn,
        isLoading,
        error,
        login,
        logout,
        checkAuth,
        clearError,
    };
}
