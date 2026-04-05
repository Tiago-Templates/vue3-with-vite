/**
 * Authentication Utility
 * Manages user session using localStorage/sessionStorage
 *
 * Example:
 * - login(email, password)
 * - logout()
 * - getUser()
 * - isAuthenticated()
 * - setSession(user, remember?)
 */

export interface User {
    id: string;
    email: string;
    name: string;
    role: 'user' | 'admin';
}

export interface AuthSession {
    user: User;
    token: string;
    expiresAt: number;
}

const STORAGE_KEY = 'auth_session';
const REMEMBER_KEY = 'auth_remember';

/**
 * Initialize auth (check for existing session)
 */
export function initAuth(): User | null {
    const session = getSessionFromStorage();

    if (session && session.expiresAt > Date.now()) {
        return session.user;
    }

    // Session expired
    clearSession();

    return null;
}

/**
 * Simulate login with email and password
 * In a real app, this would call an API
 */
export function login(email: string, password: string): User | null {
    // Simulate validation
    if (!email || !password) {
        return null;
    }

    // Mock user data - in a real app, this comes from a backend
    const mockUser: User = {
        id: '123',
        email,
        name: email.split('@')[0] || 'User',
        role: email.includes('admin') ? 'admin' : 'user',
    };

    // Create session token (in a real app, this comes from backend)
    const session: AuthSession = {
        user: mockUser,
        token: `token_${Date.now()}`, // Mock token
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    };

    setSession(session);

    return mockUser;
}

/**
 * Logout user and clear session
 */
export function logout(): void {
    clearSession();
}

/**
 * Get current user
 */
export function getUser(): User | null {
    const session = getSessionFromStorage();

    if (session && session.expiresAt > Date.now()) {
        return session.user;
    }

    if (session) {
        clearSession();
    }

    return null;
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
    return getUser() !== null;
}

/**
 * Get current session
 */
export function getSession(): AuthSession | null {
    const session = getSessionFromStorage();

    if (session && session.expiresAt > Date.now()) {
        return session;
    }

    if (session) {
        clearSession();
    }

    return null;
}

/**
 * Check if user has specific role
 */
export function hasRole(role: string): boolean {
    const user = getUser();

    return user?.role === role;
}

/**
 * Set session in storage
 */
export function setSession(session: AuthSession): void {
    const storage = sessionStorage; // Use sessionStorage by default
    storage.setItem(STORAGE_KEY, JSON.stringify(session));
}

/**
 * Get session from storage
 */
function getSessionFromStorage(): AuthSession | null {
    try {
        // Check sessionStorage first
        let data = sessionStorage.getItem(STORAGE_KEY);

        // Fall back to localStorage if remember me was checked
        if (!data && localStorage.getItem(REMEMBER_KEY)) {
            data = localStorage.getItem(STORAGE_KEY);
        }

        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error reading auth session:', error);

        return null;
    }
}

/**
 * Clear session from storage
 */
function clearSession(): void {
    sessionStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(REMEMBER_KEY);
}

/**
 * Set session with remember me option
 */
export function setSessionWithRemember(session: AuthSession, rememberMe: boolean): void {
    if (rememberMe) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
        localStorage.setItem(REMEMBER_KEY, 'true');
    } else {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    }
}
