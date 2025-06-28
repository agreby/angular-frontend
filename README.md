# Good Mail Authentication

A standalone authentication system for the Good Mail Email Campaign Management platform.

## Features

- **Login Page** - Secure user authentication with email/password
- **Registration Page** - New user account creation with validation
- **Forgot Password** - Password reset functionality
- **Responsive Design** - Works on all devices
- **Form Validation** - Client-side and server-side validation
- **Loading States** - User feedback during API calls
- **Error Handling** - Comprehensive error messages

## Getting Started

1. Install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Run the development server:
\`\`\`bash
npm run dev
\`\`\`

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## API Integration

This authentication system is designed to work with your Spring Boot backend:

### Login Endpoint
\`\`\`
POST /api/auth/login
{
  "username": "user@example.com",
  "password": "password123"
}
\`\`\`

### Registration Endpoint
\`\`\`
POST /api/auth/register
{
  "username": "user@example.com",
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe"
}
\`\`\`

### Forgot Password Endpoint
\`\`\`
POST /api/auth/forgot-password
{
  "email": "user@example.com"
}
\`\`\`

## Deployment

Build the application for production:

\`\`\`bash
npm run build
npm start
\`\`\`

## Customization

- Update the API endpoints in the component files to match your backend
- Modify the styling in `globals.css` and `tailwind.config.ts`
- Add additional validation rules as needed
- Integrate with your preferred state management solution

## Security Features

- Password visibility toggle
- Form validation
- CSRF protection ready
- JWT token storage (localStorage/sessionStorage)
- Secure password requirements
- Email validation
