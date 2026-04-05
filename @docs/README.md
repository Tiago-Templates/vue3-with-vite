# Vue Router Documentation

Welcome to the Vue Router SPA documentation! This folder contains comprehensive guides and examples for understanding and using Vue Router with authentication, route guards, and best practices.

## 📚 Documentation Index

### Getting Started
- [Installation & Setup](./01-installation.md) - How to install and configure Vue Router
- [Basic Routing](./02-basic-routing.md) - Understanding routes and navigation

### Authentication & Security
- [Authentication System](./03-authentication.md) - Session management with localStorage/sessionStorage
- [Route Guards](./04-route-guards.md) - Protecting routes with middleware
- [Role-Based Access Control](./05-rbac.md) - Authorization based on user roles

### Advanced Topics
- [Composables & State](./06-composables.md) - Using the useAuth composable
- [Navigation Patterns](./07-navigation.md) - Advanced routing patterns
- [Performance Tips](./08-performance.md) - Optimizing your SPA

### Examples & References
- [Examples & Code Snippets](./09-examples.md) - Practical implementation examples
- [API Reference](./10-api-reference.md) - Complete API documentation

## 🎯 Quick Start

1. **Login**: Visit the [Login Page](#) with demo credentials
   - User: `user@example.com` / `password`
   - Admin: `admin@example.com` / `password`

2. **Explore**: Navigate through different pages
   - Home: Landing page
   - About: About Vue Router
   - Dashboard: Protected user page
   - Admin: Protected admin page

3. **Inspect**: Open DevTools to see:
   - sessionStorage / localStorage with auth session
   - Console logs for navigation events
   - Network tab for API calls

## 🚀 Key Features

### ✅ Authentication System
- Mock login with email/password
- Session stored in localStorage/sessionStorage
- "Remember Me" functionality
- Automatic session expiration

### 🛡️ Route Guards
- Authentication check before navigation
- Role-based access control
- Redirect on unauthorized access
- Nested route protection

### 🎨 User Interface
- Header with navigation
- Protected pages
- 404 and 403 error pages
- Responsive design with Tailwind CSS

### 📊 Dashboard Examples
- User profile display
- Session information
- Activity tracking
- Admin statistics

## 📁 Project Structure

```
src/
├── router/
│   ├── index.ts        # Router configuration with routes
│   └── guards.ts       # Route guards and middleware
├── pages/              # Page components (lazy-loaded)
│   ├── Home.vue        # Landing page
│   ├── About.vue       # About page
│   ├── Dashboard.vue   # Protected user page
│   ├── Admin.vue       # Protected admin page
│   ├── Login.vue       # Login page
│   ├── NotFound.vue    # 404 page
│   └── Forbidden.vue   # 403 page
├── components/
│   └── Header.vue      # Navigation header
├── composables/
│   └── useAuth.ts      # Authentication composable
└── utils/
    └── auth.ts         # Authentication utilities
```

## 🔐 Security Considerations

⚠️ **Important**: This is a demo application. In production:

1. **API Authentication**
   - Use real API endpoints instead of mock login
   - Send credentials over HTTPS
   - Use secure cookies with HttpOnly flag

2. **Token Management**
   - Use JWT tokens instead of mock tokens
   - Implement token refresh logic
   - Handle token expiration gracefully

3. **Storage**
   - Never store sensitive data in localStorage
   - Use httpOnly cookies for tokens
   - Clear sensitive data on logout

4. **CORS & CSRF**
   - Implement CORS policies
   - Use CSRF tokens for state-changing operations
   - Validate origin headers

## 💡 Learning Resources

### Vue Router Official
- [Vue Router Documentation](https://router.vuejs.org/)
- [Router API Reference](https://router.vuejs.org/api/)

### Vue 3 & Composition API
- [Vue 3 Documentation](https://vuejs.org/)
- [Composition API Guide](https://vuejs.org/guide/extras/composition-api-faq.html)

### Best Practices
- [Vue Router Best Practices](./08-performance.md)
- [Security Best Practices](./03-authentication.md#security-best-practices)

## 🤝 Contributing

Found an issue or want to improve the docs? Feel free to contribute!

## 📝 License

This project is open source and available under the MIT License.

---

**Last Updated**: 2024-04-05

For questions or issues, refer to the detailed documentation files or open an issue in the repository.
