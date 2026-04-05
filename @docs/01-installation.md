# Installation & Setup

## Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager
- Vue 3.5+

## Installation Steps

### 1. Install Dependencies

```bash
npm install
```

This will install:
- `vue`: Vue 3 framework
- `vue-router`: Official Vue Router
- `tailwindcss`: CSS utility framework
- Other dev dependencies

### 2. Project Structure

After installation, your project structure should look like:

```
src/
├── router/
│   ├── index.ts          # Router configuration
│   └── guards.ts         # Route guards & middleware
├── pages/                # Page components
│   ├── Home.vue
│   ├── Dashboard.vue
│   ├── Login.vue
│   ├── Admin.vue
│   ├── NotFound.vue
│   └── Forbidden.vue
├── composables/          # Vue 3 Composition API
│   └── useAuth.ts        # Authentication hook
├── utils/                # Utility functions
│   └── auth.ts           # Auth service
└── main.ts               # Application entry point
```

### 3. Development Server

Start the development server:

```bash
npm run dev
```

This will:
- Start Vite dev server on `http://localhost:5173`
- Enable hot module replacement (HMR)
- Watch for file changes

### 4. Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### 5. Preview Production Build

```bash
npm run preview
```

This serves the production build locally for testing.

## Configuration Files

### vite.config.ts

Vite configuration with:
- Vue plugin support
- TypeScript support
- Tailwind CSS Vite plugin

### tsconfig.json

TypeScript configuration for strict type checking and proper path aliases.

## Key Dependencies

### Runtime Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `vue` | ^3.5.24 | Vue 3 framework |
| `vue-router` | ^4.4.5 | Official Vue Router |
| `tailwindcss` | ^4.1.18 | CSS utilities |

### Development Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@vitejs/plugin-vue` | ^6.0.1 | Vite Vue plugin |
| `vue-tsc` | ^3.1.4 | Vue TypeScript compiler |
| `typescript` | ~5.9.3 | TypeScript support |
| `vite` | ^7.2.4 | Build tool & dev server |

## First Run Checklist

- [ ] Run `npm install` to install dependencies
- [ ] Run `npm run dev` to start development server
- [ ] Open `http://localhost:5173` in your browser
- [ ] Click "Get Started" or "Login" to test authentication
- [ ] Use demo credentials (see Login page)
- [ ] Navigate to Dashboard (requires login)
- [ ] Try accessing Admin page with user account (should be denied)
- [ ] Logout and login as admin to access Admin page
- [ ] Inspect localStorage/sessionStorage in DevTools

## Troubleshooting

### Port Already in Use

If port 5173 is already in use, Vite will automatically use the next available port.

### Module Not Found

If you get module not found errors:
1. Ensure all dependencies are installed: `npm install`
2. Check file paths match the actual file structure
3. Restart the dev server

### TypeScript Errors

Clear TypeScript cache:
```bash
rm -rf node_modules/.vite/
npm run dev
```

### Router Not Working

Ensure `main.ts` has:
```typescript
import router from './router'
app.use(router)
```

## Environment Variables

Create a `.env.local` file for environment-specific variables:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=My Vue App
```

Access in components:
```typescript
const apiUrl = import.meta.env.VITE_API_URL
```

## Next Steps

1. Read [Basic Routing](./02-basic-routing.md) to understand routes
2. Learn about [Authentication System](./03-authentication.md)
3. Explore [Route Guards](./04-route-guards.md) for protection
4. Check [Examples](./09-examples.md) for code snippets

---

For detailed information about Vue Router setup, see the [official documentation](https://router.vuejs.org/guide/).
