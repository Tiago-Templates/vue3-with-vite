# Route Guards & Middleware

Learn how to protect routes and implement access control.

## What are Route Guards?

Route guards (middleware) are functions that run before navigation occurs. They allow you to:
- Check if user is authenticated
- Verify user has required role
- Redirect unauthorized users
- Log navigation events
- Perform cleanup

## Types of Guards

### 1. Global Before Guards

Run before every navigation:

```typescript
router.beforeEach((to, from, next) => {
    console.log(`Navigating from ${from.path} to ${to.path}`)
    next()
})
```

Parameters:
- `to`: Route being navigated to
- `from`: Current route
- `next`: Function to proceed navigation

### 2. Per-Route Guards

Defined on specific routes:

```typescript
{
    path: '/dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
        if (isAuthenticated()) {
            next()
        } else {
            next('/login')
        }
    }
}
```

### 3. After Navigation Guards

Run after navigation completes:

```typescript
router.afterEach((to, from) => {
    document.title = to.meta.title
    console.log('Navigation completed')
})
```

## Implementation in This App

### Route Guard Setup

File: `src/router/guards.ts`

```typescript
// Create and setup the guard
export async function createAuthGuard(router: Router): Promise<void> {
    router.beforeEach((to, from, next) => {
        const authenticated = isAuthenticated()

        // Check if route requires auth
        if (requireAuth(to) && !authenticated) {
            next({
                name: 'login',
                query: { redirect: to.fullPath }
            })
            return
        }

        // Check if route is guest-only
        if (requireGuest(to) && authenticated) {
            next({ name: 'home' })
            return
        }

        // Check role-based access
        if (!checkRole(to)) {
            next({ name: 'forbidden' })
            return
        }

        next()
    })
}
```

### Route Configuration

File: `src/router/index.ts`

```typescript
const routes: RouteRecordRaw[] = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta: {
            title: 'Dashboard',
            requiresAuth: true        // This route needs auth
        }
    },
    {
        path: '/admin',
        name: 'admin',
        component: Admin,
        meta: {
            title: 'Admin Panel',
            requiresAuth: true,       // Requires auth
            role: 'admin'             // Requires admin role
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: 'Login',
            requiresGuest: true       // Only for non-authenticated users
        }
    }
]
```

## Meta Fields

Vue Router meta fields are custom data attached to routes:

```typescript
meta: {
    title: 'Page Title',          // For document title
    requiresAuth: true,           // Requires authentication
    requiresGuest: true,          // Only for guests
    role: 'admin',                // Specific role
    description: 'Page desc'      // SEO description
}
```

## Guard Flow

Practical example of guard execution:

```
1. User click "Go to Dashboard"
   ↓
2. beforeEach guard fires
   ├─ Check: requiresAuth = true
   ├─ Check: isAuthenticated() = false
   ├─ Action: Redirect to login with redirect query
   └─ next() NOT called
   ↓
3. User lands on /login

4. After login, next() is called
   ↓
5. beforeEach guard fires again for /dashboard
   ├─ Check: isAuthenticated() = true
   ├─ Check: checkRole('dashboard') = true
   ├─ Action: Allow navigation
   └─ next() called
   ↓
6. Dashboard component loads
   ↓
7. afterEach guard fires
   ├─ Update page title: "Dashboard"
   └─ Log navigation
   ↓
8. Page displayed
```

## Common Scenarios

### Scenario 1: Protected Route

User not logged in tries to access dashboard:

```typescript
if (requireAuth(to) && !isAuthenticated()) {
    // Redirect with return URL
    next({
        name: 'login',
        query: { redirect: to.fullPath }
    })
}
```

### Scenario 2: Role-Based Access

User without admin role tries to access admin panel:

```typescript
if (to.matched.some(r => r.meta?.role)) {
    const requiredRole = to.meta.role
    if (!hasRole(requiredRole)) {
        next({ name: 'forbidden' })
    }
}
```

### Scenario 3: Guest-Only Route

Logged-in user tries to access login page:

```typescript
if (requireGuest(to) && isAuthenticated()) {
    next({ name: 'home' })
}
```

### Scenario 4: Return After Login

User redirected to login, then back to original page:

```typescript
// In Login.vue after successful login:
const redirect = route.query.redirect as string
router.push(redirect || { name: 'home' })
```

## Advanced Patterns

### Dynamic Role Checking

```typescript
// For multiple required roles
meta: {
    requiresAuth: true,
    roles: ['admin', 'moderator']  // Allow multiple
}

// In guard:
const requiredRoles = to.meta.roles as string[]
if (requiredRoles && !requiredRoles.includes(user.role)) {
    next({ name: 'forbidden' })
}
```

### Conditional Access

```typescript
// Based on custom logic
beforeEnter: (to, from, next) => {
    const isOwner = to.params.userId === user.value?.id
    if (isOwner || hasRole('admin')) {
        next()
    } else {
        next({ name: 'forbidden' })
    }
}
```

### Async Operations

```typescript
beforeEach: async (to, from, next) => {
    // Wait for permissions to load
    await loadUserPermissions()

    if (canAccess(to)) {
        next()
    } else {
        next('/forbidden')
    }
}
```

## Guard Order

Routes execute in this order:

```
1. Global beforeEach guard
2. Route-specific beforeEnter guard
3. Component beforeRouteEnter (if component guard exists)
4. Next route beforeEnter guard (if nested)
5. Component beforeRouteUpdate
6. Global afterEach guard
7. DOM updates
8. Callbacks for beforeRouteEnter
```

## Debugging Guards

### Enable Logging

```typescript
router.beforeEach((to, from, next) => {
    console.log('Navigation Guard:')
    console.log('From:', from.path)
    console.log('To:', to.path)
    console.log('Requires Auth:', to.meta.requiresAuth)
    console.log('User:', getUser())
    next()
})
```

### Check in DevTools

Vue DevTools shows all navigation events:
1. Open DevTools
2. Go to Vue tab
3. Click "Timeline"
4. Watch route changes

## Best Practices

✅ **Do:**
- Use meta fields for route configuration
- Check both auth and authorization
- Provide helpful error messages
- Handle async operations properly
- Log important navigation events
- Always call `next()` to complete guard

❌ **Don't:**
- Forget to call `next()` (navigation will hang)
- Perform heavy operations in guards
- Block multiple guards without reason
- Ignore error cases
- Trust only client-side validation
- Redirect in infinite loops

## Testing Guards

```typescript
// Example test
describe('Route Guards', () => {
    it('should redirect to login for protected routes', () => {
        // Try to access protected route
        router.push('/dashboard')

        // Should redirect to login
        expect(router.currentRoute.value.name).toBe('login')
    })
})
```

---

Next: Learn about [Role-Based Access Control](./05-rbac.md)
