# Code Examples & Snippets

Practical code examples for common Vue Router scenarios.

## Login Functionality

### Complete Login Component

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const route = useRoute()
const { login, isLoading, error, clearError } = useAuth()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)

const handleLogin = async () => {
    clearError()
    const success = await login(email.value, password.value, rememberMe.value)

    if (success) {
        // Redirect to requested page or home
        const redirect = route.query.redirect as string
        router.push(redirect || { name: 'home' })
    }
}

const quickLogin = async (quickEmail: string) => {
    email.value = quickEmail
    password.value = 'password'
    clearError()
    await handleLogin()
}
</script>

<template>
    <form @submit.prevent="handleLogin" class="space-y-4">
        <div>
            <label>Email</label>
            <input v-model="email" type="email" required />
        </div>

        <div>
            <label>Password</label>
            <input v-model="password" type="password" required />
        </div>

        <div class="flex items-center">
            <input v-model="rememberMe" type="checkbox" id="remember" />
            <label for="remember">Remember me</label>
        </div>

        <div v-if="error" class="error">{{ error }}</div>

        <button :disabled="isLoading" type="submit">
            {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>

        <!-- Quick login buttons -->
        <button
            type="button"
            @click="quickLogin('user@example.com')"
            :disabled="isLoading"
        >
            Login as User
        </button>
    </form>
</template>
```

## Protecting Pages

### Check Auth on Mount

```typescript
<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { user } = useAuth()

onMounted(() => {
    if (!user.value) {
        router.push('/login')
    }
})
</script>
```

### Show/Hide Based on Auth

```vue
<script setup>
import { useAuth } from '@/composables/useAuth'

const { isLoggedIn, user } = useAuth()
</script>

<template>
    <div v-if="isLoggedIn" class="dashboard">
        <h1>Welcome {{ user?.name }}</h1>
    </div>
    <div v-else class="not-logged">
        <p>Please log in first</p>
        <router-link :to="{ name: 'login' }">
            Go to Login
        </router-link>
    </div>
</template>
```

## Conditional Rendering by Role

### Admin-Only Content

```vue
<script setup>
import { useAuth } from '@/composables/useAuth'

const { user } = useAuth()
</script>

<template>
    <div>
        <!-- Show to everyone -->
        <div>Dashboard Overview</div>

        <!-- Show only to admins -->
        <div v-if="user?.role === 'admin'">
            <button>Manage Users</button>
            <button>System Settings</button>
        </div>

        <!-- Show only to regular users -->
        <div v-else-if="user?.role === 'user'">
            <button>My Profile</button>
            <button>My Posts</button>
        </div>
    </div>
</template>
```

## Navigation Guards

### Redirect After Login

```typescript
// In login component
const handleLogin = async () => {
    const success = await login(email, password, false)

    if (success) {
        // Redirect to original page or home
        const redirect = route.query.redirect as string
        router.push(redirect || { name: 'home' })
    }
}
```

### Global Authentication Guard

```typescript
// In src/router/index.ts
import { createAuthGuard } from './guards'

const router = createRouter({ /* ... */ })

// Setup all guards after creating router
createAuthGuard(router)

export default router
```

## Working with User Session

### Display User Information

```vue
<script setup>
import { computed } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { user } = useAuth()

const initials = computed(() => {
    return user.value?.name
        ?.split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase()
})
</script>

<template>
    <div v-if="user" class="user-profile">
        <div class="avatar">{{ initials }}</div>
        <div class="info">
            <p class="name">{{ user.name }}</p>
            <p class="email">{{ user.email }}</p>
            <span class="badge">{{ user.role }}</span>
        </div>
    </div>
</template>
```

### Update User Session

```typescript
// Using ref.value
user.value.name = 'New Name'

// Or use Object.assign
Object.assign(user.value, {
    name: 'New Name',
    email: 'new@example.com'
})
```

## Error Handling

### Handle Login Errors

```typescript
const handleLogin = async () => {
    clearError()

    const success = await login(email.value, password.value, false)

    if (!success) {
        // Error is in error.value
        console.error('Login error:', error.value)

        // Show error to user (already reactive)
        // Template shows: {{ error }}
    }
}
```

### Retry Failed Operations

```typescript
const { error, clearError, login } = useAuth()

const retryLogin = async () => {
    clearError()
    const success = await login(email, password, false)

    if (!success) {
        // Show retry button to user
        showRetryPrompt()
    }
}
```

## Remember Me Functionality

### Login with Remember Me

```typescript
const { login } = useAuth()
const rememberMe = ref(false)

const handleLogin = async () => {
    // Pass rememberMe flag
    const success = await login(
        email.value,
        password.value,
        rememberMe.value  // true stores in localStorage
    )
}
```

### Check if Session Persisted

```typescript
// Session persists across browser close if rememberMe was used
// On app start, initAuth() checks both sessionStorage and localStorage

import { getSession } from '@/utils/auth'

const session = getSession()
if (session && session.expiresAt > Date.now()) {
    // User is still logged in
}
```

## Logout

### Simple Logout

```vue
<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { logout } = useAuth()

const handleLogout = () => {
    logout()
    router.push('/login')
}
</script>

<template>
    <button @click="handleLogout">Logout</button>
</template>
```

### Logout with Confirmation

```typescript
const handleLogout = async () => {
    const confirmed = confirm('Are you sure you want to logout?')

    if (confirmed) {
        logout()
        router.push('/login')
    }
}
```

## Status Checks

### Check Authentication Status

```typescript
import { isAuthenticated, getUser, hasRole } from '@/utils/auth'

// Check if user is logged in
if (isAuthenticated()) {
    // User is authenticated
}

// Get current user
const user = getUser()
if (user) {
    console.log('Logged in as:', user.name)
}

// Check role
if (hasRole('admin')) {
    // User is admin
}
```

## Watch for Auth Changes

### Monitor User Login/Logout

```typescript
import { watch } from 'vue'
import { useAuth } from '@/composables/useAuth'

const { user } = useAuth()

watch(() => user.value, (newUser, oldUser) => {
    if (newUser && !oldUser) {
        console.log('User logged in')
        // Show welcome notification
    } else if (!newUser && oldUser) {
        console.log('User logged out')
        // Clear user data
    }
})
```

## API Requests with Auth

### Include Auth Token

```typescript
import { getSession } from '@/utils/auth'

const makeAuthenticatedRequest = async (url: string) => {
    const session = getSession()

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${session?.token}`,
            'Content-Type': 'application/json'
        }
    })

    return response.json()
}
```

## Testing

### Test Login Flow

```typescript
// Example with Vitest + Vue Test Utils
import { useAuth } from '@/composables/useAuth'

describe('Login Flow', () => {
    it('logs in user successfully', async () => {
        const { login, user, isLoggedIn } = useAuth()

        const result = await login('user@example.com', 'password', false)

        expect(result).toBe(true)
        expect(isLoggedIn.value).toBe(true)
        expect(user.value?.email).toBe('user@example.com')
    })

    it('shows error on invalid credentials', async () => {
        const { login, error } = useAuth()

        await login('', '', false)

        expect(error.value).toBeTruthy()
    })
})
```

---

See other documentation files for more detailed information on specific topics.
