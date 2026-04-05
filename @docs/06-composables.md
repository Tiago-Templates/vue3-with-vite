# Composables & State Management

Learn how to use Vue 3 Composition API composables for auth state.

## What are Composables?

Composables are reusable Vue 3 Composition API functions that encapsulate logic:

```typescript
// A simple composable
export function useCounter() {
    const count = ref(0)

    const increment = () => count.value++

    return { count, increment }
}

// Use in component
const { count, increment } = useCounter()
```

## useAuth Composable

The `useAuth` composable manages authentication state:

### File: `src/composables/useAuth.ts`

```typescript
export function useAuth() {
    const user = ref<User | null>(initAuth())
    const isLoading = ref(false)
    const error = ref<string | null>(null)

    return {
        user,              // Reactive user object
        isLoggedIn,        // Computed boolean
        isLoading,         // Loading state
        error,             // Error message
        login,             // Login function
        logout,            // Logout function
        checkAuth,         // Verify auth status
        clearError         // Clear error message
    }
}
```

## Usage Examples

### Basic Login/Logout

```vue
<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const { user, isLoggedIn, login, logout } = useAuth()

const handleLogin = async () => {
    const success = await login('user@example.com', 'password', false)
    if (success) {
        console.log('Logged in as:', user.value?.name)
    }
}

const handleLogout = () => {
    logout()
    console.log('Logged out')
}
</script>

<template>
    <div v-if="isLoggedIn">
        <p>Welcome, {{ user?.name }}</p>
        <button @click="handleLogout">Logout</button>
    </div>
    <div v-else>
        <button @click="handleLogin">Login</button>
    </div>
</template>
```

### With Error Handling

```vue
<script setup lang="ts">
import { useAuth } from '@/composables/useAuth'

const { user, login, error, isLoading, clearError } = useAuth()

const handleLogin = async (email: string, password: string) => {
    clearError()  // Clear previous errors

    const success = await login(email, password, false)

    if (!success) {
        console.error('Login failed:', error.value)
    }
}
</script>

<template>
    <form @submit.prevent="handleLogin(email, password)">
        <!-- Form fields -->
        <div v-if="error" class="error-message">
            {{ error }}
        </div>
        <button :disabled="isLoading">
            {{ isLoading ? 'Logging in...' : 'Login' }}
        </button>
    </form>
</template>
```

### Protecting Routes

```typescript
// In page component
<script setup>
import { useRouter } from 'vue-router'
import { useAuth } from '@/composables/useAuth'

const router = useRouter()
const { isLoggedIn } = useAuth()

// Redirect if not logged in
if (!isLoggedIn.value) {
    router.push('/login')
}
</script>
```

## Reactive Refs vs Computed

### Refs (Mutable)

```typescript
const user = ref<User | null>(null)

// Change value
user.value = newUser
user.value.name = 'John'
```

### Computed (Derived)

```typescript
const isLoggedIn = computed(() => user.value !== null)

// Read-only derived from user
if (isLoggedIn.value) { }
```

## State Updates

### Update User Data

```typescript
// Directly update ref
user.value = {
    id: '123',
    name: 'John',
    email: 'john@example.com',
    role: 'user'
}

// Update property
user.value.name = 'Jane'

// Or use assignment
Object.assign(user.value, { name: 'Jane' })
```

### Clear State

```typescript
// Clear user
user.value = null

// Clear error
error.value = null

// Clear all
user.value = null
error.value = null
isLoading.value = false
```

## Advanced Composable Patterns

### Multiple Composables

Combine multiple composables:

```typescript
export function useDashboard() {
    const { user, isLoggedIn } = useAuth()
    const { posts, loading } = usePosts()
    const { notifications } = useNotifications()

    return {
        user,
        isLoggedIn,
        posts,
        loading,
        notifications
    }
}
```

### Composable with Parameters

```typescript
export function useUser(userId: string) {
    const user = ref(null)
    const error = ref(null)

    onMounted(async () => {
        try {
            const response = await fetch(`/api/users/${userId}`)
            user.value = await response.json()
        } catch (err) {
            error.value = err
        }
    })

    return { user, error }
}

// Use with parameter
const { user } = useUser('123')
```

### Composable with Setup

```typescript
export function useWatch() {
    const { user } = useAuth()

    watch(() => user.value?.name, (newName) => {
        console.log('Name changed to:', newName)
    })

    return { user }
}
```

## Sharing State Between Components

All components using `useAuth` share same state:

```typescript
// Component A
const { user, login } = useAuth()
const result = login('user@example.com', 'password')
// user.value is updated

// Component B
const { user } = useAuth()
// user.value is already updated from Component A!
```

## Performance Optimization

### Avoid Unnecessary Re-renders

```typescript
// ✅ Good - Computed prevents re-renders
const isAdmin = computed(() => user.value?.role === 'admin')

// ❌ Bad - Creates new object every render
const isAdmin = () => user.value?.role === 'admin'
```

### Lazy Initialization

```typescript
let initialized = false

export function useAuth() {
    if (!initialized) {
        user.value = initAuth()
        initialized = true
    }

    return { user, isLoggedIn, login, logout }
}
```

### Memoization

```typescript
import { computed } from 'vue'

const permissions = computed(() => {
    // Expensive calculation
    return calculatePermissions(user.value)
})
```

## Testing Composables

### Unit Testing

```typescript
import { describe, it, expect } from 'vitest'
import { useAuth } from '@/composables/useAuth'

describe('useAuth', () => {
    it('initializes with no user', () => {
        const { user, isLoggedIn } = useAuth()
        expect(user.value).toBeNull()
        expect(isLoggedIn.value).toBe(false)
    })

    it('logs in successfully', async () => {
        const { login, user } = useAuth()

        const success = await login('user@example.com', 'password', false)

        expect(success).toBe(true)
        expect(user.value?.email).toBe('user@example.com')
    })
})
```

## Best Practices

✅ **Do:**
- Keep composables focused on one concern
- Explicit return types with TypeScript
- Use descriptive names (useAuth, usePosts)
- Combine with other Vue features (watch, computed)
- Test composables independently
- Document parameters and return values

❌ **Don't:**
- Create too many composables
- Mix multiple concerns in one composable
- Mutate props from parents
- Forget to handle loading states
- Create composables with side effects
- Don't use in props/emits

## Common Patterns

### Loading State

```typescript
const { isLoading } = useAuth()

<button :disabled="isLoading">
    {{ isLoading ? 'Loading...' : 'Login' }}
</button>
```

### Error Handling

```typescript
const { error, clearError } = useAuth()

<div v-if="error" class="error">
    {{ error }}
    <button @click="clearError">Dismiss</button>
</div>
```

### Watch for Changes

```typescript
const { user } = useAuth()

watch(() => user.value, (newUser) => {
    if (newUser) {
        console.log('User logged in:', newUser.name)
    } else {
        console.log('User logged out')
    }
})
```

---

Next: Learn about [Navigation Patterns](./07-navigation.md)
