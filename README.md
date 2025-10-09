# Dropshipping - Frontend

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn
- Backend API running on port 3001

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Setup environment variables:**
   Create a `.env.local` file in the root directory:
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📋 Features

### Authentication
- **Login/Register pages** with form validation
- **JWT token management** with automatic refresh
- **Protected routes** with role-based access control
- **Authentication context** for state management

### UI Components
- **Reusable component library** built with Tailwind CSS
- **Form components** with validation (Button, Input, Card)
- **Responsive design** for mobile and desktop
- **Loading states** and error handling

### Pages
- **Landing page** with feature overview
- **Login/Register** with form validation
- **Dashboard** with role-based content
- **Protected routes** with authentication guards

## 🛠️ Development

### Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── dashboard/         # Protected dashboard page
│   ├── login/            # Login page
│   ├── register/         # Registration page
│   ├── layout.tsx        # Root layout with AuthProvider
│   └── page.tsx          # Landing page
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── Card.tsx
│   └── ProtectedRoute.tsx # Route protection component
├── contexts/            # React contexts
│   └── AuthContext.tsx  # Authentication state management
├── lib/                 # Utility functions
│   ├── api.ts          # API client with axios
│   └── utils.ts        # Utility functions
└── types/              # TypeScript type definitions
```

### Available Scripts
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
```

### Component Usage Examples

**Button Component:**
```tsx
import { Button } from '@/components/ui/Button';

<Button variant="primary" size="lg" isLoading={loading}>
  Click Me
</Button>
```

**Input Component:**
```tsx
import { Input } from '@/components/ui/Input';

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  error={errors.email?.message}
/>
```

**Card Component:**
```tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>
```

### Authentication Usage

**Using Auth Context:**
```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth();
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Welcome, {user?.firstName}!</p>
      ) : (
        <p>Please log in</p>
      )}
    </div>
  );
}
```

**Protected Routes:**
```tsx
import { ProtectedRoute } from '@/components/ProtectedRoute';

<ProtectedRoute requiredRole="ADMIN">
  <AdminContent />
</ProtectedRoute>
```

### API Client Usage

```tsx
import { apiClient } from '@/lib/api';

// Login
const response = await apiClient.login({
  email: 'user@example.com',
  password: 'password123'
});

// Get profile
const profile = await apiClient.getProfile();

// Generic requests
const data = await apiClient.get('/some-endpoint');
```

## 🎨 Styling

The project uses **Tailwind CSS** for styling with:
- **Custom component library** built on top of Tailwind
- **Responsive design** patterns
- **Dark mode support** (ready for implementation)
- **Consistent spacing** and typography
- **Utility-first** approach

## 🔧 Configuration

### Environment Variables
- `NEXT_PUBLIC_API_URL` - Backend API URL (default: http://localhost:3001)

### Tailwind Configuration
The project includes a custom Tailwind configuration with:
- Extended color palette
- Custom spacing
- Typography settings
- Component classes

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push

### Manual Deployment
```bash
npm run build
npm run start
```

### Environment Setup
1. Set `NEXT_PUBLIC_API_URL` to your production API URL
2. Ensure CORS is configured on your backend
3. Test authentication flow

## 📱 Responsive Design

The application is fully responsive with:
- **Mobile-first** approach
- **Tablet optimization**
- **Desktop enhancements**
- **Touch-friendly** interactions

## 🔒 Security Features

- **JWT token management** with automatic refresh
- **Protected routes** with role-based access
- **Form validation** with Zod schemas
- **XSS protection** with React's built-in escaping
- **CSRF protection** via SameSite cookies