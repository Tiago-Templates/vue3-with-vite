# Basic Routing

Learn the fundamentals of Vue Router routing and navigation.

## Route Definition

Routes are defined as objects in the router configuration:

```typescript
// src/router/index.ts
const routes: RouteRecordRaw[] = [
    {
        path: '/',                    // URL path
        name: 'home',                 // Route name
        component: Home,              // Component to render
        meta: {
            title: 'Home',            // Page title
        }
    },
    {
        path: '/about',
        name: 'about',
        component: About,
        meta: {
            title: 'About'
        }
    }
]
```

## Navigation Methods

### Using Router Links

Use `<router-link>` for navigation without page reload:

```vue
<!-- Using path -->
<router-link to="/">Home</router-link>

<!-- Using name (recommended) -->
<router-link :to="{ name: 'home' }">Home</router-link>

<!-- With parameters -->
<router-link :to="{ name: 'user', params: { id: 123 } }">
    User Profile
</router-link>

<!-- With query string -->
<router-link :to="{ name: 'search', query: { q: 'vue' } }">
    Search Results
</router-link>
```

### Programmatic Navigation

Use `useRouter()` in components:

```typescript
import { useRouter } from 'vue-router'

const router = useRouter()

// Navigate to home
router.push({ name: 'home' })

// Navigate with parameters
router.push({ name: 'user', params: { id: 123 } })

// Go back
router.back()

// Go forward
router.forward()

// Go to specific position in history
router.go(-2)
```

## Active Links

Router automatically adds classes to active links:

```vue
<router-link
    :to="{ name: 'home' }"
    active-class="text-blue-600 font-bold"
    exact-active-class="exact-active"
>
    Home
</router-link>
```

- `active-class`: Applied when link is active
- `exact-active-class`: Applied when link matches exactly

## Dynamic Routes

### Route Parameters

Define parameters in path with `:paramName`:

```typescript
{
    path: '/user/:id',
    name: 'user',
    component: UserProfile
}
```

Access parameters:

```typescript
import { useRoute } from 'vue-router'

const route = useRoute()

// Get parameter
const userId = route.params.id

// Get query string
const search = route.query.q
```

### Multiple Parameters

```typescript
{
    path: '/posts/:postId/comments/:commentId',
    component: Comment
}
```

Navigate:
```typescript
router.push({
    name: 'comment',
    params: {
        postId: 5,
        commentId: 42
    }
})
```

### Optional Parameters

Use regex pattern in path:

```typescript
{
    path: '/posts/:id(\\d+)?',  // Optional numeric ID
    component: Posts
}
```

## Catch-All Routes

Match any unmatched path:

```typescript
{
    path: '/:pathMatch(.*)*',  // Catch all
    name: 'notfound',
    component: NotFound
}
```

Must be last in routes array!

## Nested Routes

### Parent-Child Routing

```typescript
{
    path: '/settings',
    component: SettingsLayout,
    children: [
        {
            path: 'profile',
            component: SettingsProfile
        },
        {
            path: 'security',
            component: SettingsSecurity
        }
    ]
}
```

The parent component must have `<router-view>`:

```vue
<!-- SettingsLayout.vue -->
<template>
    <div class="settings">
        <Sidebar />
        <router-view /> <!-- Child routes render here -->
    </div>
</template>
```

## Lazy Loading Components

Code-split routes for better performance:

```typescript
const Home = () => import('@/pages/Home.vue')
const About = () => import('@/pages/About.vue')

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About }
]
```

Benefits:
- Smaller initial bundle
- Faster page load
- Components loaded on demand

## Route Meta Data

Attach custom data to routes:

```typescript
{
    path: '/dashboard',
    component: Dashboard,
    meta: {
        title: 'Dashboard',
        requiresAuth: true,      // Custom property
        role: 'user'             // Custom property
    }
}
```

Access in guards:

```typescript
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isLoggedIn) {
        next('/login')
    } else {
        next()
    }
})
```

## Redirects

### Basic Redirect

```typescript
{
    path: '/home',
    redirect: '/'
}
```

### Conditional Redirect

```typescript
{
    path: '/admin',
    redirect: to => {
        return isAdmin ? '/admin/dashboard' : '/'
    }
}
```

## Aliases

Multiple paths for same component:

```typescript
{
    path: '/home',
    component: Home,
    alias: ['/start', '/index']  // Also accessible via these paths
}
```

## Router History Modes

Vue Router supports different history modes:

### Hash Mode (Default in this app)

URL looks like: `http://example.com/#/about`

```typescript
createRouter({
    history: createWebHashHistory(),
    routes
})
```

Advantages:
- Works without server configuration
- Good for static hosting (Vercel, Netlify)

### HTML5 History Mode

URL looks like: `http://example.com/about`

```typescript
createRouter({
    history: createWebHistory(),
    routes
})
```

Requires server configuration to handle all routes.

## Best Practices

✅ **Do:**
- Use route names instead of paths: `{ name: 'about' }`
- Lazy-load components for better performance
- Use TypeScript for route definitions
- Add meta data for page titles and guards
- Handle 404 routes with catch-all

❌ **Don't:**
- Hard-code paths in navigation
- Keep all routes in one massive file
- Forget to add catch-all route for 404s
- Over-complicate nested routes

## Navigation Flow

```
User clicks link
    ↓
Router parses path
    ↓
Guards execute (beforeEach)
    ↓
Component loads (lazy or sync)
    ↓
Component mounted
    ↓
afterEach guards
    ↓
Page displayed
```

---

Next: Learn about [Authentication System](./03-authentication.md)
