# Role-Based Access Control (RBAC)

Implement authorization based on user roles.

## What is RBAC?

Role-Based Access Control grants permissions based on user roles:

```
User has a Role
    ↓
Role has Permissions
    ↓
Permission determines access
```

Example:
```
User: john@example.com
Role: admin
Permissions: read, write, delete, manage users
```

## Roles in This App

### User Role

```typescript
role: 'user'

// Can access:
- Home page (/)
- About page (/about)
- Dashboard (/dashboard)
- Login page (/login)

// Cannot access:
- Admin panel (/admin)
- Forbidden page (403)
```

### Admin Role

```typescript
role: 'admin'

// Can access:
- All pages including admin panel
- All user management features
- All settings
```

## Role Assignment

Roles are assigned during login:

```typescript
// In src/utils/auth.ts
const mockUser: User = {
    id: '123',
    email,
    name: email.split('@')[0],
    role: email.includes('admin') ? 'admin' : 'user'  // Admin if email contains 'admin'
}
```

Demo accounts:
- `user@example.com` → role: `user`
- `admin@example.com` → role: `admin`

## Checking Roles

### In Route Guards

```typescript
// src/router/guards.ts
export function checkRole(to: RouteLocationNormalized): boolean {
    const requiredRole = to.matched.find(
        record => record.meta?.role
    )?.meta?.role as string | undefined

    if (!requiredRole) {
        return true  // No role requirement
    }

    return hasRole(requiredRole)
}
```

### In Components

```typescript
import { useAuth } from '@/composables/useAuth'
import { hasRole } from '@/utils/auth'

const { user } = useAuth()

// Check if user is admin
if (hasRole('admin')) {
    // Show admin controls
}

// Check user role directly
if (user.value?.role === 'admin') {
    // Show admin-specific content
}
```

```vue
<template>
    <!-- Show admin button only for admins -->
    <button v-if="user?.role === 'admin'">
        Admin Settings
    </button>
</template>
```

## Route Protection by Role

### Define Role in Meta

```typescript
// src/router/index.ts
{
    path: '/admin',
    name: 'admin',
    component: Admin,
    meta: {
        title: 'Admin Panel',
        requiresAuth: true,
        role: 'admin'  // Only admin role
    }
}
```

### Guard Checks Role

```typescript
// src/router/guards.ts
export function createAuthGuard(router: Router): void {
    router.beforeEach((to, from, next) => {
        // ... auth check ...

        // Check role
        if (!checkRole(to)) {
            next({ name: 'forbidden' })
            return
        }

        next()
    })
}
```

## Access Control Patterns

### Pattern 1: Route-Level Access

Protect entire route by role:

```typescript
{
    path: '/admin',
    component: Admin,
    meta: {
        requiresAuth: true,
        role: 'admin'
    }
}

// If user is not admin → 403 Forbidden page
```

### Pattern 2: Component-Level Access

Show/hide parts based on role:

```vue
<script setup>
import { useAuth } from '@/composables/useAuth'
const { user } = useAuth()
</script>

<template>
    <div>
        <!-- Show to all authenticated users -->
        <h1>Dashboard</h1>

        <!-- Show only to admins -->
        <AdminPanel v-if="user?.role === 'admin'" />

        <!-- Show only to non-admins -->
        <UserSection v-else>
            Regular user content
        </UserSection>
    </div>
</template>
```

### Pattern 3: Conditional Navigation

```typescript
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'

const { user } = useAuth()
const router = useRouter()

const handleClick = () => {
    if (user.value?.role === 'admin') {
        router.push('/admin')
    } else {
        router.push('/user-profile')
    }
}
```

## Multiple Roles

### Allow Multiple Roles

```typescript
{
    path: '/reports',
    component: Reports,
    meta: {
        requiresAuth: true,
        roles: ['admin', 'moderator']  // Allow both
    }
}
```

### Guard Implementation

```typescript
function checkRoles(to: RouteLocationNormalized): boolean {
    const requiredRoles = to.meta.roles as string[] | undefined

    if (!requiredRoles) {
        return true  // No role requirement
    }

    const user = getUser()
    if (!user) {
        return false
    }

    return requiredRoles.includes(user.role)
}
```

## Advanced RBAC Patterns

### Permission-Based Access

Instead of just roles, use granular permissions:

```typescript
interface User {
    id: string
    email: string
    role: string
    permissions: string[]  // ['read_posts', 'write_posts', 'manage_users']
}
```

Check permissions:

```typescript
function hasPermission(permission: string): boolean {
    const user = getUser()
    return user?.permissions.includes(permission) ?? false
}
```

Use in routes:

```typescript
{
    path: '/users/delete',
    component: DeleteUsers,
    meta: {
        requiresAuth: true,
        permission: 'delete_users'
    }
}
```

### Attribute-Based Access Control (ABAC)

Check based on user attributes:

```typescript
{
    path: '/user/:id/edit',
    beforeEnter: (to) => {
        const user = getUser()
        const targetId = to.params.id

        // User can edit own profile or is admin
        return user?.id === targetId || user?.role === 'admin'
    }
}
```

## Real-World Example

Complete admin-protected feature:

```typescript
// Route definition
{
    path: '/dashboard/users',
    component: UserManagement,
    meta: {
        title: 'User Management',
        requiresAuth: true,
        role: 'admin'  // This route is admin-only
    }
}

// Component
<script setup>
import { useAuth } from '@/composables/useAuth'
import { useRouter } from 'vue-router'

const { user } = useAuth()
const router = useRouter()

// Extra safety check in component
if (user.value?.role !== 'admin') {
    router.push('/forbidden')
}

const deleteUser = async (id: string) => {
    // Only admin can delete
    if (user.value?.role !== 'admin') {
        console.error('Unauthorized')
        return
    }

    // Server-side check should verify this too!
    await fetch(`/api/users/${id}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}
</script>

<template>
    <div class="admin-panel">
        <h1>User Management</h1>
        <!-- Admin-specific content -->
    </div>
</template>
```

## Security Considerations

### ⚠️ Client-Side vs Server-Side

```typescript
// WRONG - Only client-side check
if (user.role === 'admin') {
    // Allow action
}

// CORRECT - Client + Server verification
if (user.role === 'admin') {
    // Client-side check for UX
    const response = await deleteUser(id)
    // Server verifies authorization!
}
```

### Always Verify on Server

Even if client shows/hides UI, server must check:

```typescript
// Server-side check (Node/Express example)
app.delete('/api/users/:id', authenticateUser, (req, res) => {
    // Verify user has admin role
    if (req.user.role !== 'admin') {
        return res.status(403).json({ error: 'Forbidden' })
    }

    // Delete user
    // ...
})
```

## Testing RBAC

```typescript
describe('RBAC', () => {
    it('should allow admin to access admin page', () => {
        loginAsAdmin()
        router.push('/admin')
        expect(router.currentRoute.value.name).toBe('admin')
    })

    it('should deny user from accessing admin page', () => {
        loginAsUser()
        router.push('/admin')
        expect(router.currentRoute.value.name).toBe('forbidden')
    })
})
```

## Best Practices

✅ **Do:**
- Always verify permissions on server
- Use clear role definitions
- Combine client and server checks
- Log authorization failures
- Use TypeScript for type safety
- Implement role hierarchy

❌ **Don't:**
- Trust only client-side checks
- Have unlimited roles
- Mix authentication and authorization
- Fail silently on permission errors
- Store sensitive role data in localStorage
- Forget server validation

---

Next: Learn about [Composables & State](./06-composables.md)
