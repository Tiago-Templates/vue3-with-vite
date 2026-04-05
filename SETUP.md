# Vue Router SPA - Quick Reference

## 🎯 What Was Added

This project now includes a fully-functional Vue Router SPA with:

### ✅ Core Features
- **Vue Router 4.4.5** - Client-side routing
- **Authentication System** - Mock login with localStorage/sessionStorage
- **Route Guards** - Role-based access control
- **Mock API** - Demo credentials for testing
- **Responsive UI** - Tailwind CSS styling
- **TypeScript** - Full type safety

### 📁 Project Structure

```
src/
├── router/
│   ├── index.ts              # Router config with 6 routes
│   └── guards.ts             # Auth middleware & role checking
├── pages/                     # Lazy-loaded page components
│   ├── Home.vue              # Landing page
│   ├── About.vue             # About Vue Router
│   ├── Dashboard.vue         # Protected user page
│   ├── Admin.vue             # Protected admin page
│   ├── Login.vue             # Login form
│   ├── NotFound.vue          # 404 page
│   └── Forbidden.vue         # 403 page
├── composables/
│   └── useAuth.ts            # Reactive auth state
├── utils/
│   └── auth.ts               # Auth service & storage
└── components/
    └── Header.vue            # Navigation with links

@docs/                         # Documentation
├── README.md                 # Index & quick start
├── 01-installation.md        # Setup & installation
├── 02-basic-routing.md       # Routes & navigation
├── 03-authentication.md      # Auth system details
├── 04-route-guards.md        # Guards & middleware
├── 05-rbac.md                # Role-based access
├── 06-composables.md         # Composition API
└── 09-examples.md            # Code snippets
```

## 🚀 Getting Started

### Install Dependencies
```bash
npm install
```

### Start Development Server
```bash
npm run dev
```

Then open `http://localhost:5173`

### Login Credentials

| Email | Password | Access |
|-------|----------|--------|
| user@example.com | password | User dashboard |
| admin@example.com | password | Admin panel |

## 📍 Routes

| Path | Component | Auth Required | Role |
|------|-----------|---------------|------|
| `/` | Home | No | - |
| `/about` | About | No | - |
| `/login` | Login | Guest only | - |
| `/dashboard` | Dashboard | Yes | user |
| `/admin` | Admin | Yes | admin |
| `/forbidden` | Forbidden | No | - |
| `/404` | NotFound | No | - |
| `/*` | NotFound | No | - |

## 🔐 Authentication Flow

```
1. User visits /login
2. Enters credentials (user@example.com / password)
3. Login successful → stored in sessionStorage
4. Redirects to dashboard (or requested page)
5. Route guard verifies auth on each navigation
6. Logout clears session
```

## 💾 Session Storage

### sessionStorage (Default)
- Used for regular login
- Cleared when browser closes
- More secure

### localStorage (With Remember Me)
- Persists across browser sessions
- Used when "Remember Me" is checked
- Less secure but convenient

## 🛡️ Route Guards

Implemented in `src/router/guards.ts`:

```typescript
// Protect route with auth requirement
meta: { requiresAuth: true }

// Protect route with role requirement
meta: { role: 'admin' }

// Protect route (guest only)
meta: { requiresGuest: true }
```

## 🧩 Key Components

### useAuth Composable
```typescript
const { user, isLoggedIn, login, logout, error, isLoading } = useAuth()

await login('email@example.com', 'password', rememberMe)
logout()
```

### Auth Service
```typescript
import { getUser, hasRole, isAuthenticated } from '@/utils/auth'

const user = getUser()
const isAdmin = hasRole('admin')
const loggedIn = isAuthenticated()
```

## 📚 Documentation

Start with the `@docs/README.md` file which includes:
- Installation guide
- Basic routing concepts
- Authentication details
- Route guards & middleware
- RBAC implementation
- Composables usage
- Code examples & snippets

## 🔧 Build & Deploy

### Build for Production
```bash
npm run build
```

Creates optimized build in `dist/` folder.

### Preview Production Build
```bash
npm run preview
```

### Deploy to Vercel
The `vercel.json` file is configured for Vue Router SPA:
- Serves `index.html` for all routes (hash history)
- Enables caching for assets
- Proper redirects for SPA routing

```bash
vercel
```

## 🧪 Testing

Demo features:
- Try login with both user and admin accounts
- Access dashboard (requires login)
- Try accessing /admin with user account (gets 403)
- Check localStorage/sessionStorage in DevTools
- Use "Back" buttons to test history
- Try navigating to non-existent routes (404)

## ⚙️ Configuration

### Vite
- `vite.config.ts` - Build configuration
- Uses Tailwind CSS Vite plugin
- Supports TypeScript out of box

### TypeScript
- `tsconfig.json` - Strict type checking
- Path alias: `@/` → `src/`

### Vue Router
- Hash history mode (works without server)
- Lazy-loaded components (automatic code splitting)
- Global route guards

## 🔒 Security Notes

⚠️ **This is a DEMO application!**

Features to add for production:
- Real API authentication (not mock)
- JWT token management
- Secure cookies (HttpOnly, Secure flags)
- CSRF protection
- Input validation
- Rate limiting
- HTTPS only

See `@docs/03-authentication.md#security-considerations` for details.

## 📦 Dependencies Added

```json
{
  "dependencies": {
    "vue-router": "^4.4.5"
  }
}
```

## 🎨 UI Framework

- **Tailwind CSS v4** - Utility-first CSS
- **Responsive Design** - Mobile-friendly
- **Dark Mode Ready** - CSS variables support

## 🔗 Useful Links

- [Vue Router Docs](https://router.vuejs.org/)
- [Vue 3 Docs](https://vuejs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite Docs](https://vitejs.dev/)

## 📝 Next Steps

1. **Read Documentation** - Start with `@docs/README.md`
2. **Explore Pages** - Visit each page to see examples
3. **Check Console** - Monitor navigation events
4. **Inspect Storage** - View session data in DevTools
5. **Review Code** - Study guard implementation
6. **Customize** - Adapt to your needs

---

**Happy coding! 🚀**

For questions or issues, refer to the documentation files or check the code comments.
