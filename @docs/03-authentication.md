# Authentication System

Complete guide to the authentication system using localStorage/sessionStorage.

## Overview

The authentication system provides:
- Mock login/logout functionality
- Session storage with localStorage/sessionStorage
- "Remember Me" functionality
- Session expiration handling
- Reactive user state with Composition API

## Session Storage

### sessionStorage (Default)

Stores session only for current browser tab:

```typescript
// Session is cleared when tab closes
sessionStorage.setItem('auth_session', JSON.stringify(session))
```

**Use for:**
- Regular login (session expires on browser close)
- Security-sensitive operations
- Default option

### localStorage (With Remember Me)

Persists session across browser sessions:

```typescript
// Session persists until manually cleared
localStorage.setItem('auth_session', JSON.stringify(session))
localStorage.setItem('auth_remember', 'true')
```

**Use for:**
- "Remember Me" option
- Persistent login for user convenience
- But reduces security

## Authentication Utilities

### `src/utils/auth.ts`

Main authentication service:

```typescript
// Initialize auth on app start
const user = initAuth()

// Login
const user = login(email, password)

// Logout
logout()

// Get current user
const user = getUser()

// Check if authenticated
if (isAuthenticated()) { }

// Get session
const session = getSession()

// Check role
if (hasRole('admin')) { }

// Set with remember me
setSessionWithRemember(session, rememberMe)
```

### Session Data Structure

```typescript
interface AuthSession {
    user: {
        id: string
        email: string
        name: string
        role: 'user' | 'admin'
    }
    token: string          // Mock JWT-like token
    expiresAt: number      // Timestamp when session expires
}
```

## useAuth Composable

### `src/composables/useAuth.ts`

Reactive authentication state:

```typescript
import { useAuth } from '@/composables/useAuth'

const {
    user,            // Ref<User | null>
    isLoggedIn,      // Computed<boolean>
    isLoading,       // Ref<boolean>
    error,           // Ref<string | null>
    login,           // Function
    logout,          // Function
    checkAuth,       // Function
    clearError       // Function
} = useAuth()
```

### Using in Components

```vue
<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const { user, isLoggedIn, login, logout, isLoading, error } = useAuth()

const handleLogin = async () => {
    const success = await login('user@example.com', 'password', false)
    if (success) {
        // Navigate to dashboard
    }
}
</script>

<template>
    <div v-if="isLoggedIn">
        <p>Welcome {{ user?.name }}</p>
        <button @click="logout">Logout</button>
    </div>
    <div v-else>
        <input type="email" v-model="email" />
        <button @click="handleLogin" :disabled="isLoading">
            Login
        </button>
        <p v-if="error" class="error">{{ error }}</p>
    </div>
</template>
```

## Login Flow

### 1. User submits email/password

```typescript
const success = await login('user@example.com', 'password', rememberMe)
```

### 2. Validate credentials

```typescript
if (!email || !password) {
    return null  // Invalid
}
```

### 3. Create session

```typescript
const session: AuthSession = {
    user: {
        id: '123',
        email,
        name: email.split('@')[0],
        role: email.includes('admin') ? 'admin' : 'user'
    },
    token: `token_${Date.now()}`,
    expiresAt: Date.now() + 24 * 60 * 60 * 1000  // 24 hours
}
```

### 4. Store session

```typescript
if (rememberMe) {
    setSessionWithRemember(session, true)  // localStorage
} else {
    setSession(session)  // sessionStorage
}
```

### 5. Return user data

```typescript
return mock User object
```

## Demo Credentials

The app comes with demo accounts:

| Email | Password | Role |
|-------|----------|------|
| user@example.com | password | user |
| admin@example.com | password | admin |

> ⚠️ These are hardcoded for demo only. Never use in production!

## Session Lifecycle

```
App Starts
    ↓
initAuth() checks storage
    ↓
If valid session exists
    ├─ Use existing session
    └─ Return user
    ↓
If no session or expired
    ├─ Clear storage
    └─ Return null
    ↓
User sees login page
    ↓
User logs in
    ├─ Create session
    ├─ Store in storage
    └─ Redirect to dashboard
    ↓
User navigates
    └─ Session verified on each route
    ↓
User logs out OR browser closes (sessionStorage only)
    └─ Session cleared
```

## Security Considerations

### ⚠️ Demo vs Production

**This app is a DEMO!** Security features to add in production:

### 1. API Authentication

Replace mock login with real API:

```typescript
async function login(email: string, password: string) {
    // WRONG - Demo code
    return mockUser

    // RIGHT - Production code
    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    return response.json()
}
```

### 2. Secure Token Storage

Never store tokens in localStorage (XSS vulnerable):

```typescript
// WRONG - XSS Vulnerable
localStorage.setItem('token', jwtToken)

// CORRECT - Use HttpOnly Cookie
// Sent via Set-Cookie header by server
// JavaScript cannot access
```

### 3. HTTPS Only

Always use HTTPS in production:

```typescript
// WRONG - HTTP allows man-in-the-middle attacks
const session = localStorage.getItem('session')

// CORRECT - HTTPS encrypts data in transit
// Use secure cookies with Secure flag
```

### 4. Token Refresh

Implement refresh tokens for security:

```typescript
async function refreshToken() {
    const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        credentials: 'include'  // Send cookies
    })
    const { token } = await response.json()
    // Update stored token
}
```

### 5. Input Validation

Validate on both client and server:

```typescript
function validateEmail(email: string): boolean {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return pattern.test(email)
}

function validatePassword(password: string): boolean {
    return password.length >= 8
}
```

### 6. CSRF Protection

Protect against Cross-Site Request Forgery:

```typescript
// Server returns CSRF token
const csrfToken = document.querySelector('meta[name="csrf-token"]')?.content

// Include in requests
fetch('/api/auth/logout', {
    method: 'POST',
    headers: {
        'X-CSRF-Token': csrfToken
    }
})
```

## Best Practices

✅ **Do:**
- Always validate on server
- Use HTTPS in production
- Implement token refresh logic
- Clear sensitive data on logout
- Set short expiration times
- Use secure cookies (HttpOnly, Secure flags)
- Implement rate limiting on login
- Log authentication events

❌ **Don't:**
- Store JWTs in localStorage
- Send tokens in URLs
- Trust client-side validation alone
- Store encrypted passwords anywhere
- Use hardcoded credentials
- Skip HTTPS in production
- Ignore session expiration
- Log sensitive information

## Debugging

### Check Session in DevTools

1. Open DevTools (F12)
2. Go to Application tab
3. Check Session Storage or Local Storage
4. Look for `auth_session` key
5. View the stored JSON data

### Console Logging

Enable debug logging:

```typescript
// In src/composables/useAuth.ts
console.log('User logged in:', user.value)
console.log('Session:', getSession())
```

### Network Requests

In production, check Network tab to verify:
- POST request to `/api/auth/login`
- Correct response with token
- Token included in Authorization header

---

Next: Learn about [Route Guards](./04-route-guards.md)
